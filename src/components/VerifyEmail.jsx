// import React, { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { auth } from "../firebase";
// import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";

// const db = getFirestore();

// const VerifyEmail = () => {
//   const [message, setMessage] = useState("Verifying your email...");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const uid = searchParams.get("uid");

//   useEffect(() => {
//     const verifyEmail = async () => {
//       if (!uid) {
//         setError("Invalid verification link.");
//         return;
//       }

//       try {
//         const unverifiedDoc = await getDoc(doc(db, "unverified_users", uid));
//         if (!unverifiedDoc.exists()) {
//           setError("Invalid verification link or account already verified.");
//           return;
//         }

//         const userData = unverifiedDoc.data();
        
//         await signInWithEmailAndPassword(auth, userData.email, userData.password);
        
//         await auth.currentUser.reload();
        
//         if (auth.currentUser.emailVerified) {
//           await setDoc(doc(db, "users", uid), {
//             ...userData,
//             emailVerified: true,
//             verifiedAt: new Date()
//           });
          
//           await deleteDoc(doc(db, "unverified_users", uid));
          
//           setMessage("Email verified successfully! Redirecting to login...");
//           setTimeout(() => {
//             signOut(auth);
//             navigate("/login");
//           }, 3000);
//         } else {
//           setError("Email not verified yet. Please try again.");
//           await signOut(auth);
//         }
//       } catch (error) {
//         console.error("Verification error:", error);
//         setError("Failed to verify email. Please try again.");
//       }
//     };

//     verifyEmail();
//   }, [uid, navigate]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
//         {error ? (
//           <>
//             <div className="text-red-500 text-5xl mb-4">❌</div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Failed</h2>
//             <p className="text-gray-700 mb-6">{error}</p>
//             <button
//               onClick={() => navigate("/login")}
//               className="w-full py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
//             >
//               Go to Login
//             </button>
//           </>
//         ) : (
//           <>
//             <div className="text-green-500 text-5xl mb-4">✓</div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Verifying Email</h2>
//             <p className="text-gray-700">{message}</p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../firebase";
import { doc, getDoc, setDoc, deleteDoc, getFirestore } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const db = getFirestore();

const VerifyEmail = () => {
  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!uid) {
        setError("Invalid verification link.");
        return;
      }

      try {
        const unverifiedDoc = await getDoc(doc(db, "unverified_users", uid));
        if (!unverifiedDoc.exists()) {
          setError("Invalid verification link or account already verified.");
          return;
        }

        const userData = unverifiedDoc.data();

        // Temporary sign-in to check verification status
        await signInWithEmailAndPassword(auth, userData.email, userData.password);
        await auth.currentUser.reload();

        if (auth.currentUser.emailVerified) {
          await setDoc(doc(db, "users", uid), {
            ...userData,
            emailVerified: true,
            verifiedAt: new Date(),
          });

          await deleteDoc(doc(db, "unverified_users", uid));

          setMessage("Email verified successfully! Redirecting to login...");
          setTimeout(() => {
            signOut(auth);
            navigate("/login");
          }, 3000);
        } else {
          setError("Email not verified yet. Please try again.");
          await signOut(auth);
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError("Failed to verify email. Please try again.");
      }
    };

    verifyEmail();
  }, [uid, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
        {error ? (
          <>
            <div className="text-red-500 text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Verification Failed
            </h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Go to Login
            </button>
          </>
        ) : (
          <>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Verifying Email
            </h2>
            <p className="text-gray-700">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
