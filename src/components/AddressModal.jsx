import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Plus, MapPin, Edit2, Trash2, Check } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import toast from 'react-hot-toast';

export default function AddressModal({ isOpen, setIsOpen, mode = 'select' }) {
  const { addresses, selectedAddress, setSelectedAddress, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useOrder();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    }
  });

  const resetForm = () => {
    reset();
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleEdit = (address) => {
    // Set form values when editing
    Object.keys(address).forEach(key => {
      setValue(key, address[key]);
    });
    setEditingId(address.id);
    setShowAddForm(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await updateAddress(editingId, data);
      } else {
        await addAddress(data);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const handleDeleteAddress = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium">Are you sure you want to delete this address?</p>

          <div className="flex justify-end gap-2">
            <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1 border rounded-md">
              Cancel
            </button>

            <button
              onClick={() => {
                deleteAddress(id);
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    if (mode === 'select') {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                            {address.addressLine1},{' '}
                            {address.addressLine2 && `${address.addressLine2}, `}
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
                            handleDeleteAddress(address.id);
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('fullName', {
                      required: 'Full name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Phone number must be exactly 10 digits'
                      }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="10 digit mobile number"
                    maxLength={10}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  {...register('addressLine1', {
                    required: 'Address line 1 is required',
                    minLength: {
                      value: 5,
                      message: 'Address must be at least 5 characters'
                    }
                  })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.addressLine1 ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="House No, Building Name"
                />
                {errors.addressLine1 && (
                  <p className="text-red-500 text-xs mt-1">{errors.addressLine1.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  {...register('addressLine2')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Road Name, Area, Colony"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    {...register('city', {
                      required: 'City is required',
                      minLength: {
                        value: 2,
                        message: 'City must be at least 2 characters'
                      }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    {...register('state', {
                      required: 'State is required',
                      minLength: {
                        value: 2,
                        message: 'State must be at least 2 characters'
                      }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    {...register('pincode', {
                      required: 'Pincode is required',
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: 'Pincode must be exactly 6 digits'
                      }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.pincode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="6 digits"
                    maxLength={6}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  {...register('isDefault')}
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
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition font-medium"
                >
                  {editingId ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
