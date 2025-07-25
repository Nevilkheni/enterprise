import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWfawAPTMXKKcoatxcIkok3yZry7bOrfM",
  authDomain: "product-3deed.firebaseapp.com",
  projectId: "product-3deed",
  storageBucket: "product-3deed.appspot.com",
  messagingSenderId: "41324039398",
  appId: "1:41324039398:web:2d7d38c61d63ac60c8ff27",
  measurementId: "G-EG5FZQ3Q15",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);