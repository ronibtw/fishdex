import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAEMz7BF30k71Hf98RZiHVjUQ8PACv9vPY",
  authDomain: "fishdex-5c4d9.firebaseapp.com",
  projectId: "fishdex-5c4d9",
  storageBucket: "fishdex-5c4d9.firebasestorage.app",
  messagingSenderId: "669547341525",
  appId: "1:669547341525:web:60b305b025b684ff90e45c",
  measurementId: "G-YFJ78BEMZQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
