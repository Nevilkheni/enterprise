// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children, isAdmin = false }) => {
//   const { user, loading } = useAuth();

//   if (loading) return <div>Loading...</div>;

//   if (!user) return <Navigate to="/login" />;

//   if (isAdmin && user.role !== "admin") {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
