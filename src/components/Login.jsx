import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { signupModalStyles } from '../styles/ecommerceStyle';

export default function SignupModal({ isOpen, setIsOpen, onLoginClick }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
   
  });

  const [showPassword, setShowPassword] = useState(false);

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
          <span className={signupModalStyles.title}>Login Account</span>
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
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Log In Button */}
            <button type="submit" className={signupModalStyles.submitButton}>
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <div className={signupModalStyles.loginLinkWrapper}>
            <span className="text-gray-600">Don't have an account? </span>
            <button
              // onClick={() => {
              //   setIsOpen(false);
              //   if (onLoginClick) onLoginClick();
              // }}
              className={signupModalStyles.loginLink}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
