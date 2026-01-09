import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Your Firebase config

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load user orders and addresses from Firestore
  const loadUserData = async (userId) => {
    if (!userId) {
      setOrders([]);
      setAddresses([]);
      setSelectedAddress(null);
      return;
    }

    try {
      setLoading(true);

      // Fetch orders
      const ordersQuery = query(
        collection(db, 'orders'),
        where('userId', '==', userId)
      );
      const ordersSnapshot = await getDocs(ordersQuery);
      const loadedOrders = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      // Sort in memory instead of using orderBy
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

      setOrders(loadedOrders);

      // Fetch addresses
      const addressesQuery = query(
        collection(db, 'addresses'),
        where('userId', '==', userId)
      );
      const addressesSnapshot = await getDocs(addressesQuery);
      const loadedAddresses = addressesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAddresses(loadedAddresses);

      // Set default address
      const defaultAddr = loadedAddresses.find(addr => addr.isDefault);
      setSelectedAddress(defaultAddr || loadedAddresses[0] || null);
    } catch (error) {
      console.error('Error loading user data from Firestore', error);
      toast.error('Failed to load your data');
    } finally {
      setLoading(false);
    }
  };

  // Effect to handle user login/logout
  useEffect(() => {
    if (user?.uid) {
      loadUserData(user.uid);
    } else {
      setOrders([]);
      setAddresses([]);
      setSelectedAddress(null);
    }
  }, [user?.uid]);

  // Add new address
  const addAddress = async (address) => {
    if (!user?.uid) return;

    try {
      const newAddress = {
        id: Date.now().toString(),
        userId: user.uid,
        ...address,
        isDefault: addresses.length === 0 ? true : address.isDefault || false,
        createdAt: new Date().toISOString()
      };

      // If this is set as default, unset others
      if (newAddress.isDefault) {
        const updatePromises = addresses.map(addr =>
          updateDoc(doc(db, 'addresses', addr.id), { isDefault: false })
        );
        await Promise.all(updatePromises);
      }

      // Save to Firestore
      await setDoc(doc(db, 'addresses', newAddress.id), newAddress);

      // Update local state
      setAddresses(prev => {
        const updated = newAddress.isDefault
          ? prev.map(a => ({ ...a, isDefault: false }))
          : prev;
        return [...updated, newAddress];
      });

      if (newAddress.isDefault) {
        setSelectedAddress(newAddress);
      }

      toast.success('Address added successfully');
      return newAddress;
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error('Failed to add address');
    }
  };

  // Update address
  const updateAddress = async (id, updatedData) => {
    if (!user?.uid) return;

    try {
      // If updating to default, unset others first
      if (updatedData.isDefault) {
        const updatePromises = addresses
          .filter(addr => addr.id !== id)
          .map(addr =>
            updateDoc(doc(db, 'addresses', addr.id), { isDefault: false })
          );
        await Promise.all(updatePromises);
      }

      // Update the address in Firestore
      await updateDoc(doc(db, 'addresses', id), updatedData);

      // Update local state
      const updatedAddresses = addresses.map(addr => {
        if (addr.id === id) {
          return { ...addr, ...updatedData };
        }
        if (updatedData.isDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      });

      setAddresses(updatedAddresses);

      if (selectedAddress?.id === id) {
        const updated = updatedAddresses.find(addr => addr.id === id);
        setSelectedAddress(updated);
      }

      toast.success('Address updated successfully');
    } catch (error) {
      console.error('Error updating address:', error);
      toast.error('Failed to update address');
    }
  };

  // Delete address
  const deleteAddress = async (id) => {
    if (!user?.uid) return;

    try {
      await deleteDoc(doc(db, 'addresses', id));

      const filteredAddresses = addresses.filter(addr => addr.id !== id);
      setAddresses(filteredAddresses);

      if (selectedAddress?.id === id) {
        setSelectedAddress(filteredAddresses[0] || null);
      }

      toast.success('Address deleted successfully');
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Failed to delete address');
    }
  };

  // Set default address
  const setDefaultAddress = async (id) => {
    if (!user?.uid) return;

    try {
      // Unset all default flags
      const updatePromises = addresses.map(addr =>
        updateDoc(doc(db, 'addresses', addr.id), {
          isDefault: addr.id === id
        })
      );
      await Promise.all(updatePromises);

      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }));
      setAddresses(updatedAddresses);

      const defaultAddr = updatedAddresses.find(addr => addr.id === id);
      setSelectedAddress(defaultAddr);
    } catch (error) {
      console.error('Error setting default address:', error);
      toast.error('Failed to set default address');
    }
  };

  // Create new order
  const createOrder = async (orderData) => {
    if (!user?.uid) return;

    try {
      const orderId = `ORD${Date.now()}`;
      const newOrder = {
        id: orderId,
        userId: user.uid,
        ...orderData,
        orderDate: new Date().toISOString(),
        status: 'pending',
      };

      // Save to Firestore
      await setDoc(doc(db, 'orders', orderId), newOrder);

      // Update local state
      setOrders([newOrder, ...orders]);

      // toast.success('Order placed successfully!');
      return newOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order');
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    if (!user?.uid) return;

    try {
      await updateDoc(doc(db, 'orders', orderId), { status });

      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status } : order
      );
      setOrders(updatedOrders);

      toast.success('Order status updated');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const value = {
    orders,
    addresses,
    selectedAddress,
    loading,
    setSelectedAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    createOrder,
    updateOrderStatus,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};
