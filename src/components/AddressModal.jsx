import { useState } from 'react';
import { X, Plus, MapPin, Edit2, Trash2, Check } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import toast from 'react-hot-toast';

export default function AddressModal({ isOpen, setIsOpen, mode = 'select' }) {
  const { addresses, selectedAddress, setSelectedAddress, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useOrder();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address.id);
    setShowAddForm(true);
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.fullName || !formData.phone || !formData.addressLine1 ||
        !formData.city || !formData.state || !formData.pincode) {
      toast.error('Please fill all required fields');
      return;
    }

    if (formData.phone.length !== 10) {
      toast.error('Phone number must be 10 digits');
      return;
    }

    if (formData.pincode.length !== 6) {
      toast.error('Pincode must be 6 digits');
      return;
    }

    if (editingId) {
      updateAddress(editingId, formData);
    } else {
      addAddress(formData);
    }

    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress(id);
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    if (mode === 'select') {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {showAddForm ? (editingId ? 'Edit Address' : 'Add New Address') : 'My Addresses'}
          </h2>
          <button
            onClick={() => {
              resetForm();
              setIsOpen(false);
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!showAddForm ? (
            <>
              {/* Add New Address Button */}
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full mb-4 py-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:border-purple-500 hover:bg-purple-50 transition flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add New Address
              </button>

              {/* Address List */}
              {addresses.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No addresses saved yet</p>
                  <p className="text-gray-400 text-sm mt-2">Add your first address to continue</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 transition cursor-pointer ${
                        selectedAddress?.id === address.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      onClick={() => handleSelectAddress(address)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-800">{address.fullName}</h3>
                            {address.isDefault && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-1">{address.phone}</p>
                          <p className="text-gray-600 text-sm">
                            {address.addressLine1}, {address.addressLine2 && `${address.addressLine2}, `}
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                        </div>

                        {/* Selected Indicator */}
                        {selectedAddress?.id === address.id && (
                          <div className="ml-4">
                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200">
                        {!address.isDefault && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDefaultAddress(address.id);
                            }}
                            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(address);
                          }}
                          className="ml-auto text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(address.id);
                          }}
                          className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Add/Edit Form */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="10 digit mobile number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="House No, Building Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  value={formData.addressLine2}
                  onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Road Name, Area, Colony"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="6 digits"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="isDefault" className="text-sm text-gray-700">
                  Set as default address
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition font-medium"
                >
                  {editingId ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
