import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchCart = async (user) => {
  if (user) {
    const snap = await getDoc(doc(db, "carts", user.uid));
    return snap.exists() ? snap.data().items || [] : [];
  } else {
    const local = localStorage.getItem("cart");
    return local ? JSON.parse(local) : [];
  }
};

export const saveCart = async (user, cart) => {
  if (user) {
    await setDoc(doc(db, "carts", user.uid), { items: cart }, { merge: true });
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
