// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcgJE-A5fP6I5eiDmaSQ-enj-FccrRZlQ",
  authDomain: "recipe-book-app-21872.firebaseapp.com",
  projectId: "recipe-book-app-21872",
  storageBucket: "recipe-book-app-21872.firebasestorage.app",
  messagingSenderId: "958951980311",
  appId: "1:958951980311:web:fd36990bf1c8ae8b4b0b52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
export { db, googleProvider };
