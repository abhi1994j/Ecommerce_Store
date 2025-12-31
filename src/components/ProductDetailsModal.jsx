import { X, Star } from 'lucide-react';
import { modalStyles } from '../styles/ecommerceStyle';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { cartContext } from '../context/cartContext';
export default function ProductDetailsModal({ isOpen, setIsOpen, product}) {

  const { cartList , addToCart , quantity, setQuantity} = useContext(cartContext)

  function handleQuantityInputChange(e) {
    console.log('Number', Number(e.target.value));
    if (Number(e.target.value) > 25) {
      toast.error('you can select maximum 25 products');
    }
    setQuantity(Number(e.target.value));
  }

  console.log('cartList', cartList);

  function handleCart() {
    addToCart(product , quantity);
    setIsOpen(false)
    toast.success('Added to cart');
  }

  return (
    isOpen && (
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
                  alt="Fjallraven Backpack"
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

                {/* Action Buttons */}
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
                    placeholder="1"
                    className={`${modalStyles.quantityInput}`}
                  />
                </div>

                <button
                  className={modalStyles.addToCartButton}
                  onClick={() => handleCart()}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
