import { useContext, useState } from 'react';
import { Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { navbarStyles } from '../styles/ecommerceStyle';
import { cartContext } from '../context/cartContext';
import WishlistModal from './WishlistModal';

export default function Navbar() {
  const { wishListProducts, setWishListProdutcs, setIsOpenCart, cartList } =
    useContext(cartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }
  // console.log(wishListProducts);
  return (
    <nav className={navbarStyles.container}>
      <div className={navbarStyles.wrapper}>
        <div className={navbarStyles.innerWrapper}>
          {/* Logo */}
          <div className={navbarStyles.logoWrapper}>
            <div className={navbarStyles.logoIcon}>
              <span className={navbarStyles.logoText}>S</span>
            </div>
            <span className={navbarStyles.storeText}>Store</span>
          </div>

          {/* Desktop Navigation */}
          <div className={navbarStyles.desktopNav}>
            {/* Wishlist Button */}
            <button className={navbarStyles.button} onClick={handleOpenModal}>
              <Heart className="w-5 h-5" />
              <span className="font-medium">Wishlist</span>
              <span className={navbarStyles.badge}>
                {wishListProducts.length}
              </span>
            </button>

            {/* Cart Button */}
            <button
              className={navbarStyles.button}
              onClick={() => setIsOpenCart(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Cart</span>
              <span className={navbarStyles.badge}>
                {cartList.length}
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className={navbarStyles.mobileMenuBtn}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={navbarStyles.mobileMenuIcon}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={navbarStyles.mobileMenuWrapper}>
            {/* Wishlist Button Mobile */}
            <button
              className={navbarStyles.mobileButton}
              onClick={handleOpenModal}
            >
              <Heart className="w-5 h-5" />
              <span className="font-medium">Wishlist</span>
              <span className={navbarStyles.mobileBadge}>3</span>
            </button>

            {/* Cart Button Mobile */}
            <button
              className={navbarStyles.mobileButton}
              onClick={() => setIsOpenCart(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Cart</span>
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <WishlistModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          wishListProducts={wishListProducts}
          setWishListProdutcs={setWishListProdutcs}
        />
      )}
    </nav>
  );
}
