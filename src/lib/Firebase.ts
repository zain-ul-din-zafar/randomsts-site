import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { firebaseConfig } from './FirebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

// util

export async function signUpWithGithub() {
    await signInWithPopup(auth, new GithubAuthProvider());
}

export function signOutAuth() {
    signOut(auth);
}
