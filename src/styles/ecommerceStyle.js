// dashboardStyles.js

const dashboardStyles = {
  container: "p-2 md:p-4 lg:p-6",
  title: "text-gray-500 font-semibold mb-4",
  buttonContainer: "flex items-center flex-wrap md:no-wrap gap-1 md:gap-2 ",
  button: "px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs font-semibold cursor-pointer text-sm md:text-base"
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
  /* Logo */
  logoWrapper: "flex items-center gap-2",
  logoIcon: "bg-pink-500 rounded-full w-10 h-10 flex items-center justify-center",
  logoText: "text-white font-bold text-xl",
  storeText: "text-white font-bold text-2xl",
  /* Desktop */
  desktopNav: "hidden lg:flex items-center gap-4",
  /* Buttons */
  button: "relative cursor-pointer bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md cursor-pointer md:text-sm lg:text-base",
  badge: "absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center",
  /* Mobile */
  mobileMenuBtn: "lg:hidden cursor-pointer",
  mobileMenuIcon: "text-white hover:bg-blue-700 p-2 rounded-lg transition-colors",
  mobileMenuWrapper: "lg:hidden pb-4 space-y-3",
  mobileButton: "w-full cursor-pointer bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md",
  mobileBadge: "absolute  right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center",
  /* Search */
  searchWrapperDesktop: "hidden md:flex flex-1 max-w-xl mx-8",
  searchWrapperMobile: "md:hidden px-4 pb-3",
  searchContainer: "relative w-full",
  searchIcon: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400",
  searchInput: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
  /* Profile */
  profileButton: "flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg",
  profileInitial: "font-medium rounded-full border border-white px-2 py-0.5",
  profileDropdown: "absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50",
  /* Filter */
  filterButtonBase: "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
  filterActive: "bg-purple-100 text-purple-700 border-2 border-purple-500",
  filterInactive: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  filterDropdown: "absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-50",
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
  /* Overlay & Modal */
  overlay:
    "flex flex-col justify-start p-4 transition-all duration-300 ease-in-out w-[60%]",
  overlayVisible: "opacity-100",
  overlayHidden: "opacity-0",

  modal:
    "bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col",
  modalVisible: "translate-x-0 opacity-100",
  modalHidden: "translate-x-full opacity-0",

  /* Header */
  header:
    "flex items-center justify-between py-2 px-4 border-b border-gray-200",
  title: "text-2xl font-bold text-gray-900",
  closeBtn:
    "text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",
  closeIcon: "w-6 h-6",

  /* Content */
  contentWrapper: "flex-1 overflow-y-auto p-2",
  cartItemWrapper: "space-y-2",
  cartItem:
    "bg-gray-50 rounded-lg p-2 flex items-start justify-between gap-4",

  leftSection: "flex gap-2 flex-1",
  imageWrapper:
    "w-20 h-20 bg-white rounded-lg flex items-center justify-center p-2 flex-shrink-0",
  image: "w-full h-full object-contain",

  productInfo: "flex flex-col gap-2 flex-1 min-w-0",
  productTitle:
    "text-base font-semibold text-gray-900 line-clamp-2",
  price: "text-lg font-bold text-blue-500",

  /* Quantity */
  quantityControls: "flex items-center gap-3 mt-2",
  quantityBtn:
    "w-8 h-8 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors",
  quantityIcon: "w-4 h-4",
  quantityValue:
    "font-semibold text-gray-800 min-w-[2rem] text-center",

  /* Subtotal */
  subtotalText: "text-sm text-gray-600 mt-2",
  subtotalAmount: "font-semibold text-gray-800",

  /* Remove */
  removeBtn:
    "text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 cursor-pointer",
  removeIcon: "w-5 h-5",

  /* Footer */
  footer:
    "border-t border-gray-200 px-4 py-2 space-y-4",
  totalContainer:
    "flex items-center justify-between",
  totalText:
    "text-xl font-semibold text-gray-900",
  totalAmount:
    "text-2xl font-bold text-blue-500",

  checkoutButton:
    "w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold transition-colors cursor-pointer",

  /* Empty State */
  emptyCartMessage: "text-center py-12",
  emptyCartText: "text-gray-500 text-lg",
  emptyCartSubtext:
    "text-gray-400 text-sm mt-2",
};


// styles/ecommerceStyle.js

const signupModalStyles = {
  overlay: "flex flex-col justify-start items-center p-4 transition-all duration-300 ease-in-out backdrop-blur-sm p-4 md:w-[60%] w-full",
  modal: "bg-white rounded-2xl shadow-2xl w-full max-w-md",
  header: "flex items-center justify-between m-4",
  title: "text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900",
  closeBtn: "text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",
  contentWrapper: "p-8",
  formFieldWrapper: "space-y-5",
  inputField: "w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
  label: "block text-sm font-semibold text-gray-700 mb-2",
  passwordWrapper: "relative",
  eyeButton: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",
  submitButton: "w-full flex item-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold transition-colors mt-6 cursor-pointer",
  loginLinkWrapper: "mt-6 text-center",
  loginLink: "text-blue-500 hover:text-blue-600 font-semibold transition-colors cursor-pointer",
};


const loginGoogleStyles = {
  dividerWrapper: "flex items-center gap-3 my-4",
  dividerLine: "flex-1 h-px bg-gray-300",
  dividerText: "text-sm text-gray-500",
  googleButton:
    "w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition",
  googleIcon: "w-5 h-5",
  googleText: "text-sm font-medium text-gray-700",
};



export { dashboardStyles, productCardStyles, navbarStyles, modalStyles, wishListModalStyles, shoppingCartModalStyles, signupModalStyles, loginGoogleStyles };
