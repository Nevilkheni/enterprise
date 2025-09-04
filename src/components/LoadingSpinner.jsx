// import React from 'react';

// const LoadingSpinner = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
//         <p className="mt-4 text-gray-600">Loading...</p>
//       </div>
//     </div>
//   );
// };

// export default LoadingSpinner;
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-6">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-red-300 border-r-transparent animate-spin-slow"></div>
        </div>

        {/* Loading text with shimmer */}
        <p className="text-gray-700 font-medium text-lg animate-pulse">
          Loading...
        </p>

        {/* Dots animation */}
        <div className="flex justify-center space-x-2">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:-0.6s]"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
