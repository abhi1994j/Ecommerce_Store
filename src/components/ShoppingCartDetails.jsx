import { X, Plus, Minus } from 'lucide-react';
import { shoppingCartModalStyles } from '../styles/ecommerceStyle';
import { useContext, useEffect, useState } from 'react';
import { cartContext } from '../context/cartContext';

export default function ShoppingCartDetails() {
  const { isOpenCart, setIsOpenCart, cartList, removeFromCart, updateCartQuantity } =
    useContext(cartContext);

  const [mounted, setMounted] = useState(isOpenCart);

  useEffect(() => {
    let timer;
    if (isOpenCart) {
      setMounted(true);
    } else {
      timer = setTimeout(() => {
        setMounted(false);
      }, 300);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpenCart]);

  if (!mounted) return null;

  // Calculate total
  const total = cartList?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const handleIncrement = (item) => {
    updateCartQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateCartQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className={`${shoppingCartModalStyles.overlay}
  transition-opacity duration-1000 delay-1000
  ${isOpenCart ? shoppingCartModalStyles.overlayVisible : shoppingCartModalStyles.overlayHidden}`}
    >
      <div className={`${shoppingCartModalStyles.modal}
    transition-all duration-1000 delay-1000 ease-in-out
    ${isOpenCart ? shoppingCartModalStyles.modalVisible : shoppingCartModalStyles.modalHidden}`}
      >
        {/* Header */}
        <div className={shoppingCartModalStyles.header}>
          <h2 className={shoppingCartModalStyles.title}>Shopping Cart</h2>
          <button onClick={() => setIsOpenCart(false)} className={shoppingCartModalStyles.closeBtn}>
            <X className={shoppingCartModalStyles.closeIcon} />
          </button>
        </div>

        {/* Cart Items */}
        <div className={shoppingCartModalStyles.contentWrapper}>
          {cartList && cartList.length > 0 ? (
            <div className={shoppingCartModalStyles.cartItemWrapper}>
              {cartList.map((item) => (
                <div key={item.id} className={shoppingCartModalStyles.cartItem}>
                  <div className={shoppingCartModalStyles.leftSection}>
                    <div className={shoppingCartModalStyles.imageWrapper}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={shoppingCartModalStyles.image}
                      />
                    </div>

                    <div className={shoppingCartModalStyles.productInfo}>
                      <h3 className={shoppingCartModalStyles.productTitle}>{item.title}</h3>

                      <p className={shoppingCartModalStyles.price}>${item.price}</p>

                      {/* Quantity */}
                      <div className={shoppingCartModalStyles.quantityControls}>
                        <button
                          onClick={() => handleDecrement(item)}
                          className={shoppingCartModalStyles.quantityBtn}
                          aria-label="Decrease quantity"
                        >
                          <Minus className={shoppingCartModalStyles.quantityIcon} />
                        </button>

                        <span className={shoppingCartModalStyles.quantityValue}>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => handleIncrement(item)}
                          className={shoppingCartModalStyles.quantityBtn}
                          aria-label="Increase quantity"
                        >
                          <Plus className={shoppingCartModalStyles.quantityIcon} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <p className={shoppingCartModalStyles.subtotalText}>
                        Subtotal:{' '}
                        <span className={shoppingCartModalStyles.subtotalAmount}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={shoppingCartModalStyles.removeBtn}
                  >
                    <X className={shoppingCartModalStyles.removeIcon} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={shoppingCartModalStyles.emptyCartMessage}>
              <p className={shoppingCartModalStyles.emptyCartText}>Your cart is empty</p>
              <p className={shoppingCartModalStyles.emptyCartSubtext}>
                Add some products to get started!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={shoppingCartModalStyles.footer}>
          <div className={shoppingCartModalStyles.totalContainer}>
            <span className={shoppingCartModalStyles.totalText}>Total:</span>
            <span className={shoppingCartModalStyles.totalAmount}>${total.toFixed(2)}</span>
          </div>

          <button
            className={shoppingCartModalStyles.checkoutButton}
            disabled={!cartList || cartList.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
