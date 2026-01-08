import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

/**
 * Create user document if it does not exist
 */
export const createUserIfNotExists = async (user) => {
  if (!user?.uid) return;

  const userRef = doc(db, 'users', user.uid);

  // ✅ Use merge: true - no getDoc needed!
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || null,
    provider: user.providerData?.[0]?.providerId || 'password',
    createdAt: serverTimestamp(),
  }, { merge: true });
};
