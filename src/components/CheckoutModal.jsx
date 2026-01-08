import { useState, useEffect, useContext } from 'react';
import { X, MapPin, CreditCard, Smartphone, Wallet, ChevronRight } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { cartContext } from '../context/cartContext';
import { useAuth } from '../context/AuthContext';
import AddressModal from './AddressModal';
import toast from 'react-hot-toast';

export default function CheckoutModal({ isOpen, setIsOpen }) {
  const { user } = useAuth();
  const { cartList, setCartLst } = useContext(cartContext);
  const { selectedAddress, createOrder } = useOrder();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  // Calculate totals
  const subtotal = cartList.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      setIsAddressModalOpen(true);
      return;
    }

    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    setProcessing(true);

    try {
      // In a real app, you would create an order on your backend
      // and get the Razorpay order_id
      const options = {
        key: 'rzp_test_your_key_here', // Replace with your Razorpay key
        amount: Math.round(total * 100), // Amount in paise
        currency: 'INR',
        name: 'Store',
        description: 'Order Payment',
        image: '/logo.png',
        handler: function (response) {
          // Payment successful
          const orderData = {
            items: cartList,
            address: selectedAddress,
            paymentMethod: paymentMethod,
            paymentId: response.razorpay_payment_id,
            subtotal: subtotal,
            shipping: shipping,
            tax: tax,
            total: total,
            status: 'confirmed',
          };

          createOrder(orderData);
          setCartLst([]); // Clear cart
          setIsOpen(false);
          toast.success('Order placed successfully!');
          setProcessing(false);
        },
        prefill: {
          name: user.displayName || '',
          email: user.email || '',
          contact: selectedAddress.phone || '',
        },
        theme: {
          color: '#9333EA',
        },
        method: {
          upi: paymentMethod === 'upi',
          card: paymentMethod === 'card',
          netbanking: paymentMethod === 'netbanking',
          wallet: paymentMethod === 'wallet',
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on('payment.failed', ()=>{
        toast.error('Payment failed! Please try again.');
        setProcessing(false);
      });

      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed! Please try again.');
      setProcessing(false);
    }
  };

  const handleCOD = () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      setIsAddressModalOpen(true);
      return;
    }

    const orderData = {
      items: cartList,
      address: selectedAddress,
      paymentMethod: 'cod',
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      total: total,
      status: 'pending',
    };

    createOrder(orderData);
    setCartLst([]); // Clear cart
    setIsOpen(false);
    toast.success('Order placed successfully! Pay on delivery.');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Delivery & Payment */}
              <div className="space-y-6">
                {/* Delivery Address */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Delivery Address
                    </h3>
                    <button
                      onClick={() => setIsAddressModalOpen(true)}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Change
                    </button>
                  </div>

                  {selectedAddress ? (
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="font-medium text-gray-800">{selectedAddress.fullName}</p>
                      <p className="text-sm text-gray-600 mt-1">{selectedAddress.phone}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedAddress.addressLine1}, {selectedAddress.addressLine2 && `${selectedAddress.addressLine2}, `}
                        {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddressModalOpen(true)}
                      className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-500 hover:text-purple-600 transition"
                    >
                      + Add Delivery Address
                    </button>
                  )}
                </div>

                {/* Payment Method */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </h3>

                  <div className="space-y-3">
                    {/* UPI */}
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`w-full p-3 rounded-lg border-2 transition flex items-center justify-between ${
                        paymentMethod === 'upi'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-purple-600" />
                        <div className="text-left">
                          <p className="font-medium text-gray-800">UPI</p>
                          <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>

                    {/* Cards */}
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-3 rounded-lg border-2 transition flex items-center justify-between ${
                        paymentMethod === 'card'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                        <div className="text-left">
                          <p className="font-medium text-gray-800">Credit / Debit Card</p>
                          <p className="text-xs text-gray-500">Visa, Mastercard, Rupay</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>

                    {/* Net Banking */}
                    <button
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`w-full p-3 rounded-lg border-2 transition flex items-center justify-between ${
                        paymentMethod === 'netbanking'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-purple-600" />
                        <div className="text-left">
                          <p className="font-medium text-gray-800">Net Banking</p>
                          <p className="text-xs text-gray-500">All major banks</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>

                    {/* Wallets */}
                    <button
                      onClick={() => setPaymentMethod('wallet')}
                      className={`w-full p-3 rounded-lg border-2 transition flex items-center justify-between ${
                        paymentMethod === 'wallet'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-purple-600" />
                        <div className="text-left">
                          <p className="font-medium text-gray-800">Wallets</p>
                          <p className="text-xs text-gray-500">Paytm, Amazon Pay</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>

                    {/* Cash on Delivery */}
                    <button
                      onClick={() => setPaymentMethod('cod')}
                      className={`w-full p-3 rounded-lg border-2 transition flex items-center justify-between ${
                        paymentMethod === 'cod'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-purple-600" />
                        <div className="text-left">
                          <p className="font-medium text-gray-800">Cash on Delivery</p>
                          <p className="text-xs text-gray-500">Pay when you receive</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div>
                <div className="border rounded-lg p-4 sticky top-0">
                  <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>

                  {/* Items */}
                  <div className="max-h-48 overflow-y-auto mb-4 space-y-3">
                    {cartList.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-contain border rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 line-clamp-2">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          <p className="text-sm font-semibold text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (18% GST)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-purple-600">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <button
                    onClick={paymentMethod === 'cod' ? handleCOD : handlePayment}
                    disabled={processing || !selectedAddress}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing
                      ? 'Processing...'
                      : paymentMethod === 'cod'
                      ? 'Place Order (COD)'
                      : 'Proceed to Payment'}
                  </button>

                  {!selectedAddress && (
                    <p className="text-xs text-red-500 mt-2 text-center">
                      Please select a delivery address
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        setIsOpen={setIsAddressModalOpen}
        mode="select"
      />
    </>
  );
}
