import { Delete, X } from 'lucide-react';
import { wishListModalStyles } from '../styles/ecommerceStyle';
import { IoCartOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { cartContext } from '../context/cartContext';

export default function WishlistModal({
  isOpen,
  setIsOpen,
  wishListProducts,
  setWishListProdutcs,
}) {
  const { addToCart, quantity } = useContext(cartContext);

  if (!isOpen) return null;

  function handleCart(product) {
    addToCart(product, quantity);
    toast.success('Added to Cart');
    const updateWislistProduct = wishListProducts.filter((item)=>item.id !== product.id);
    setWishListProdutcs(updateWislistProduct)
  }

  function handleRemoveWishListProduct(id) {
    console.log(id);
    const filteredWishlistProduct = wishListProducts.filter(
      (product) => product.id !== id
    );
    setWishListProdutcs(filteredWishlistProduct);
    toast.error("Product remove from Wishlist")
  }

  return (
    <div className={wishListModalStyles.overlay}>
      <div className={wishListModalStyles.modal}>
        {/* Header */}
        <div className={wishListModalStyles.header}>
          <h2 className={wishListModalStyles.title}>My Wishlist</h2>
          <button
            onClick={() => setIsOpen(false)}
            className={wishListModalStyles.closeBtn}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className={wishListModalStyles.contentWrapper}>
          <div className={wishListModalStyles.list}>
            {wishListProducts && wishListProducts.length > 0 ? (
              wishListProducts.map((product) => (
                <div key={product.id} className={wishListModalStyles.item}>
                  {/* Left Side */}
                  <div className={wishListModalStyles.leftSection}>
                    <div className={wishListModalStyles.imageWrapper}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className={wishListModalStyles.image}
                      />
                    </div>

                    <div className={wishListModalStyles.info}>
                      <h3 className={wishListModalStyles.productTitle}>
                        {product.title}
                      </h3>
                      <p className={wishListModalStyles.price}>
                        ${product.price}
                      </p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="flex flex-col gap-2 items-center">
                    <button
                      onClick={() => handleRemoveWishListProduct(product.id)}
                      className={wishListModalStyles.removeBtn}
                    >
                      <Delete />
                    </button>
                    <button
                      className={wishListModalStyles.addToCartButton}
                      onClick={() => handleCart(product)}
                    >
                      <IoCartOutline />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={wishListModalStyles.emptyWrapper}>
                <p className={wishListModalStyles.emptyText}>
                  Your wishlist is empty
                </p>
                <p className={wishListModalStyles.emptySubText}>
                  Start adding products to your wishlist!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
