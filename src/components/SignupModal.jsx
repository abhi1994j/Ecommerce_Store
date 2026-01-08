import { useEffect, useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { signupModalStyles } from '../styles/ecommerceStyle';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../libs/schemaValidations';
import { signupFields } from '../constants/Fields';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { signupWithEmail } from '../services/signupService';
import { useAuth } from '../context/AuthContext';


export default function SignupModal() {
  const { setIsLoginOpen, setIsSignupOpen } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirm_password: false,
  });

  const toggleVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      toast.error(firstError.message);
    }
  }, [errors]);

  const closeAfterToast = (callback, duration = 2000) => {
    setTimeout(callback, duration);
  };

 const onSubmit = async (data) => {
   const toastId = toast.loading('Creating account...');
   try {
     const user = await signupWithEmail(data);
     toast.success(
       `Welcome, account created ${user.displayName}, Please verify your email before logging in`,
       {
         id: toastId,
         duration: 2000,
       }
     );
     closeAfterToast(() => setIsSignupOpen(false));
     reset();
   } catch (error) {
      console.log(error);
     toast.error(error.message || 'Signup failed', {
       id: toastId,
     });
   }
 };


  return (
    <div className={signupModalStyles.overlay}>
      <div className={signupModalStyles.modal}>
        {/* Header */}
        <div className={signupModalStyles.header}>
          <span className={signupModalStyles.title}>Create Account</span>
          <button onClick={() => setIsSignupOpen(false)} className={signupModalStyles.closeBtn}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className={signupModalStyles.contentWrapper}>
          {/* Form Fields */}
          <form className={signupModalStyles.formFieldWrapper} onSubmit={handleSubmit(onSubmit)}>
            {signupFields.map((field) => (
              <div key={field.name}>
                <label className={signupModalStyles.label}>{field.label}</label>

                {field.toggle ? (
                  <div className={signupModalStyles.passwordWrapper}>
                    <input
                      {...register(field.name)}
                      type={passwordVisibility[field.name] ? 'text' : field.type}
                      placeholder={field.placeholder}
                      className={`${signupModalStyles.inputField} pr-12 ${
                        errors[field.name] ? 'border-red-500' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => toggleVisibility(field.name)}
                      className={signupModalStyles.eyeButton}
                    >
                      {passwordVisibility[field.name] ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
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
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${signupModalStyles.submitButton} ${
                isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {' '}
              {isSubmitting ? (
                <span className="flex items-center gap-2 italic">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing up...
                </span>
              ) : (
                'Sign up'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className={signupModalStyles.loginLinkWrapper}>
            <span className="text-gray-600">Already have an account? </span>
            <button
              onClick={() => {
                setIsLoginOpen(true);
                setIsSignupOpen(false);
              }}
              className={signupModalStyles.loginLink}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
