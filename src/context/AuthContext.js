
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const clearAuth = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("cartData");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearAuth();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!active) return;

      if (currentUser) {
        const adminEmails = ["nevilkheni14@gmail.com"];
        const isAdmin = adminEmails.includes(currentUser.email);

        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          const dbCart = userDoc.exists() ? userDoc.data().cart || [] : [];

          // 🔑 LocalStorage Sync
          const localCartData = JSON.parse(localStorage.getItem("cartData"));
          let finalCart = dbCart;

          if (localCartData && localCartData.uid === currentUser.uid) {
            finalCart = localCartData.cart || [];
          }

          if (active) {
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              displayName:
                currentUser.displayName || currentUser.email.split("@")[0],
              photoURL:
                currentUser.photoURL ||
                "https://ui-avatars.com/api/?name=User",
              role: isAdmin ? "admin" : "user",
            });
            setCart(finalCart);
          }

          // localStorage update bhi kar de
          localStorage.setItem(
            "cartData",
            JSON.stringify({ uid: currentUser.uid, cart: finalCart })
          );
        } catch (error) {
          console.error("Error loading user cart:", error);
        }
      } else {
        clearAuth();
      }

      if (active) setLoading(false);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const updateCart = async (newCart) => {
    if (!user) return;

    setCart(newCart);

    try {
      await setDoc(
        doc(db, "users", user.uid),
        { cart: newCart },
        { merge: true }
      );

      // ✅ LocalStorage me sirf apne UID ke saath save hoga
      localStorage.setItem(
        "cartData",
        JSON.stringify({ uid: user.uid, cart: newCart })
      );
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        cart,
        updateCart,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
