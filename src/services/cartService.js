import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getCart = async (uid) => {
  const cartRef = doc(db, "carts", uid);
  const cartSnap = await getDoc(cartRef);
  return cartSnap.exists() ? cartSnap.data().items : [];
};

export const updateCart = async (uid, items) => {
  const cartRef = doc(db, "carts", uid);
  await setDoc(cartRef, { items });
};
