import { useContext, useState, useRef, useEffect } from 'react';
import { Heart, ShoppingCart, Menu, X, User, LogOut, ChevronDown, Package, MapPin } from 'lucide-react';
import { navbarStyles } from '../styles/ecommerceStyle';
import { cartContext } from '../context/cartContext';
import WishlistModal from './WishlistModal';
import AddressModal from './AddressModal';
import CheckoutModal from './CheckoutModal';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setIsLoginOpen, setIsSignupOpen } = useAuth();
  const {
    wishListProducts,
    setWishListProducts,
    cartList,
  } = useContext(cartContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const requireAuth = (action) => {
    if (!user) {
      setIsMenuOpen(false); // Close mobile menu
      setIsSignupOpen(false);
      setIsLoginOpen(true);
      return;
    }
    action();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');
    try {
      await signOut(auth);
      toast.success('Logged out successfully', { id: toastId });
      setIsProfileOpen(false);
      setIsMenuOpen(false)
    } catch (error) {
      toast.error(`Failed to logout :${error}`, { id: toastId });
    }
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const displayName = user?.displayName
    ? capitalizeFirstLetter(user.displayName)
    : user?.email?.split('@')[0];

  const handleCheckout = () => {
    if (!user) {
      setIsMenuOpen(false); // Close mobile menu
      setIsLoginOpen(true);
      return;
    }
    if (cartList.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className={navbarStyles.container}>
        <div className={navbarStyles.wrapper}>
          <div className={navbarStyles.innerWrapper}>
            {/* Logo */}
            <div
              className={navbarStyles.logoWrapper}
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            >
              <div className={navbarStyles.logoIcon}>
                <span className={navbarStyles.logoText}>S</span>
              </div>
              <span className={navbarStyles.storeText}>Store</span>
            </div>

            {/* Desktop Navigation */}
            <div className={navbarStyles.desktopNav}>
              {/* Orders */}
              <button
                className={navbarStyles.button}
                onClick={() => requireAuth(() => navigate('/orders'))}
              >
                <Package className="w-5 h-5" />
                <span className="font-medium">Orders</span>
              </button>

              {/* Addresses */}
              <button
                className={navbarStyles.button}
                onClick={() => requireAuth(() => setIsAddressModalOpen(true))}
              >
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Addresses</span>
              </button>

              {/* Wishlist */}
              <button
                className={navbarStyles.button}
                onClick={() => requireAuth(() => setIsWishlistOpen(true))}
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">Wishlist</span>
                <span className={navbarStyles.badge}>{wishListProducts.length}</span>
              </button>

              {/* Cart */}
              <button className={navbarStyles.button} onClick={handleCheckout}>
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Cart</span>
                <span className={navbarStyles.badge}>{cartList.length}</span>
              </button>

              {/* User Profile Dropdown */}
              {user && (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={navbarStyles.button}
                  >
                    <User className="w-5 h-5" />
                    <p className="font-medium rounded-full border border-white px-2 py-0.5">
                      {displayName.slice(0, 1)}
                    </p>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isProfileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">
                          {user.displayName || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-1">{user.email}</p>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className={navbarStyles.mobileMenuBtn}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={navbarStyles.mobileMenuIcon}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={navbarStyles.mobileMenuWrapper}>
              <button
                className={navbarStyles.mobileButton}
                onClick={() =>
                  requireAuth(() => {
                    navigate('/orders');
                    setIsMenuOpen(false);
                  })
                }
              >
                <Package className="w-5 h-5" />
                <span>Orders</span>
              </button>

              <button
                className={navbarStyles.mobileButton}
                onClick={() =>
                  requireAuth(() => {
                    setIsAddressModalOpen(true);
                    setIsMenuOpen(false);
                  })
                }
              >
                <MapPin className="w-5 h-5" />
                <span>Addresses</span>
              </button>

              <button
                className={navbarStyles.mobileButton}
                onClick={() =>
                  requireAuth(() => {
                    setIsWishlistOpen(true);
                    setIsMenuOpen(false);
                  })
                }
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
                <span className={navbarStyles.mobileBadge}>{wishListProducts.length}</span>
              </button>

              <button
                className={navbarStyles.mobileButton}
                onClick={() => {
                  handleCheckout();
                  setIsMenuOpen(false);
                }}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                <span className={navbarStyles.mobileBadge}>{cartList.length}</span>
              </button>

              {/* Mobile User Section */}
              {user && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="px-4 py-2 bg-gray-50 rounded-lg mx-2">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center cursor-pointer gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 mt-2"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isWishlistOpen && (
        <WishlistModal
          isOpen={isWishlistOpen}
          setIsOpen={setIsWishlistOpen}
          wishListProducts={wishListProducts}
          setWishListProducts={setWishListProducts}
        />
      )}

      {isAddressModalOpen && (
        <AddressModal isOpen={isAddressModalOpen} setIsOpen={setIsAddressModalOpen} mode="manage" />
      )}

      {isCheckoutModalOpen && (
        <CheckoutModal isOpen={isCheckoutModalOpen} setIsOpen={setIsCheckoutModalOpen} />
      )}
    </nav>
  );
}
