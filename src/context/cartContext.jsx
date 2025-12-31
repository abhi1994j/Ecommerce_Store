import { createContext, useEffect, useState } from 'react';
import { getAllProducts } from '../services/apiResponse';
import toast from 'react-hot-toast';

export const cartContext = createContext();

export default function CartProvider({ children }) {
  const storedCartlist = localStorage.getItem('cartlist');
  // const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [productList, setProductList] = useState([]);
  const [cartList, setCartLst] = useState(
    storedCartlist ? JSON.parse(storedCartlist) : []
  );
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state
  const [isOpenCart, setIsOpenCart] = useState(false);
  const getInitialWishlist = () => {
    try {
      const storedWishlist = localStorage.getItem('wishlist');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
      console.error('Invalid wishlist data in localStorage', error);
      localStorage.removeItem('wishlist'); // cleanup bad data
      return [];
    }
  };

  const [wishListProducts, setWishListProdutcs] = useState(getInitialWishlist);

  function addToCart(product, quantity) {
    const existingCartProduct = cartList.find((item) => item.id === product.id);

    if (existingCartProduct) {
      const updatedCart = cartList.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
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
    console.log(id, 'remove');
    const updatedCartList = cartList.filter((item) => item.id !== id);
    setCartLst(updatedCartList);
    toast.error('Product remove from Cart');
  }

  // const login = (token) => {
  //   setToken(token);
  //   localStorage.setItem('token', token);
  // };

  // const logout = () => {
  //   setToken(null);
  //   localStorage.removeItem('token');
  // };

  // Add or Remove Wishlist Product Functionality
  function handleProductToWishlist(id, e) {
    e.stopPropagation(); // Prevent opening modal when clicking heart
    const isInWishlist = wishListProducts.some((product) => product.id === id);

    if (!isInWishlist) {
      // Add to wishlist
      const product = productList.find((p) => p.id === id);
      toast.success('Product added to the Wishlist');
      setWishListProdutcs([...wishListProducts, product]);
    } else {
      // Remove from wishlist - Fixed the filter logic
      const filteredProducts = wishListProducts.filter(
        (product) => product.id !== id // Changed === to !==
      );
      toast.error('Product removed to the Wishlist');
      setWishListProdutcs(filteredProducts);
    }
  }

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts(); // Wait for the data
      setProductList(data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('cartlist', JSON.stringify(cartList));
  }, [cartList]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishListProducts));
  }, [wishListProducts]);

  useEffect(() => {
    fetchProducts(); // Invoke the async function
  }, []);

  return (
    <cartContext.Provider
      value={{
        productList,
        loading,
        error,
        wishListProducts,
        setWishListProdutcs,
        handleProductToWishlist,
        isOpenCart,
        setIsOpenCart,
        cartList,
        addToCart,
        removeFromCart,
        quantity,
        setQuantity
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
