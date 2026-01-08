// services/passwordService.js
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';

/**
 * Send password reset email
 */
export const sendResetPasswordEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: window.location.origin, // Redirect back to your app after reset
      handleCodeInApp: false,
    });
  } catch (error) {
    // Handle specific Firebase errors
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many requests. Please try again later');
    } else {
      throw new Error('Failed to send reset email. Please try again');
    }
  }
};
