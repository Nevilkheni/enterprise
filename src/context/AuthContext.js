
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (!isMounted) return;

//       if (currentUser) {
//         // Define admin emails (can be moved to Firestore)
//         const adminEmails = ["nevilkheni135@gmail.com"];
//         const isAdmin = adminEmails.includes(currentUser.email);

//         // Only store necessary user fields
//         setUser({
//           uid: currentUser.uid,
//           email: currentUser.email,
//           displayName: currentUser.displayName,
//           photoURL: currentUser.photoURL,
//           role: isAdmin ? "admin" : "user",
//         });
//       } else {
//         setUser(null);
//       }

//       setLoading(false);
//     });

//     return () => {
//       isMounted = false;
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const clearAuth = () => {
    setUser(null);
    setCart([]);
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
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMounted) return;

      if (currentUser) {
        // Define admin emails
        const adminEmails = ["nevilkheni135@gmail.com"];
        const isAdmin = adminEmails.includes(currentUser.email);

        // Clear previous cart data before loading new user's cart
        setCart([]);

        // Get user's cart from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          const userCart = userDoc.exists() ? userDoc.data().cart || [] : [];

          if (isMounted) {
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              role: isAdmin ? "admin" : "user",
            });
            setCart(userCart);
          }
        } catch (error) {
          console.error("Error loading user cart:", error);
        }
      } else {
        clearAuth();
      }

      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
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
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      cart, 
      updateCart,
      handleLogout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}