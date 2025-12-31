// dashboardStyles.js

const dashboardStyles = {
  container: "p-6",
  title: "text-gray-500 font-semibold mb-4",
  buttonContainer: "flex items-center gap-2 ",
  button: "px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
};

// productCardStyles.js
const productCardStyles = {
  container: "max-w-xs mx-auto my-8 cursor-pointer",
  card: "bg-white rounded-lg  shadow-md overflow-hidden hover:shadow-lg",
  imageContainer: "relative bg-gray-50 p-8 h-48",
  image: "w-full h-full object-contain hover:scale-120 transition-all duration-300 ease-in-out", // Consider changing to object-cover if scaling doesn't work well
  heartButton: "absolute top-4 right-4 hover:bg-pink-500 rounded-full p-3 transition-colors shadow-lg cursor-pointer",
  heartIcon: "w-4 h-4",
  content: "p-4",
  category: "text-gray-500 text-sm font-medium uppercase tracking-wide mb-2",
  title: "text-gray-900 text-base font-semibold mb-2 leading-tight leading-snug line-clamp-2", // Ensure line-clamp plugin is installed
  priceContainer: "flex items-center justify-between",
  price: "text-blue-500 text-lg font-bold",
  ratingContainer: "flex items-center gap-1",
  ratingIcon: "w-4 h-4 fill-yellow-400 text-yellow-400",
  ratingText: "text-gray-700 text-sm font-medium"
};

// navbarStyles.js
const navbarStyles = {
  container: "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg",
  wrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  innerWrapper: "flex items-center justify-between h-16",
  logoWrapper: "flex items-center gap-2",
  logoIcon: "bg-pink-500 rounded-full w-10 h-10 flex items-center justify-center",
  logoText: "text-white font-bold text-xl",
  storeText: "text-white font-bold text-2xl",
  desktopNav: "hidden md:flex items-center gap-4",
  button: "relative bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md cursor-pointer",
  badge: "absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center",
  mobileMenuBtn: "md:hidden",
  mobileMenuIcon: "text-white hover:bg-blue-700 p-2 rounded-lg transition-colors",
  mobileMenuWrapper: "md:hidden pb-4 space-y-3",
  mobileButton: "w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md ",
  mobileBadge: "absolute top-1 right-4 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
};

const modalStyles = {
  modalOverlay: "fixed inset-0 w-full flex items-center justify-center p-4 backdrop-blur-xs z-50",
  modalContainer: "bg-white rounded-lg shadow-2xl w-[60%] max-w-6xl max-h-[90vh] overflow-hidden",
  modalHeader: "flex items-center justify-between p-6 border-b border-gray-200",
  modalTitle: "text-2xl font-bold text-gray-900",
  closeButton: "text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",
  modalContent: "overflow-y-auto max-h-[calc(90vh-80px)]",
  productImageContainer: "bg-gray-50 h-90 w-full rounded-lg p-8 flex items-center justify-center",
  productImage: "w-full h-full object-cover",
  productInfo: "flex flex-col gap-2",
  category: "text-gray-500 text-xs font-medium uppercase",
  productTitle: "text-xl font-bold text-gray-900 leading-tight",
  ratingContainer: "flex items-center gap-2",
  ratingIcon: "w-5 h-5 fill-yellow-400 text-yellow-400",
  ratingText: "text-gray-900 font-semibold",
  reviews: "text-gray-500",
  price: "text-2xl font-bold text-blue-500",
  description: "text-gray-600 mt-4",
  quantityContainer: "flex gap-1 items-center",
  quantityLabel: "",
  quantityInput: "bg-gray-100 border-0 focus:border-blue-200 rounded-sm px-4 py-2 w-[80px]",
  addToCartButton: "flex-1 bg-blue-400 hover:bg-blue-500 text-white px-5 py-3 rounded-lg font-medium transition-colors cursor-pointer",
};

const wishListModalStyles = {
  overlay: "fixed inset-0 backdrop-blur-xs flex items-center justify-center p-4 z-50",
  modal: "bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden",
  header: "flex items-center justify-between p-6 border-b border-gray-200",
  title: "text-3xl font-bold text-gray-900",
  closeBtn: "text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",
  contentWrapper: "overflow-y-auto max-h-[calc(90vh-100px)] p-6",
  list: "flex flex-col gap-4",
  item: "bg-gray-50 rounded-lg p-4 flex items-center justify-between gap-4",
  leftSection: "flex items-center gap-4 flex-1",
  imageWrapper: "w-24 h-24 bg-white rounded-lg flex items-center justify-center p-2 flex-shrink-0",
  image: "w-full h-full object-contain",
  info: "flex flex-col gap-1",
  productTitle: "text-lg font-semibold text-gray-900 line-clamp-2",
  price: "text-xl font-bold text-blue-500",
  removeBtn: "hover:text-red-600 cursor-pointer font-medium transition-colors",
  addToCartButton: " hover:text-blue-500 text-2xl font-medium transition-colors cursor-pointer",
  emptyWrapper: "text-center py-12",
  emptyText: "text-gray-500 text-lg",
  emptySubText: "text-gray-400 text-sm mt-2",
};

const shoppingCartModalStyles = {
  overlay: "flex flex-col justify-start p-4 transition-all duration-300 ease-in-out w-[60%]",
  modal: "bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col",
  header: "flex items-center justify-between py-2 px-4 border-b border-gray-200",
  title: "text-2xl font-bold text-gray-900",
  closeBtn: "text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",
  contentWrapper: "flex-1 overflow-y-auto p-2",
  cartItemWrapper: "space-y-2",
  cartItem: "bg-gray-50 rounded-lg p-2 flex items-start justify-between gap-4",
  leftSection: "flex gap-2 flex-1",
  imageWrapper: "w-20 h-20 bg-white rounded-lg flex items-center justify-center p-2 flex-shrink-0",
  image: "w-full h-full object-contain",
  productInfo: "flex flex-col gap-2 flex-1 min-w-0",
  productTitle: "text-base font-semibold text-gray-900 line-clamp-2",
  price: "text-lg font-bold text-blue-500",
  quantity: "text-sm text-gray-600",
  removeBtn: "text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 cursor-pointer",
  footer: "border-t border-gray-200 px-4 py-2 space-y-4",
  totalContainer: "flex items-center justify-between",
  totalText: "text-xl font-semibold text-gray-900",
  totalAmount: "text-2xl font-bold text-blue-500",
  checkoutButton: "w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold transition-colors cursor-pointer",
  emptyCartMessage: "text-center py-12",
  emptyCartText: "text-gray-500 text-lg",
  emptyCartSubtext: "text-gray-400 text-sm mt-2",
};

const signupModalStyles = {
  overlay: "m-4 backdrop-blur-sm flex items-center justify-center p-4 z-50",
  modal: "bg-white rounded-2xl shadow-2xl w-full max-w-sm",
  header: "flex items-center justify-between m-4",
  title: "text-3xl font-bold text-gray-900",
  closeBtn: "text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",
  contentWrapper: "p-8",
  formFieldWrapper: "space-y-5",
  inputField: "w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
  label: "block text-sm font-semibold text-gray-700 mb-2",
  passwordWrapper: "relative",
  eyeButton: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",
  submitButton: "w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold transition-colors mt-6 cursor-pointer",
  loginLinkWrapper: "mt-6 text-center",
  loginLink: "text-blue-500 hover:text-blue-600 font-semibold transition-colors cursor-pointer",
};

export { dashboardStyles, productCardStyles, navbarStyles, modalStyles, wishListModalStyles, shoppingCartModalStyles , signupModalStyles };
