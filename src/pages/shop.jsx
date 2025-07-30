// import React, { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
// import ProductCard from "../components/ProductCard";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { FunnelIcon } from "@heroicons/react/24/solid";

// function Shop({ onAddToCart, cart }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("featured");
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "products"));
//         const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setProducts(data.filter((p) => p.category === "shop"));
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const filteredProducts = products
//     .filter((product) =>
//       product.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) => {
//       switch (sortOption) {
//         case "price-low":
//           return a.price - b.price;
//         case "price-high":
//           return b.price - a.price;
//         case "rating":
//           return (b.rating || 0) - (a.rating || 0);
//         default:
//           return 0; 
//       }
//     });

//   return (
//     <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop Decor Collection</h1>
//         <p className="text-lg text-gray-600">
//           Discover beautiful pieces to transform your living space
//         </p>
//       </div>

//       <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
//         <div className="relative w-full md:w-96">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search shop products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         <div className="flex gap-2 w-full md:w-auto">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
//           >
//             <FunnelIcon className="h-5 w-5" />
//             <span>Filters</span>
//           </button>
//         </div>
//       </div>

//       {showFilters && (
//         <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="w-full sm:w-48">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Sort By
//               </label>
//               <select
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//                 className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//               >
//                 <option value="featured">Featured</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="rating">Top Rated</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       )}

//       {loading && (
//         <div className="flex justify-center items-center py-20">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       )}

//       {!loading && filteredProducts.length === 0 && (
//         <div className="text-center py-20">
//           <svg
//             className="mx-auto h-12 w-12 text-gray-400"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
//           <p className="mt-1 text-gray-500">
//             {searchTerm
//               ? "Try adjusting your search or filter criteria"
//               : "No Shop products available at the moment"}
//           </p>
//         </div>
//       )}

//       {!loading && filteredProducts.length > 0 && (
//         <>
//           <div className="mb-4 flex justify-between items-center">
//             <p className="text-sm text-gray-500">
//               Showing {filteredProducts.length} of {products.length} items
//             </p>
//             <p className="text-sm font-medium">
//               Sorted by:{" "}
//               {sortOption === "featured"
//                 ? "Featured"
//                 : sortOption === "price-low"
//                 ? "Price: Low to High"
//                 : sortOption === "price-high"
//                 ? "Price: High to Low"
//                 : "Top Rated"}
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 onAddToCart={onAddToCart}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Shop;


import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/solid";

function Shop({ onAddToCart, cart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Initializing real-time listener for products...");
    
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        try {
          const data = snapshot.docs.map((doc) => ({ 
            id: doc.id, 
            ...doc.data() 
          }));
          
          console.log("Raw products data:", data);
          
          const shopProducts = data.filter((p) => {
            if (!p.category) {
              console.warn(`Product ${p.id} missing category field`, p);
              return false;
            }
            return p.category.toLowerCase() === "shop";
          });
          
          console.log("Filtered shop products:", shopProducts);
          setProducts(shopProducts);
          setError(null);
        } catch (err) {
          console.error("Error processing snapshot:", err);
          setError("Failed to process products data");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Firestore listener error:", {
          code: error.code,
          message: error.message,
          stack: error.stack
        });
        setError("Failed to load products. Please refresh the page.");
        setLoading(false);
      }
    );

    return () => {
      console.log("Cleaning up products listener");
      unsubscribe();
    };
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}.{" "}
                <button
                  onClick={() => window.location.reload()}
                  className="font-medium underline text-red-700 hover:text-red-600"
                >
                  Try again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop Decor Collection</h1>
        <p className="text-lg text-gray-600">
          Discover beautiful pieces to transform your living space
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search shop products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            <FunnelIcon className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-500">Loading products...</span>
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-gray-500">
            {searchTerm
              ? "Try adjusting your search or filter criteria"
              : "No Shop products available at the moment"}
          </p>
        </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {products.length} items
            </p>
            <p className="text-sm font-medium">
              Sorted by:{" "}
              {sortOption === "featured"
                ? "Featured"
                : sortOption === "price-low"
                ? "Price: Low to High"
                : sortOption === "price-high"
                ? "Price: High to Low"
                : "Top Rated"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Shop;