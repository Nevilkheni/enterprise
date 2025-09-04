// import React, { useEffect, useState } from "react";

// function Reviewe() {
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(null);

//   const placeId = "YOUR_PLACE_ID"; // Google Maps Place ID
//   const apiKey = "YOUR_API_KEY";   // Google API Key

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const res = await fetch(
//           `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,reviews,user_ratings_total&key=${apiKey}`
//         );
//         const data = await res.json();

//         if (data.result) {
//           setReviews(data.result.reviews || []);
//           setRating({
//             avg: data.result.rating,
//             total: data.result.user_ratings_total,
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching reviews:", err);
//       }
//     };
//     fetchReviews();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-2xl font-bold mb-4">Ratings & Reviews</h1>

//       {rating && (
//         <div className="mb-6">
//           <div className="flex items-center gap-2">
//             <span className="text-4xl font-semibold">{rating.avg}</span>
//             <span className="text-yellow-500 text-2xl">★</span>
//             <span className="text-gray-600">/ 5</span>
//           </div>
//           <p className="text-gray-500">
//             Reviewed by {rating.total} Users
//           </p>
//         </div>
//       )}

//       <div className="space-y-4">
//         {reviews.map((rev, idx) => (
//           <div
//             key={idx}
//             className="bg-white shadow rounded-xl p-4 border border-gray-200"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="font-bold">{rev.author_name}</span>
//                   <span className="text-yellow-500">
//                     {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
//                   </span>
//                 </div>
//                 <p className="text-gray-500 text-sm">
//                   {new Date(rev.time * 1000).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//             <p className="mt-2 text-gray-700">{rev.text}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Reviewe;

import React, { useEffect, useState } from "react";

function Reviewe() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(null);

  const placeId = "YOUR_PLACE_ID"; // 🔑 Replace with Google Maps Place ID
  const apiKey = "YOUR_API_KEY";   // 🔑 Replace with your Google API Key

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,reviews,user_ratings_total&key=${apiKey}`
        );
        const data = await res.json();

        if (data.result) {
          setReviews(data.result.reviews || []);
          setRating({
            avg: data.result.rating,
            total: data.result.user_ratings_total,
          });
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Ratings & Reviews
      </h1>

      {/* Rating Summary */}
      {rating && (
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-semibold">{rating.avg}</span>
            <span className="text-yellow-500 text-2xl">★</span>
            <span className="text-gray-600">/ 5</span>
          </div>
          <p className="text-gray-500 mt-1">
            Reviewed by {rating.total} Users
          </p>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {reviews.length > 0 ? (
          reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">
                      {rev.author_name}
                    </span>
                    <span className="text-yellow-500 text-sm">
                      {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs">
                    {new Date(rev.time * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-gray-700">{rev.text}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default Reviewe;
