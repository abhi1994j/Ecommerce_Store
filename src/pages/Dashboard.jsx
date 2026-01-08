import { useContext, useEffect, useState, useRef } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
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
import useDebounce from '../hooks/useDebounce';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { isLoginOpen, isSignupOpen } = useAuth();
  const { productList, loading, error, wishListProducts, handleProductToWishlist, isOpenCart } =
    useContext(cartContext);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Products');

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const originalProducts = useRef([]);
  const filterRef = useRef(null);

  const debouncedSearchTerm = useDebounce(searchQuery, 300);

  // Store original products on first load AND initialize filteredProducts
  useEffect(() => {
    if (productList.length > 0) {
      if (originalProducts.current.length === 0) {
        originalProducts.current = [...productList];
        setFilteredProducts([...productList]); // Initialize filtered products
      }
    }
  }, [productList]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Apply filters and search
  useEffect(() => {
    if (originalProducts.current.length === 0) return;

    let filtered = [...originalProducts.current];

    // Category filter
    if (activeCategory !== 'All Products') {
      filtered = filtered.filter((product) => product.category === activeCategory.toLowerCase());
    }

    // Search filter
    if (debouncedSearchTerm.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter !== 'all') {
      switch (priceFilter) {
        case 'under50':
          filtered = filtered.filter((p) => p.price < 50);
          break;
        case '50to100':
          filtered = filtered.filter((p) => p.price >= 50 && p.price <= 100);
          break;
        case '100to200':
          filtered = filtered.filter((p) => p.price > 100 && p.price <= 200);
          break;
        case 'over200':
          filtered = filtered.filter((p) => p.price > 200);
          break;
      }
    }

    // Rating filter
    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter);
      filtered = filtered.filter((p) => p.rating?.rate >= minRating);
    }

    setFilteredProducts(filtered);
  }, [debouncedSearchTerm, priceFilter, ratingFilter, activeCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceFilter('all');
    setRatingFilter('all');
    toast.success('Filters cleared');
  };

  const handleOpenProductModal = (id) => {
    const product = originalProducts.current.find((p) => p.id === id);
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const hasActiveFilters =
    priceFilter !== 'all' || ratingFilter !== 'all' || searchQuery.trim() !== '';

  if (loading)
    return (
      <div>
        <p className="text-center mt-10 flex items-center justify-center gap-2">
          <Loader /> products...
        </p>
      </div>
    );

  if (error)
    return (
      <div>
        <p className="text-center text-red-500 mt-10">{error}</p>
      </div>
    );

  return (
    <>
      <div className={`max-w-7xl mx-auto px-4 py-6 flex`}>
        <div>
          {/* Search and Filter Bar */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Filter Button */}
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                    hasActiveFilters
                      ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-300'
                  }`}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="font-medium">Filters</span>
                  {hasActiveFilters && <span className="w-2 h-2 bg-purple-600 rounded-full"></span>}
                </button>

                {/* Filter Dropdown */}
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-40">
                    <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">Filter Products</h3>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {/* Price Filter */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range
                      </label>
                      <select
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="all">All Prices</option>
                        <option value="under50">Under $50</option>
                        <option value="50to100">$50 - $100</option>
                        <option value="100to200">$100 - $200</option>
                        <option value="over200">Over $200</option>
                      </select>
                    </div>

                    {/* Rating Filter */}
                    <div className="px-4 py-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Rating
                      </label>
                      <select
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="all">All Ratings</option>
                        <option value="4">4+ Stars</option>
                        <option value="3">3+ Stars</option>
                        <option value="2">2+ Stars</option>
                        <option value="1">1+ Stars</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:bg-purple-200 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {priceFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    Price:{' '}
                    {priceFilter === 'under50'
                      ? 'Under $50'
                      : priceFilter === '50to100'
                      ? '$50-$100'
                      : priceFilter === '100to200'
                      ? '$100-$200'
                      : 'Over $200'}
                    <button
                      onClick={() => setPriceFilter('all')}
                      className="hover:bg-purple-200 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {ratingFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    Rating: {ratingFilter}+ Stars
                    <button
                      onClick={() => setRatingFilter('all')}
                      className="hover:bg-purple-200 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium ml-2"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Category Buttons */}
          <div className={dashboardStyles.container}>
            <p className={dashboardStyles.title}>CATEGORIES</p>

            <div className={dashboardStyles.buttonContainer}>
              {button.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(category)}
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

          {/* Results Count */}
          <div className="px-6 mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length}{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
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
                    isLiked={wishListProducts.some((item) => item.id === product.id)}
                    handleProductToWishlist={handleProductToWishlist}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-2xl text-gray-400 mb-2">No products found</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Modals */}
        {isLoginOpen && <LoginModal />}
        {isSignupOpen && <SignupModal />}
        {isOpenCart && <ShoppingCartDetails />}
        {isOpen && selectedProduct && (
          <ProductDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} product={selectedProduct} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
