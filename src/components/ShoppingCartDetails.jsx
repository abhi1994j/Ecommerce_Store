import { X } from 'lucide-react';
import { shoppingCartModalStyles } from '../styles/ecommerceStyle';
import { useContext } from 'react';
import { cartContext } from '../context/cartContext';

export default function ShoppingCartDetails() {
  
  const { isOpenCart, setIsOpenCart, cartList, removeFromCart } =useContext(cartContext);
  if (!isOpenCart) return null;

  // Calculate total
  const total =
    cartList?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  return (
    <div className={shoppingCartModalStyles.overlay}>
      <div className={shoppingCartModalStyles.modal}>
        {/* Header */}
        <div className={shoppingCartModalStyles.header}>
          <h2 className={shoppingCartModalStyles.title}>Shopping Cart</h2>
          <button
            onClick={() => setIsOpenCart(false)}
            className={shoppingCartModalStyles.closeBtn}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items - Scrollable */}
        <div className={shoppingCartModalStyles.contentWrapper}>
          {cartList && cartList.length > 0 ? (
            <div className={shoppingCartModalStyles.cartItemWrapper}>
              {cartList.map((item) => (
                <div key={item.id} className={shoppingCartModalStyles.cartItem}>
                  {/* Left Side */}
                  <div className={shoppingCartModalStyles.leftSection}>
                    <div className={shoppingCartModalStyles.imageWrapper}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={shoppingCartModalStyles.image}
                      />
                    </div>

                    <div className={shoppingCartModalStyles.productInfo}>
                      <h3 className={shoppingCartModalStyles.productTitle}>
                        {item.title}
                      </h3>
                      <p className={shoppingCartModalStyles.price}>
                        ${item.price}
                      </p>
                      <p className={shoppingCartModalStyles.quantity}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={shoppingCartModalStyles.removeBtn}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={shoppingCartModalStyles.emptyCartMessage}>
              <p className={shoppingCartModalStyles.emptyCartText}>
                Your cart is empty
              </p>
              <p className={shoppingCartModalStyles.emptyCartSubtext}>
                Add some products to get started!
              </p>
            </div>
          )}
        </div>

        {/* Footer - Total and Checkout */}
        <div className={shoppingCartModalStyles.footer}>
          {/* Total */}
          <div className={shoppingCartModalStyles.totalContainer}>
            <span className={shoppingCartModalStyles.totalText}>Total:</span>
            <span className={shoppingCartModalStyles.totalAmount}>
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Checkout Button */}
          <button className={shoppingCartModalStyles.checkoutButton}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
