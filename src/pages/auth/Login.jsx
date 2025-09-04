// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   signInWithEmailAndPassword,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { auth } from "../../firebase";
// import { useAuth } from "../../context/AuthContext";
// import {
//   EyeIcon,
//   EyeSlashIcon,
//   EnvelopeIcon,
//   LockClosedIcon,
// } from "@heroicons/react/24/outline";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const { handleLogout } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     setLoading(true);

//     try {
//       await handleLogout();
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/");
//     } catch (err) {
//       let errorMessage = "Unable to sign in. Please try again.";

//       switch (err.code) {
//         case "auth/invalid-credential":
//         case "auth/wrong-password":
//         case "auth/user-not-found":
//           errorMessage = "Invalid email or password";
//           break;

//         case "auth/too-many-requests":
//           errorMessage =
//             "Account temporarily locked due to too many failed attempts. Try again later or reset your password.";
//           break;

//         case "auth/invalid-email":
//           errorMessage = "Please enter a valid email address";
//           break;

//         default:
//           errorMessage = "Something went wrong. Please try again.";
//       }

//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPassword = async () => {
//     if (!email) {
//       setError("Please enter your email address to reset your password.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setMessage("");

//     try {
//       await sendPasswordResetEmail(auth, email);
//       setMessage(
//         `Password reset link sent to ${email}. Check your inbox (and spam folder).`
//       );
//     } catch (err) {
//       let errorMessage = "Unable to send reset link. Please try again.";

//       switch (err.code) {
//         case "auth/user-not-found":
//           errorMessage = "No account found with this email address.";
//           break;
//         case "auth/invalid-email":
//           errorMessage = "Please enter a valid email address.";
//           break;
//         default:
//           errorMessage = "Something went wrong. Please try again.";
//       }

//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Welcome Back
//             </h1>
//             <p className="text-gray-600">Sign in to your account</p>
//           </div>

//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
//               <p className="text-red-700">{error}</p>
//             </div>
//           )}
//           {message && (
//             <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
//               <p className="text-green-700">{message}</p>
//             </div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email address
//               </label>
//               <div className="relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <EnvelopeIcon className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   placeholder="your@email.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <div className="relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <LockClosedIcon className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="current-password"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="text-gray-400 hover:text-gray-500 focus:outline-none"
//                   >
//                     {showPassword ? (
//                       <EyeSlashIcon className="h-5 w-5" />
//                     ) : (
//                       <EyeIcon className="h-5 w-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-sm text-gray-700"
//                 >
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <button
//                   type="button"
//                   onClick={handleForgotPassword}
//                   className="font-medium text-red-600 hover:text-red-500"
//                 >
//                   Forgot password?
//                 </button>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
//                   loading ? "opacity-70 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {loading ? (
//                   <>
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Signing in...
//                   </>
//                 ) : (
//                   "Sign in"
//                 )}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   Don't have an account?
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <a
//                 href="/register"
//                 className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 Create new account
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
 
// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase"; // adjust path if your firebase file is located elsewhere
import { useAuth } from "../../context/AuthContext"; // optional, used for handleLogout (guarded)
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { handleLogout } = useAuth() || {}; // guard in case context is not provided

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      // try to clear any previous session (if your context provides this)
      if (typeof handleLogout === "function") {
        await handleLogout();
      }

      await signInWithEmailAndPassword(auth, email.trim(), password);
      // optional: set a small success message then redirect (or immediate)
      navigate("/");
    } catch (err) {
      // Provide user-friendly messages
      let errorMessage = "Unable to sign in. Please try again.";

      // err.code values from Firebase
      switch (err.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          errorMessage = "Invalid email or password.";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Too many failed attempts. Try again later or reset your password.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        default:
          // keep generic
          errorMessage =
            err.message && typeof err.message === "string"
              ? err.message
              : errorMessage;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address to receive reset link.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage(`A password reset link was sent to ${email.trim()}.`);
    } catch (err) {
      let errorMessage = "Unable to send reset link. Please try again.";
       switch (err.code) {
         case "auth/user-not-found":
           errorMessage = "No account found with this email address.";
           break;
         case "auth/invalid-email":
           errorMessage = "Please enter a valid email address.";
           break;
         default:
           errorMessage = "Something went wrong. Please try again.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-indigo-100 p-6">
      <div className="w-full max-w-md">
        <div className="relative bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-1">Sign in to your account</p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-6 p-3 bg-red-50 border-l-4 border-red-400 text-red-700 rounded animate-shake"
            >
              {error}
            </div>
          )}

          {message && (
            <div
              role="status"
              className="mb-6 p-3 bg-green-50 border-l-4 border-green-400 text-green-700 rounded"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                />
                <span className="ml-2">Remember me</span>
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Forgot password?
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-medium shadow-sm transition transform ${
                  loading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 hover:scale-[1.01]"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <a
              href="/register"
              className="mt-4 block w-full text-center py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              Create a new account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
