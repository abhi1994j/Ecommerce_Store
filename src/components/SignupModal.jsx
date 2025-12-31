import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { signupModalStyles } from '../styles/ecommerceStyle';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignupModal({ isOpen, setIsOpen, onLoginClick }) {
 const {
   register,
   handleSubmit,
   formState: { errors },
   reset,
   setError,
 } = useForm({
   resolver: zodResolver(signupSchema),
   defaultValues: {
     email: '',
     password: '',
     confirm_password: '',
   },
 });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = () => {
  //   if (formData.password !== formData.confirmPassword) {
  //     alert('Passwords do not match!');
  //     return;
  //   }
  //   console.log('Form submitted:', formData);
  //   // Add your signup logic here
  // };

  return (
    <div className={signupModalStyles.overlay}>
      <div className={signupModalStyles.modal}>
        {/* Header */}
        <div className={signupModalStyles.header}>
          <span className={signupModalStyles.title}>Create Account</span>
          <button
            // onClick={() => setIsOpen(false)}
            className={signupModalStyles.closeBtn}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className={signupModalStyles.contentWrapper}>
          {/* Form Fields */}
          <form className={signupModalStyles.formFieldWrapper} onSubmit={''}>
            {/* Full Name */}
            <div>
              <label className={signupModalStyles.label}>Full Name</label>
              <input
                type="text"
                name="fullName"
                // value={formData.fullName}
                placeholder="John Doe"
                className={signupModalStyles.inputField}
              />
            </div>

            {/* Email */}
            <div>
              <label className={signupModalStyles.label}>Email</label>
              <input
                type="email"
                name="email"
                // value={formData.email}
                // onChange={handleChange}
                placeholder="your@email.com"
                className={signupModalStyles.inputField}
              />
            </div>

            {/* Password */}
            <div>
              <label className={signupModalStyles.label}>Password</label>
              <div className={signupModalStyles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  // value={formData.password}
                  // onChange={handleChange}
                  placeholder="••••••••"
                  className={signupModalStyles.inputField + ' pr-12'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={signupModalStyles.eyeButton}
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className={signupModalStyles.label}>
                Confirm Password
              </label>
              <div className={signupModalStyles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  // value={formData.confirmPassword}
                  // onChange={handleChange}
                  placeholder="••••••••"
                  className={signupModalStyles.inputField + ' pr-12'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={signupModalStyles.eyeButton}
                >
                  {showConfirmPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className={signupModalStyles.submitButton}
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className={signupModalStyles.loginLinkWrapper}>
            <span className="text-gray-600">Already have an account? </span>
            <button
              // onClick={() => {
              //   setIsOpen(false);
              //   if (onLoginClick) onLoginClick();
              // }}
              className={signupModalStyles.loginLink}
            >
              Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
