import { Heart, Star } from 'lucide-react';
import { productCardStyles } from '../styles/ecommerceStyle';

export default function ProductCard({
  id,
  image,
  category,
  title,
  price,
  rating,
  // setIsOpen,
  isLiked,
  handleProductToWishlist,
}) {
  return (
    <div className={productCardStyles.container}>
      <div className={productCardStyles.card}>
        {/* Image Container */}
        <div className={productCardStyles.imageContainer}>
          <img
            src={image}
            alt={title} // Make sure alt text is descriptive and dynamic
            className={productCardStyles.image}
          />
          {/* Heart Icon */}
          <button
            onClick={(e)=>handleProductToWishlist(id , e)}
            className={productCardStyles.heartButton}
            aria-label="Add to Wishlist"
          >
            <Heart
              className={`${productCardStyles.heartIcon} ${
                isLiked ? 'fill-red-500' : 'fill-none stroke-gray-500'
              } transition-all duration-300 ease-in-out`}
              stroke={isLiked ? 'red' : 'gray'}
            />
          </button>
        </div>

        {/* Card Content */}
        <div className={productCardStyles.content}>
          {/* Category */}
          <p className={productCardStyles.category}>{category}</p>

          {/* Product Title */}
          <h2 className={productCardStyles.title}>{title}</h2>

          {/* Price and Rating */}
          <div className={productCardStyles.priceContainer}>
            <p className={productCardStyles.price}>{price}</p>
            <div className={productCardStyles.ratingContainer}>
              <Star className={productCardStyles.ratingIcon} />
              <span className={productCardStyles.ratingText}>{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
