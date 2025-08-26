
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { httpsCallable } from "firebase/functions";
// import { auth, functions } from "../../firebase";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [verificationId, setVerificationId] = useState("");

//   const navigate = useNavigate();

//   // Step 1: Send OTP
//   const sendOtp = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (password !== confirm) {
//       setError("Passwords do not match.");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password should be at least 6 characters.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const sendOtpFunction = httpsCallable(functions, "sendOtp");
//       const result = await sendOtpFunction({ email });

//       setVerificationId(result.data.verificationId || email); // fallback as verificationId
//       setOtpSent(true);
//       setLoading(false);
//     } catch (err) {
//       let errorMessage = "Something went wrong. Please try again.";
//       if (err.code === "auth/email-already-in-use") {
//         errorMessage = "An account with this email already exists.";
//       } else if (err.code === "auth/invalid-email") {
//         errorMessage = "Please enter a valid email address.";
//       }
//       setError(errorMessage);
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP + Create user
//   const verifyOtpAndRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const verifyOtpFunction = httpsCallable(
//         functions,
//         "verifyOtpAndCreateUser"
//       );
//       await verifyOtpFunction({
//         email,
//         password,
//         otp,
//         verificationId,
//       });

//       setLoading(false);
//       navigate("/login"); // success -> go login
//     } catch (err) {
//       setError("Invalid or expired OTP. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10">
//           {/* Heading */}
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {otpSent ? "Verify OTP" : "Create Account"}
//             </h1>
//             <p className="text-gray-600">
//               {otpSent
//                 ? "Enter the OTP sent to your email"
//                 : "Get started with your new account"}
//             </p>
//           </div>

//           {/* Error Alert */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
//               <p className="text-red-700">{error}</p>
//             </div>
//           )}

//           {/* Step 1: Register Form */}
//           {!otpSent ? (
//             <form onSubmit={sendOtp} className="space-y-6">
//               {/* Email */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Email address
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   autoComplete="email"
//                   placeholder="your@email.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="new-password"
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     minLength="6"
//                     className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? "🙈" : "👁️"}
//                   </button>
//                 </div>
//                 <p className="mt-1 text-xs text-gray-500">
//                   Minimum 6 characters
//                 </p>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label
//                   htmlFor="confirm-password"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="confirm-password"
//                     type={showConfirm ? "text" : "password"}
//                     placeholder="••••••••"
//                     value={confirm}
//                     onChange={(e) => setConfirm(e.target.value)}
//                     required
//                     className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirm(!showConfirm)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                   >
//                     {showConfirm ? "🙈" : "👁️"}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
//                   loading ? "opacity-70 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {loading ? "Sending OTP..." : "Send OTP"}
//               </button>
//             </form>
//           ) : (
//             /* Step 2: OTP Form */
//             <form onSubmit={verifyOtpAndRegister} className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="otp"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Enter OTP
//                 </label>
//                 <input
//                   id="otp"
//                   type="text"
//                   placeholder="Enter 6-digit OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   required
//                   maxLength="6"
//                   className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                 />
//                 <p className="mt-1 text-xs text-gray-500">
//                   Check your email for the OTP code
//                 </p>
//               </div>

//               <div className="flex space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => setOtpSent(false)}
//                   className="w-1/3 py-3 px-4 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
//                 >
//                   Back
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-2/3 py-3 px-4 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
//                     loading ? "opacity-70 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {loading ? "Verifying..." : "Verify & Create Account"}
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* Footer */}
//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   Already have an account?
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <a
//                 href="/login"
//                 className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//               >
//                 Sign in
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { auth, functions } from "../../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");

  const navigate = useNavigate();

  // Step 1: Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const sendOtpFunction = httpsCallable(functions, "sendOtp");
      const result = await sendOtpFunction({ email });

      setVerificationId(result.data.verificationId || email); // fallback as verificationId
      setOtpSent(true);
      setLoading(false);
    } catch (err) {
      let errorMessage = "Something went wrong. Please try again.";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "An account with this email already exists.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  // Step 2: Verify OTP + Create user
  const verifyOtpAndRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const verifyOtpFunction = httpsCallable(
        functions,
        "verifyOtpAndCreateUser"
      );
      await verifyOtpFunction({
        email,
        password,
        otp,
        verificationId,
      });

      setLoading(false);
      navigate("/login"); // success -> go login
    } catch (err) {
      setError("Invalid or expired OTP. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {otpSent ? "Verify OTP" : "Create Account"}
            </h1>
            <p className="text-gray-600">
              {otpSent
                ? "Enter the OTP sent to your email"
                : "Get started with your new account"}
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Step 1: Register Form */}
          {!otpSent ? (
            <form onSubmit={sendOtp} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                    className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 6 characters
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            /* Step 2: OTP Form */
            <form onSubmit={verifyOtpAndRegister} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength="6"
                  className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Check your email for the OTP code
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-1/3 py-3 px-4 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-2/3 py-3 px-4 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Verifying..." : "Verify & Create Account"}
                </button>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="/login"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
