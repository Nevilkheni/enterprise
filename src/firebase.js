import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBWfawAPTMXKKcoatxcIkok3yZry7bOrfM",
  authDomain: "product-3deed.firebaseapp.com", 
  projectId: "product-3deed",
  storageBucket: "product-3deed.firebasestorage.app", 
  messagingSenderId: "41324039398",
  appId: "1:41324039398:web:2d7d38c61d63ac60c8ff27",
  measurementId: "G-EG5FZQ3Q15"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app, "asia-south1");

export { auth, db, storage, functions };
export default app;