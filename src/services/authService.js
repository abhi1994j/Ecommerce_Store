import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase';
import { createUserIfNotExists } from './userService';

export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // 🔒 Email verification check
  // if (!user.emailVerified) {
  //   await auth.signOut();
  //   throw new Error('Please verify your email before logging in');
  // }
  // 🔐 Save user in Firestore
  await createUserIfNotExists(user);
  return user;
};

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // 🔐 Save user in Firestore
  await createUserIfNotExists(user);

  return user;
};
