// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYchz9X2KnxznQy5i0WA4TXW8wwVNrgL8",
  authDomain: "portfolio-b6a33.firebaseapp.com",
  projectId: "portfolio-b6a33",
  storageBucket: "portfolio-b6a33.firebasestorage.app",
  messagingSenderId: "240197939518",
  appId: "1:240197939518:web:658536adde889981b07c6f",
  measurementId: "G-5VHCZ115ZJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
