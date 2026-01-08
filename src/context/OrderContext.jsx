import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Helper functions for user-specific localStorage keys
  const getOrdersKey = (userId) => `orders_${userId}`;
  const getAddressesKey = (userId) => `addresses_${userId}`;

  // Load user-specific data from localStorage
  const loadUserData = (userId) => {
    if (!userId) {
      setOrders([]);
      setAddresses([]);
      setSelectedAddress(null);
      return;
    }

    try {
      const storedOrders = localStorage.getItem(getOrdersKey(userId));
      setOrders(storedOrders ? JSON.parse(storedOrders) : []);

      const storedAddresses = localStorage.getItem(getAddressesKey(userId));
      const loadedAddresses = storedAddresses ? JSON.parse(storedAddresses) : [];
      setAddresses(loadedAddresses);

      // Set default address if available
      const defaultAddr = loadedAddresses.find(addr => addr.isDefault);
      setSelectedAddress(defaultAddr || loadedAddresses[0] || null);
    } catch (error) {
      console.error('Error loading user data from localStorage', error);
      setOrders([]);
      setAddresses([]);
      setSelectedAddress(null);
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

  // Save orders to localStorage
  useEffect(() => {
    if (user?.uid) {
      localStorage.setItem(getOrdersKey(user.uid), JSON.stringify(orders));
    }
  }, [orders, user?.uid]);

  // Save addresses to localStorage
  useEffect(() => {
    if (user?.uid) {
      localStorage.setItem(getAddressesKey(user.uid), JSON.stringify(addresses));
    }
  }, [addresses, user?.uid]);

  // Add new address
  const addAddress = (address) => {
    const newAddress = {
      id: Date.now().toString(),
      ...address,
      isDefault: addresses.length === 0 ? true : address.isDefault || false,
    };

    // If this is set as default, unset others
    if (newAddress.isDefault) {
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: false
      }));
      setAddresses([...updatedAddresses, newAddress]);
      setSelectedAddress(newAddress);
    } else {
      setAddresses([...addresses, newAddress]);
    }

    toast.success('Address added successfully');
    return newAddress;
  };

  // Update address
  const updateAddress = (id, updatedData) => {
    const updatedAddresses = addresses.map(addr => {
      if (addr.id === id) {
        return { ...addr, ...updatedData };
      }
      // If updating to default, unset others
      if (updatedData.isDefault) {
        return { ...addr, isDefault: false };
      }
      return addr;
    });

    setAddresses(updatedAddresses);

    // Update selected address if it's the one being modified
    if (selectedAddress?.id === id) {
      const updated = updatedAddresses.find(addr => addr.id === id);
      setSelectedAddress(updated);
    }

    toast.success('Address updated successfully');
  };

  // Delete address
  const deleteAddress = (id) => {
    const filteredAddresses = addresses.filter(addr => addr.id !== id);
    setAddresses(filteredAddresses);

    // If deleted address was selected, select another one
    if (selectedAddress?.id === id) {
      setSelectedAddress(filteredAddresses[0] || null);
    }

    // toast.success('Address deleted successfully');
  };

  // Set default address
  const setDefaultAddress = (id) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    setAddresses(updatedAddresses);
    const defaultAddr = updatedAddresses.find(addr => addr.id === id);
    setSelectedAddress(defaultAddr);
  };

  // Create new order
  const createOrder = (orderData) => {
    const newOrder = {
      id: `ORD${Date.now()}`,
      userId: user?.uid,
      ...orderData,
      orderDate: new Date().toISOString(),
      status: 'pending',
    };

    setOrders([newOrder, ...orders]);
    // toast.success('Order placed successfully!');
    return newOrder;
  };

  // Update order status
  const updateOrderStatus = (orderId, status) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
  };

  const value = {
    orders,
    addresses,
    selectedAddress,
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
