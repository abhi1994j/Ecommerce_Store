import { X, Star } from 'lucide-react';
import { modalStyles } from '../styles/ecommerceStyle';
import { useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { cartContext } from '../context/cartContext';

export default function ProductDetailsModal({ isOpen, setIsOpen, product}) {
  const { addToCart } = useContext(cartContext);

  // Use LOCAL state for quantity instead of shared context state
  const [quantity, setQuantity] = useState(1);

  // Reset quantity to 1 when modal opens or product changes
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product?.id]);

  function handleQuantityInputChange(e) {
    const value = Number(e.target.value);

    if (value > 25) {
      toast.error('You can select maximum 25 products');
      setQuantity(25);
      return;
    }

    if (value < 1) {
      setQuantity(1);
      return;
    }

    setQuantity(value);
  }

  function handleCart() {
    if (quantity < 1) {
      toast.error('Please enter a valid quantity');
      return;
    }

    addToCart(product, quantity);
    setIsOpen(false);
    setQuantity(1); // Reset quantity after adding to cart
    toast.success('Added to cart');
  }

  if (!isOpen || !product) return null;

  return (
    <div className={modalStyles.modalOverlay}>
      <div className={modalStyles.modalContainer}>
        {/* Header */}
        <div className={modalStyles.modalHeader}>
          <h2 className={modalStyles.modalTitle}>Product Details</h2>
          <button
            className={modalStyles.closeButton}
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className={modalStyles.modalContent}>
          <div className="grid md:grid-cols-2 gap-4 p-4">
            {/* Left Side - Image */}
            <div className={modalStyles.productImageContainer}>
              <img
                src={product.image}
                alt={product.title}
                className={modalStyles.productImage}
              />
            </div>

            {/* Right Side - Product Info */}
            <div className={modalStyles.productInfo}>
              {/* Category */}
              <p className={modalStyles.category}>{product.category}</p>

              {/* Product Title */}
              <h1 className={modalStyles.productTitle}>{product.title}</h1>

              {/* Rating */}
              <div className={modalStyles.ratingContainer}>
                <Star className={modalStyles.ratingIcon} />
                <span className={modalStyles.ratingText}>
                  {product.rating.rate}
                </span>
                <span className={modalStyles.reviews}>
                  ({product.rating.count})
                </span>
              </div>

              {/* Price */}
              <p className={modalStyles.price}>${product.price}</p>

              {/* Description */}
              <p className={modalStyles.description}>{product.description}</p>

              {/* Quantity Input */}
              <div className={modalStyles.quantityContainer}>
                <label
                  htmlFor="quantity"
                  className={modalStyles.quantityLabel}
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityInputChange}
                  min="1"
                  max="25"
                  className={modalStyles.quantityInput}
                />
              </div>

              {/* Add to Cart Button */}
              <button
                className={modalStyles.addToCartButton}
                onClick={handleCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
