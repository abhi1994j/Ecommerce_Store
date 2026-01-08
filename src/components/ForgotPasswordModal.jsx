// components/ForgotPasswordModal.jsx

import { useState } from 'react';
import { X, Mail, ArrowLeft } from 'lucide-react';
import { signupModalStyles } from '../styles/ecommerceStyle';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { sendResetPasswordEmail } from '../services/passwordService';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .refine((email) => /\S+@\S+\.\S+/.test(email), {
      message: 'Please enter a valid email address',
    })
    .min(1, 'Email is required'),
});

export default function ForgotPasswordModal({ isOpen, setIsOpen, onBackToLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const onSubmit = async (data) => {
    const toastId = toast.loading('Sending reset link...');

    try {
      await sendResetPasswordEmail(data.email);

      toast.success('Password reset link sent!', {
        id: toastId,
        duration: 3000,
      });

      setEmailSent(true);
      setSentEmail(data.email);
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to send reset email', {
        id: toastId,
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEmailSent(false);
    reset();
  };

  const handleBackToLogin = () => {
    handleClose();
    onBackToLogin();
  };

  if (!isOpen) return null;

  return (
    <div className={signupModalStyles.overlay}>
      <div className={signupModalStyles.modal}>
        {/* Header */}
        <div className={signupModalStyles.header}>
          <span className={signupModalStyles.title}>
            {emailSent ? 'Check Your Email' : 'Reset Password'}
          </span>

          <button onClick={handleClose} className={signupModalStyles.closeBtn}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className={signupModalStyles.contentWrapper}>
          {emailSent ? (
            // Success State
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Sent Successfully!</h3>

              <p className="text-sm text-gray-600 mb-4">We've sent a password reset link to:</p>

              <p className="text-sm font-medium text-gray-800 mb-6">{sentEmail}</p>

              <p className="text-xs text-gray-500 mb-6">
                Check your inbox and spam folder. The link will expire in 1 hour.
              </p>

              <button
                onClick={handleBackToLogin}
                className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                Back to Login
              </button>
            </div>
          ) : (
            // Form State
            <>
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className={signupModalStyles.label}>Email Address</label>

                  <input
                    {...register('email')}
                    type="email"
                    placeholder="your@email.com"
                    className={`${signupModalStyles.inputField} ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />

                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${signupModalStyles.submitButton} ${
                    isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
