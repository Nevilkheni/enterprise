
// import React, { useState, useEffect } from "react";
// import { db } from "../../firebase";
// import {
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import AddProduct from "./AddProduct";
// import AddHomeProduct from "./AddHomeProduct";
// import AddCategory from "./AddCategory";

// const AdminDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [cards, setCards] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [originalProducts, setOriginalProducts] = useState([]);
//   const [originalCards, setOriginalCards] = useState([]);
//   const [originalAllProducts, setOriginalAllProducts] = useState([]);
//   const [originalCategories, setOriginalCategories] = useState([]);
//   const [modalCategory, setModalCategory] = useState(null);
//   const [editProduct, setEditProduct] = useState(null);
//   const [editCard, setEditCard] = useState(null);
//   const [editCategory, setEditCategory] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [activeForm, setActiveForm] = useState("product");
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchProducts = async () => {
//     try {
//       setIsLoading(true);
//       const productsSnap = await getDocs(collection(db, "products"));
//       const showcaseSnap = await getDocs(collection(db, "showcaseCards"));
//       const allProductsSnap = await getDocs(collection(db, "allProducts"));
//       const categoriesSnap = await getDocs(collection(db, "categories"));

//       const productItems = productsSnap.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       const showcaseItems = showcaseSnap.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       const allProductItems = allProductsSnap.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       const categoryItems = categoriesSnap.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setProducts(productItems);
//       setCards(showcaseItems);
//       setAllProducts(allProductItems);
//       setCategories(categoryItems);
//       setOriginalProducts(productItems);
//       setOriginalCards(showcaseItems);
//       setOriginalAllProducts(allProductItems);
//       setOriginalCategories(categoryItems);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to fetch products. Check Firebase permissions.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const openModal = (card) => {
//     setSelectedCard(card);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedCard(null);
//   };

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);

//     if (modalCategory === "showcase") {
//       if (term === "") {
//         setCards(originalCards);
//       } else {
//         const filtered = originalCards.filter(
//           (card) =>
//             card.title?.toLowerCase().includes(term) ||
//             card.shortDescription?.toLowerCase().includes(term) ||
//             card.longDescription?.toLowerCase().includes(term)
//         );
//         setCards(filtered);
//       }
//     } else if (modalCategory === "all") {
//       if (term === "") {
//         setAllProducts(originalAllProducts);
//       } else {
//         const filtered = originalAllProducts.filter(
//           (product) =>
//             product.name?.toLowerCase().includes(term) ||
//             product.description?.toLowerCase().includes(term)
//         );
//         setAllProducts(filtered);
//       }
//     } else if (modalCategory === "categories") {
//       if (term === "") {
//         setCategories(originalCategories);
//       } else {
//         const filtered = originalCategories.filter(
//           (category) =>
//             category.name?.toLowerCase().includes(term) ||
//             category.description?.toLowerCase().includes(term) ||
//             category.material?.toLowerCase().includes(term) ||
//             category.categoryType?.toLowerCase().includes(term)
//         );
//         setCategories(filtered);
//       }
//     } else if (modalCategory) {
//       if (term === "") {
//         setProducts(
//           originalProducts.filter((p) =>
//             modalCategory ? p.category === modalCategory : true
//           )
//         );
//       } else {
//         const filtered = originalProducts.filter(
//           (product) =>
//             (product.name?.toLowerCase().includes(term) ||
//               product.description?.toLowerCase().includes(term)) &&
//             (modalCategory ? product.category === modalCategory : true)
//         );
//         setProducts(filtered);
//       }
//     }
//   };

//   const handleDelete = async (id, collectionName = "products") => {
//     if (window.confirm("Are you sure you want to delete this item?")) {
//       try {
//         await deleteDoc(doc(db, collectionName, id));
        
//         if (collectionName !== "allProducts") {
//           const allProductsSnap = await getDocs(collection(db, "allProducts"));
//           const productToDelete = allProductsSnap.docs.find(doc => doc.data().name === id);
//           if (productToDelete) {
//             await deleteDoc(doc(db, "allProducts", productToDelete.id));
//           }
//         }
        
//         await fetchProducts();
//       } catch (err) {
//         console.error("Delete error:", err);
//         setError("Failed to delete item");
//       }
//     }
//   };

//   const filteredProducts =
//     modalCategory === "showcase"
//       ? cards
//       : modalCategory === "all"
//       ? allProducts
//       : modalCategory === "categories"
//       ? categories
//       : products.filter((p) =>
//           modalCategory ? p.category === modalCategory : true
//         );

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//             {error}
//             <button
//               onClick={() => setError("")}
//               className="absolute top-0 right-0 px-2 py-1"
//             >
//               ×
//             </button>
//           </div>
//         )}

//         <div className="text-center mb-10">
//           <h2 className="font-michroma  text-lg md:text-3xl text-gray-900 sm:text-4xl">
//             Admin Dashboard
//           </h2>
//           <p className="mt-3 text-xl text-gray-500">
//             Manage your products and showcase cards
//           </p>
//         </div>

//         <div className="flex justify-center mb-8 gap-4 flex-wrap">
//           <button
//             onClick={() => setActiveForm("product")}
//             className={`px-6 py-3 rounded-lg shadow transition-colors font-michroma text-sm ${
//               activeForm === "product"
//                 ? "bg-red-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Add Product
//           </button>
//           <button
//             onClick={() => setActiveForm("homeProduct")}
//             className={`px-6 py-3 rounded-lg shadow transition-colors font-michroma text-sm ${
//               activeForm === "homeProduct"
//                 ? "bg-red-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Add Home Product
//           </button>
//           <button
//             onClick={() => setActiveForm("category")}
//             className={`px-6 py-3 rounded-lg shadow transition-colors font-michroma text-sm ${
//               activeForm === "category"
//                 ? "bg-red-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Add Category
//           </button>
//         </div>

//         {activeForm === "product" && (
//           <AddProduct 
//             fetchProducts={fetchProducts} 
//             setError={setError}
//           />
//         )}

//         {activeForm === "homeProduct" && (
//           <AddHomeProduct 
//             fetchProducts={fetchProducts} 
//             setError={setError}
//           />
//         )}

//         {activeForm === "category" && (
//           <AddCategory 
//             fetchProducts={fetchProducts} 
//             setError={setError}
//           />
//         )}

//         <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//           <div className="p-6 sm:p-8">
//             <h3 className="font-michroma text-lg font-medium text-gray-900 mb-6 border-b pb-2">
//               Manage Items
//             </h3>

//             <div className="flex flex-wrap justify-center gap-4 mb-8">
//               <button
//                 onClick={() => setModalCategory("product")}
//                 className="font-michroma text-sm inline-flex items-center px-4 py-2 border border-transparent  font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//               >
//                 View Products
//               </button>
//               <button
//                 onClick={() => setModalCategory("shop")}
//                 className="font-michroma text-sm inline-flex items-center px-4 py-2 border border-transparent  font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 View Shop Items
//               </button>
//               <button
//                 onClick={() => setModalCategory("showcase")}
//                 className="font-michroma text-sm inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//               >
//                 View Showcase Cards
//               </button>
//               <button
//                 onClick={() => setModalCategory("categories")}
//                 className="font-michroma text-sm inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//               >
//                 View Categories
//               </button>
//               <button
//                 onClick={() => setModalCategory("all")}
//                 className=" font-michroma text-sm inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 View All Products
//               </button>
//             </div>

//             {modalCategory && (
//               <div className="mb-6 w-full max-w-md mx-auto">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder={`Search ${
//                       modalCategory === "showcase"
//                         ? "showcase cards"
//                         : modalCategory === "all"
//                         ? "all products"
//                         : modalCategory === "categories"
//                         ? "categories"
//                         : "products"
//                     }...`}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
//                     value={searchTerm}
//                     onChange={handleSearch}
//                   />
//                   <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             )}

//             {isLoading ? (
//               <div className="flex justify-center items-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//               </div>
//             ) : modalCategory ? (
//               <div className="space-y-4 max-h-[60vh] overflow-y-auto">
//                 {filteredProducts.length === 0 ? (
//                   <div className="bg-gray-50 p-8 rounded-lg text-center">
//                     <svg
//                       className="mx-auto h-12 w-12 text-gray-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     <h3 className="mt-2 text-sm font-medium text-gray-900">
//                       No items found
//                     </h3>
//                     <p className="mt-1 text-sm text-gray-500">
//                       {searchTerm
//                         ? "No matching items found"
//                         : `Add some ${
//                             modalCategory === "showcase"
//                               ? "showcase cards"
//                               : modalCategory === "all"
//                               ? "all products"
//                               : modalCategory === "categories"
//                               ? "categories"
//                               : "products"
//                           } to get started.`}
//                     </p>
//                   </div>
//                 ) : (
//                   filteredProducts.map((item) => (
//                     <div
//                       key={item.id}
//                       className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
//                     >
//                       <div className="flex flex-col md:flex-row gap-4">
//                         <div className="flex-shrink-0">
//                           {item.images && item.images.length > 1 ? (
//                             <div className="relative">
//                               <img
//                                 src={item.images[0] || "/default.jpg"}
//                                 alt={item.name || item.title}
//                                 className="w-32 h-32 object-cover rounded-lg border"
//                                 onClick={() =>
//                                   modalCategory === "showcase"
//                                     ? openModal(item)
//                                     : null
//                                 }
//                                 style={{
//                                   cursor:
//                                     modalCategory === "showcase"
//                                       ? "pointer"
//                                       : "default",
//                                 }}
//                               />
//                               <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
//                                 +{item.images.length - 1}
//                               </div>
//                             </div>
//                           ) : (
//                             <img
//                               src={item.image || item.images?.[0] || "/default.jpg"}
//                               alt={item.name || item.title}
//                               className="w-32 h-32 object-cover rounded-lg border"
//                               onClick={() =>
//                                 modalCategory === "showcase"
//                                   ? openModal(item)
//                                   : null
//                               }
//                               style={{
//                                 cursor:
//                                   modalCategory === "showcase"
//                                     ? "pointer"
//                                     : "default",
//                               }}
//                             />
//                           )}
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="text-lg font-semibold text-gray-900">
//                             {item.name || item.title}
//                           </h4>
//                           {item.position && (
//                             <p className="text-sm font-medium text-red-600">
//                               Position: {item.position}
//                             </p>
//                           )}
//                           {item.categoryType && (
//                             <p className="text-sm font-medium text-blue-600">
//                               Type: {item.categoryType}
//                             </p>
//                           )}
//                           <p className="text-sm text-gray-600">
//                             {item.description || item.shortDescription}
//                           </p>
//                           {item.price && (
//                             <p className="mt-2 text-sm text-gray-500">
//                               Price: {item.price}₹
//                             </p>
//                           )}
//                           {item.material && (
//                             <p className="mt-1 text-sm text-gray-500">
//                               Material: {item.material}
//                             </p>
//                           )}
//                           {item.thickness && (
//                             <p className="mt-1 text-sm text-gray-500">
//                               Thickness: {item.thickness}
//                             </p>
//                           )}
//                           {item.length && (
//                             <p className="mt-1 text-sm text-gray-500">
//                               Length: {item.length}
//                             </p>
//                           )}
//                           {item.images && item.images.length > 1 && (
//                             <p className="mt-1 text-xs text-gray-500">
//                               {item.images.length} images
//                             </p>
//                           )}
//                           {item.createdAt && (
//                             <p className="mt-2 text-xs text-gray-500">
//                               Added:{" "}
//                               {new Date(item.createdAt).toLocaleDateString()}
//                             </p>
//                           )}
//                         </div>
//                         <div className="flex flex-col sm:flex-row gap-2 justify-center">
//                           <button
//                             onClick={() =>
//                               handleDelete(
//                                 item.id,
//                                 modalCategory === "showcase"
//                                   ? "showcaseCards"
//                                   : modalCategory === "all"
//                                   ? "allProducts"
//                                   : modalCategory === "categories"
//                                   ? "categories"
//                                   : "products"
//                               )
//                             }
//                             className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                           >
//                             Delete
//                           </button>
//                           <button
//                             onClick={() => {
//                               if (modalCategory === "showcase") {
//                                 const thicknessMatch =
//                                   item.longDescription?.match(
//                                     /Thickness: ([^,]+)/
//                                   );
//                                 const lengthMatch =
//                                   item.longDescription?.match(/Length: (.+)/);

//                                 setEditCard({
//                                   id: item.id,
//                                   name: item.title,
//                                   material: item.shortDescription,
//                                   thickness: thicknessMatch
//                                     ? thicknessMatch[1]
//                                     : "",
//                                   length: lengthMatch ? lengthMatch[1] : "",
//                                   image: item.image,
//                                   position: item.position,
//                                 });
//                               } else if (modalCategory === "categories") {
//                                 setEditCategory({
//                                   id: item.id,
//                                   name: item.name,
//                                   material: item.material,
//                                   thickness: item.thickness,
//                                   length: item.length,
//                                   description: item.description,
//                                   categoryType: item.categoryType,
//                                   image: item.image,
//                                 });
//                               } else if (modalCategory === "all") {
//                               } else {
//                                 setEditProduct({
//                                   ...item,
//                                   category: modalCategory,
//                                 });
//                               }
//                             }}
//                             className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                           >
//                             Edit
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             ) : (
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-center text-gray-500">
//                   Select a category above to view and manage items
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {modalOpen && selectedCard && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-gray-500 text-xl"
//             >
//               ✕
//             </button>
//             <img
//               src={selectedCard.image}
//               alt={selectedCard.title}
//               className="w-full h-56 object-cover rounded mb-4"
//             />
//             <h2 className="text-xl font-bold mb-2">{selectedCard.title}</h2>
//             {selectedCard.position && (
//               <p className="text-sm font-medium text-red-600">
//                 Position: {selectedCard.position}
//               </p>
//             )}
//             <p className="text-sm text-gray-600 mb-2">
//               {selectedCard.shortDescription}
//             </p>
//             <p className="text-sm mb-4">{selectedCard.longDescription}</p>
//             <ul className="list-disc list-inside text-sm text-gray-700">
//               {selectedCard.features?.map((f, i) => (
//                 <li key={i}>{f}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import AddProduct from "./AddProduct";
import AddHomeProduct from "./AddHomeProduct";
import AddCategory from "./AddCategory";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [cards, setCards] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [originalProducts, setOriginalProducts] = useState([]);
  const [originalCards, setOriginalCards] = useState([]);
  const [originalAllProducts, setOriginalAllProducts] = useState([]);
  const [originalCategories, setOriginalCategories] = useState([]);

  const [modalCategory, setModalCategory] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [editCard, setEditCard] = useState(null);
  const [editCategory, setEditCategory] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeForm, setActiveForm] = useState("product");
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Fetch all collections
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const [productsSnap, showcaseSnap, allProductsSnap, categoriesSnap] =
        await Promise.all([
          getDocs(collection(db, "products")),
          getDocs(collection(db, "showcaseCards")),
          getDocs(collection(db, "allProducts")),
          getDocs(collection(db, "categories")),
        ]);

      const productItems = productsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const showcaseItems = showcaseSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const allProductItems = allProductsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const categoryItems = categoriesSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productItems);
      setCards(showcaseItems);
      setAllProducts(allProductItems);
      setCategories(categoryItems);

      setOriginalProducts(productItems);
      setOriginalCards(showcaseItems);
      setOriginalAllProducts(allProductItems);
      setOriginalCategories(categoryItems);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch products. Check Firebase permissions.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Open/close showcase modal
  const openModal = (card) => {
    setSelectedCard(card);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  };

  // 🔹 Search logic
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filterItems = (items, fields) =>
      term === ""
        ? items
        : items.filter((item) =>
            fields.some((f) => item[f]?.toLowerCase().includes(term))
          );

    if (modalCategory === "showcase") {
      setCards(filterItems(originalCards, ["title", "shortDescription", "longDescription"]));
    } else if (modalCategory === "all") {
      setAllProducts(filterItems(originalAllProducts, ["name", "description"]));
    } else if (modalCategory === "categories") {
      setCategories(
        filterItems(originalCategories, ["name", "description", "material", "categoryType"])
      );
    } else if (modalCategory) {
      setProducts(
        filterItems(originalProducts, ["name", "description"]).filter((p) =>
          modalCategory ? p.category === modalCategory : true
        )
      );
    }
  };

  // 🔹 Delete logic
  const handleDelete = async (id, collectionName = "products") => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, collectionName, id));

        // delete from allProducts if needed
        if (collectionName !== "allProducts") {
          const allProductsSnap = await getDocs(collection(db, "allProducts"));
          const productToDelete = allProductsSnap.docs.find(
            (doc) => doc.data().name === id
          );
          if (productToDelete) {
            await deleteDoc(doc(db, "allProducts", productToDelete.id));
          }
        }

        await fetchProducts();
      } catch (err) {
        console.error("Delete error:", err);
        setError("Failed to delete item");
      }
    }
  };

  // 🔹 Decide which list to show
  const filteredProducts =
    modalCategory === "showcase"
      ? cards
      : modalCategory === "all"
      ? allProducts
      : modalCategory === "categories"
      ? categories
      : products.filter((p) =>
          modalCategory ? p.category === modalCategory : true
        );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 🔹 Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
            <button
              onClick={() => setError("")}
              className="absolute top-0 right-0 px-2 py-1"
            >
              ×
            </button>
          </div>
        )}

        {/* 🔹 Heading */}
        <div className="text-center mb-10">
          <h2 className="font-michroma text-3xl text-gray-900">Admin Dashboard</h2>
          <p className="mt-3 text-xl text-gray-500">
            Manage your products and showcase cards
          </p>
        </div>

        {/* 🔹 Add Forms Switch */}
        <div className="flex justify-center mb-8 gap-4 flex-wrap">
          {[
            { key: "product", label: "Add Product" },
            { key: "homeProduct", label: "Add Home Product" },
            { key: "category", label: "Add Category" },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setActiveForm(btn.key)}
              className={`px-6 py-3 rounded-lg shadow transition-colors font-michroma text-sm ${
                activeForm === btn.key
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* 🔹 Render Selected Form */}
        {activeForm === "product" && (
          <AddProduct fetchProducts={fetchProducts} setError={setError} />
        )}
        {activeForm === "homeProduct" && (
          <AddHomeProduct fetchProducts={fetchProducts} setError={setError} />
        )}
        {activeForm === "category" && (
          <AddCategory fetchProducts={fetchProducts} setError={setError} />
        )}

        {/* 🔹 Manage Items Section */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mt-8">
          <div className="p-6 sm:p-8">
            <h3 className="font-michroma text-lg font-medium text-gray-900 mb-6 border-b pb-2">
              Manage Items
            </h3>

            {/* 🔹 Category Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { key: "product", label: "View Products", color: "green" },
                { key: "shop", label: "View Shop Items", color: "red" },
                { key: "showcase", label: "View Showcase Cards", color: "orange" },
                { key: "categories", label: "View Categories", color: "purple" },
                { key: "all", label: "View All Products", color: "blue" },
              ].map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setModalCategory(btn.key)}
                  className={`font-michroma text-sm inline-flex items-center px-4 py-2 rounded-md shadow-sm text-white bg-${btn.color}-600 hover:bg-${btn.color}-700`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* 🔹 Search */}
            {modalCategory && (
              <div className="mb-6 w-full max-w-md mx-auto">
                <input
                  type="text"
                  placeholder={`Search ${modalCategory}...`}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-red-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            )}

            {/* 🔹 Loader / Items */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : modalCategory ? (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {filteredProducts.length === 0 ? (
                  <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-500">
                    No items found
                  </div>
                ) : (
                  filteredProducts.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* 🔹 Image */}
                        <img
                          src={item.image || item.images?.[0] || "/default.jpg"}
                          alt={item.name || item.title}
                          className="w-32 h-32 object-cover rounded-lg border"
                          onClick={() =>
                            modalCategory === "showcase" ? openModal(item) : null
                          }
                          style={{
                            cursor: modalCategory === "showcase" ? "pointer" : "default",
                          }}
                        />

                        {/* 🔹 Info */}
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold">
                            {item.name || item.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item.description || item.shortDescription}
                          </p>
                          {item.price && (
                            <p className="mt-2 text-sm">Price: {item.price}₹</p>
                          )}
                        </div>

                        {/* 🔹 Actions */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() =>
                              handleDelete(
                                item.id,
                                modalCategory === "showcase"
                                  ? "showcaseCards"
                                  : modalCategory === "all"
                                  ? "allProducts"
                                  : modalCategory === "categories"
                                  ? "categories"
                                  : "products"
                              )
                            }
                            className="px-3 py-2 text-sm rounded-md bg-red-600 text-white"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() =>
                              modalCategory === "categories"
                                ? setEditCategory(item)
                                : modalCategory === "showcase"
                                ? setEditCard(item)
                                : setEditProduct(item)
                            }
                            className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                Select a category above to view and manage items
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Showcase Modal */}
      {modalOpen && selectedCard && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 text-xl"
            >
              ✕
            </button>
            <img
              src={selectedCard.image}
              alt={selectedCard.title}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedCard.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {selectedCard.shortDescription}
            </p>
            <p className="text-sm mb-4">{selectedCard.longDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
