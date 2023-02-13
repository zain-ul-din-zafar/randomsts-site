import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from './FirebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);

export { app, auth, fireStore };

const userColRef = collection(fireStore, 'users');

// util
export async function signUpWithGithub() {
    const loggedInUser = await signInWithPopup(auth, new GithubAuthProvider());
    if (loggedInUser.user) {
        const userCredentialDoc = doc(userColRef, loggedInUser.user.uid);
        const user = Object.entries(loggedInUser.user.toJSON())
            .filter(([_, val]) => val != undefined)
            .reduce((obj, [key, val]) => {
                return { ...obj, [key]: val };
            }, {});
        setDoc(userCredentialDoc, user, { merge: false });
    }
}

export function signOutAuth() {
    signOut(auth);
}
