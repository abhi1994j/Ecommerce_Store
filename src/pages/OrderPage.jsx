import { useState } from 'react';
import {
  Package,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function OrdersPage() {
  const { orders } = useOrder();
  const { user } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentMethodDisplay = (method) => {
    switch (method) {
      case 'upi':
        return 'UPI Payment';
      case 'card':
        return 'Card Payment';
      case 'netbanking':
        return 'Net Banking';
      case 'wallet':
        return 'Wallet';
      case 'cod':
        return 'Cash on Delivery';
      default:
        return method;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!user) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Login</h2>
          <p className="text-gray-600">Login to view your orders</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">View and track your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to place your first order!</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition font-medium"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-semibold text-gray-800">{order.id}</p>
                      </div>
                      <div className="hidden sm:block h-8 w-px bg-gray-300"></div>
                      <div className="hidden sm:block">
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="font-medium text-gray-800">{formatDate(order.orderDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <button
                        onClick={() =>
                          setExpandedOrder(expandedOrder === order.id ? null : order.id)
                        }
                        className="p-2 hover:bg-gray-200 rounded-full transition"
                      >
                        {expandedOrder === order.id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="p-4">
                  <div className="flex gap-3 overflow-x-auto">
                    {order.items.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-contain border rounded"
                        />
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="flex-shrink-0 w-20 h-20 border rounded flex items-center justify-center bg-gray-50">
                        <span className="text-sm font-medium text-gray-600">
                          +{order.items.length - 4}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </p>
                    <p className="text-lg font-bold text-purple-600">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrder === order.id && (
                  <div className="border-t bg-gray-50 p-4 space-y-4">
                    {/* Delivery Address */}
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 mb-1">Delivery Address</p>
                          <p className="text-gray-700">{order.address.fullName}</p>
                          <p className="text-sm text-gray-600">{order.address.phone}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {order.address.addressLine1},{' '}
                            {order.address.addressLine2 && `${order.address.addressLine2}, `}
                            {order.address.city}, {order.address.state} - {order.address.pincode}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-lg p-4">
                      <p className="font-semibold text-gray-800 mb-3">Order Items</p>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-3 pb-3 border-b last:border-b-0">
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
                              <p className="text-sm font-semibold text-gray-800 mt-1">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="bg-white rounded-lg p-4">
                      <p className="font-semibold text-gray-800 mb-3">Price Details</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-medium">
                            {order.shipping === 0 ? (
                              <span className="text-green-600">FREE</span>
                            ) : (
                              `$${order.shipping.toFixed(2)}`
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax (GST)</span>
                          <span className="font-medium">${order.tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold text-base">
                          <span>Total</span>
                          <span className="text-purple-600">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-purple-600 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">Payment Method</p>
                          <p className="text-sm text-gray-600">
                            {getPaymentMethodDisplay(order.paymentMethod)}
                          </p>
                          {order.paymentId && (
                            <p className="text-xs text-gray-500 mt-1">
                              Payment ID: {order.paymentId}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
