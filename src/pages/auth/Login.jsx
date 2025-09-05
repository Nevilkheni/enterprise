
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
