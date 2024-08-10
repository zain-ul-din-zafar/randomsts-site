import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAAEkvETCjXie0RTaYETHwF_hPpyC2u1C4",
    authDomain: "linklift-75e4b.firebaseapp.com",
    projectId: "linklift-75e4b",
    storageBucket: "linklift-75e4b.appspot.com",
    messagingSenderId: "299526570257",
    appId: "1:299526570257:web:7cf5fac54743f23569ccb0",
    measurementId: "G-GQ8GH86YK8"
};

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
