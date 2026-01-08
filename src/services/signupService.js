import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { createUserIfNotExists } from './userService';

/**
 * Signup with email & password
 */
export const signupWithEmail = async ({ fullname, email, password }) => {
  // Create Firebase auth user
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // Set display name in Firebase Auth
  if (fullname) {
    await updateProfile(user, {
      displayName: fullname,
    });
  }

  // 📧 Send verification email
  await sendEmailVerification(user);

  // ✅ Try to save user in Firestore (but don't fail signup if it doesn't work)
  createUserIfNotExists(user).catch((error) => {
    console.error('⚠️ Firestore write failed (will retry on login):', error.message);
    // User signup still succeeds - Firestore doc can be created on first login
  });

  return user;
};
