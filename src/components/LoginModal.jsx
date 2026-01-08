import { useEffect, useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { loginGoogleStyles, signupModalStyles } from '../styles/ecommerceStyle';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../libs/schemaValidations';
import { FcGoogle } from 'react-icons/fc';
import { loginFields } from '../constants/Fields';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { loginWithEmail, loginWithGoogle } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import ForgotPasswordModal from './ForgotPasswordModal';

export default function LoginModal() {
  const { setIsLoginOpen, setIsSignupOpen } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const closeAfterToast = (callback, duration = 2000) => {
    setTimeout(callback, duration);
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading('Logging in...');

    try {
      const user = await loginWithEmail(data.email, data.password);

      toast.success(`Welcome back, ${user.email}`, {
        id: toastId,
        duration: 2000,
      });

      closeAfterToast(() => setIsLoginOpen(false));
      reset();
    } catch (error) {
      toast.error(error.message || 'Login failed', { id: toastId });
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordOpen(true);
  };

  const handleGoogleLogin = async () => {
    const toastId = toast.loading('Redirecting to Google...');

    try {
      const user = await loginWithGoogle();

      toast.success(`Welcome, ${user.email}`, {
        id: toastId,
        duration: 2000,
      });

      closeAfterToast(() => setIsLoginOpen(false));
    } catch (error) {
      toast.error(error.message || 'Google login failed', { id: toastId });
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      toast.error(firstError.message);
    }
  }, [errors]);

  return (
    <>
      {/* Only show LoginModal if ForgotPasswordModal is NOT open */}
      {!isForgotPasswordOpen && (
        <div className={signupModalStyles.overlay}>
          <div className={signupModalStyles.modal}>
            {/* Header */}
            <div className={signupModalStyles.header}>
              <span className={signupModalStyles.title}>Login Account</span>
              <button onClick={() => setIsLoginOpen(false)} className={signupModalStyles.closeBtn}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className={signupModalStyles.contentWrapper}>
              {/* Form Fields */}
              <form className={signupModalStyles.formFieldWrapper} onSubmit={handleSubmit(onSubmit)}>
                {loginFields.map((field) => (
                  <div key={field.name}>
                    <label className={signupModalStyles.label}>{field.label}</label>

                    {field.toggle ? (
                      <div className={signupModalStyles.passwordWrapper}>
                        <input
                          {...register(field.name)}
                          type={showPassword ? 'text' : 'password'}
                          placeholder={field.placeholder}
                          className={`${signupModalStyles.inputField} pr-12 ${
                            errors[field.name] ? 'border-red-500' : ''
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className={signupModalStyles.eyeButton}
                        >
                          {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                      </div>
                    ) : (
                      <input
                        {...register(field.name)}
                        type={field.type}
                        placeholder={field.placeholder}
                        className={`${signupModalStyles.inputField} ${
                          errors[field.name] ? 'border-red-500' : ''
                        }`}
                      />
                    )}
                  </div>
                ))}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${signupModalStyles.submitButton} ${
                    isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 italic">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Logging in...
                    </span>
                  ) : (
                    'Log in'
                  )}
                </button>

                {/* Forgot Password Link */}
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline text-right font-medium"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>

                {/* Divider */}
                <div className={loginGoogleStyles.dividerWrapper}>
                  <div className={loginGoogleStyles.dividerLine} />
                  <span className={loginGoogleStyles.dividerText}>OR</span>
                  <div className={loginGoogleStyles.dividerLine} />
                </div>

                {/* Google Login */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isSubmitting}
                  className={`${loginGoogleStyles.googleButton} ${
                    isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <FcGoogle className={loginGoogleStyles.googleIcon} />
                      <span className={loginGoogleStyles.googleText}>Continue with Google</span>
                    </>
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className={signupModalStyles.loginLinkWrapper}>
                <span className="text-gray-600">Don't have an account? </span>
                <button
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsSignupOpen(true);
                  }}
                  className={signupModalStyles.loginLink}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        setIsOpen={setIsForgotPasswordOpen}
        onBackToLogin={() => {
          setIsForgotPasswordOpen(false);
          // LoginModal will automatically show again
        }}
      />
    </>
  );
}
