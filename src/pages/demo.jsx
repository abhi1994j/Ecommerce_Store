import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { button } from '../constants/Button';
import { dashboardStyles } from '../styles/ecommerceStyle';
import { cartContext } from '../context/cartContext';
import ProductCard from '../components/ProductCard';
import { Loader } from '../libs/Loader';
import ProductDetailsModal from '../components/ProductDetailsModal';
import ShoppingCartDetails from '../components/ShoppingCartDetails';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

const Dashboard = () => {
  const { user, isLoginOpen ,isSignupOpen } = useAuth();
  const {
    productList,
    loading,
    error,
    wishListProducts,
    handleProductToWishlist,
    isOpenCart
  } = useContext(cartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // selected product
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Products');

  // console.log("wishlist" , wishListProducts);

  // Selected Product Modal Open Functionality
  function handleOpenProductModal(id) {
    const product = productList.find((p) => p.id === id);
    // console.log(product);
    setSelectedProduct(product); // Set the selected product
    setIsOpen(true);
  }

  // Show all products initially
  useEffect(() => {
    setFilteredProducts(productList);
  }, [productList]);

  const handleClick = (category) => {
    setActiveCategory(category);

    if (category === 'All Products') {
      setFilteredProducts(productList);
    } else {
      const filtered = productList.filter(
        (product) => product.category === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10">
        <Loader /> Loading products...
      </p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Navbar />

      {/* Product Grid */}
      <div className="flex">
        <div>
          {/* Category Buttons */}

          <div className={dashboardStyles.container}>
            <p className={dashboardStyles.title}>CATEGORIES</p>

            <div className={dashboardStyles.buttonContainer}>
              {button.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(category)}
                  className={`
                ${dashboardStyles.button}
                ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-200'
                }
              `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} onClick={() => handleOpenProductModal(product.id)}>
                  <ProductCard
                    id={product.id}
                    image={product.image}
                    category={product.category}
                    title={product.title}
                    price={product.price}
                    rating={product.rating?.rate}
                    // isOpen={isOpen}
                    isLiked={wishListProducts.some((item) => item.id === product.id)}
                    handleProductToWishlist={handleProductToWishlist}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-2xl ">No products found</p>
              // Display message if no products
            )}
          </div>
        </div>
        {/* Login Modal */}
        {isLoginOpen && <LoginModal />}

        {/* Signup Modal */}
        {isSignupOpen && <SignupModal />}

        {/* Cart */}
        {isOpenCart && <ShoppingCartDetails />}
      </div>

      {isOpen && selectedProduct && (
        <ProductDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} product={selectedProduct} />
      )}
    </>
  );
};

export default Dashboard;
