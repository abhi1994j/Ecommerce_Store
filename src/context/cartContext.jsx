import { createContext, useEffect, useState } from 'react';
import { getAllProducts } from '../services/apiResponse';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export const cartContext = createContext();

export default function CartProvider({ children }) {
  const { user } = useAuth();
  const [productList, setProductList] = useState([]);
  const [originalProductList, setOriginalProductList] = useState([]);
  const [cartList, setCartLst] = useState([]);
  const [wishListProducts, setWishListProdutcs] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpenCart, setIsOpenCart] = useState(false);

  const getCartKey = (userId) => `cartlist_${userId}`;
  const getWishlistKey = (userId) => `wishlist_${userId}`;

  const loadUserData = (userId) => {
    if (!userId) {
      setCartLst([]);
      setWishListProdutcs([]);
      return;
    }

    try {
      const storedCart = localStorage.getItem(getCartKey(userId));
      setCartLst(storedCart ? JSON.parse(storedCart) : []);

      const storedWishlist = localStorage.getItem(getWishlistKey(userId));
      setWishListProdutcs(storedWishlist ? JSON.parse(storedWishlist) : []);
    } catch (error) {
      console.error('Error loading user data from localStorage', error);
      setCartLst([]);
      setWishListProdutcs([]);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      loadUserData(user.uid);
    } else {
      setCartLst([]);
      setWishListProdutcs([]);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) {
      localStorage.setItem(getCartKey(user.uid), JSON.stringify(cartList));
    }
  }, [cartList, user?.uid]);

  useEffect(() => {
    if (user?.uid) {
      localStorage.setItem(getWishlistKey(user.uid), JSON.stringify(wishListProducts));
    }
  }, [wishListProducts, user?.uid]);

  function addToCart(product, quantity) {
    const existingCartProduct = cartList.find((item) => item.id === product.id);

    if (existingCartProduct) {
      const updatedCart = cartList.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCartLst(updatedCart);
    } else {
      setCartLst([
        ...cartList,
        {
          ...product,
          quantity,
        },
      ]);
    }
  }

  function removeFromCart(id) {
    const updatedCartList = cartList.filter((item) => item.id !== id);
    setCartLst(updatedCartList);
    toast.error('Product removed from Cart');
  }

  function updateCartQuantity(id, newQuantity) {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    const updatedCart = cartList.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartLst(updatedCart);
  }

  // NEW: Clear cart method (used after successful order)
  function clearCart() {
    setCartLst([]);
    if (user?.uid) {
      localStorage.removeItem(getCartKey(user.uid));
    }
  }

  function handleProductToWishlist(id, e) {
    e.stopPropagation();
    const isInWishlist = wishListProducts.some((product) => product.id === id);

    if (!isInWishlist) {
      const product = productList.find((p) => p.id === id);
      toast.success('Product added to the Wishlist');
      setWishListProdutcs([...wishListProducts, product]);
    } else {
      const filteredProducts = wishListProducts.filter((product) => product.id !== id);
      toast.error('Product removed from the Wishlist');
      setWishListProdutcs(filteredProducts);
    }
  }

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProductList(data);
      setOriginalProductList(data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <cartContext.Provider
      value={{
        productList,
        setProductList,
        originalProductList,
        loading,
        error,
        wishListProducts,
        setWishListProducts: setWishListProdutcs,
        handleProductToWishlist,
        isOpenCart,
        setIsOpenCart,
        cartList,
        setCartLst, // Export this for CheckoutModal
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart, // NEW: Export clearCart method
        quantity,
        setQuantity,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
