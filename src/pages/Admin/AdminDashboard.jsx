
// import React, { useState, useEffect } from "react";
// import { db, storage } from "../../firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";

// const AdminDashboard = () => {
//   // State for regular products
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category: "shop",
//     imageUrl: "",
//   });
//   const [homeProductForm, setHomeProductForm] = useState({
//     name: "",
//     material: "",
//     thickness: "",
//     length: "",
//     imageUrl: "",
//   });

//   // File states
//   const [imageFile, setImageFile] = useState(null);
//   const [homeProductImageFile, setHomeProductImageFile] = useState(null);

//   // Other states
//   const [products, setProducts] = useState([]);
//   const [cards, setCards] = useState([]);
//   const [modalCategory, setModalCategory] = useState(null);
//   const [editProduct, setEditProduct] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [activeForm, setActiveForm] = useState("product"); // 'product' or 'homeProduct'

//   // Fetch all products
//   const fetchProducts = async () => {
//     try {
//       setIsLoading(true);
//       const productsSnap = await getDocs(collection(db, "products"));
//       const showcaseSnap = await getDocs(collection(db, "showcaseCards"));

//       const productItems = productsSnap.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       const showcaseItems = showcaseSnap.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setProducts(productItems);
//       setCards(showcaseItems);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to fetch products");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Modal functions
//   const openModal = (card) => {
//     setSelectedCard(card);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedCard(null);
//   };

//   // Handle changes for all forms
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleHomeProductChange = (e) => {
//     setHomeProductForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Handle file changes
//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleHomeProductFileChange = (e) => {
//     setHomeProductImageFile(e.target.files[0]);
//   };

//   // Form submissions
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setUploading(true);
//       let imageUrl = "";

//       if (imageFile) {
//         const imageRef = ref(storage, `products/${uuidv4()}-${imageFile.name}`);
//         await uploadBytes(imageRef, imageFile);
//         imageUrl = await getDownloadURL(imageRef);
//       } else if (formData.imageUrl) {
//         imageUrl = formData.imageUrl;
//       } else {
//         alert("Please upload a file or paste a file URL.");
//         setUploading(false);
//         return;
//       }

//       const productData = {
//         name: formData.name,
//         description: formData.description,
//         category: formData.category,
//         image: imageUrl,
//         createdAt: new Date().toISOString(),
//       };

//       if (formData.category !== "product") {
//         productData.price = Number(formData.price);
//       }

//       await addDoc(collection(db, "products"), productData);

//       alert("Product added successfully!");
//       setFormData({
//         name: "",
//         price: "",
//         description: "",
//         category: "shop",
//         imageUrl: "",
//       });
//       setImageFile(null);
//       fetchProducts();
//     } catch (err) {
//       console.error("Add error:", err);
//       setError("Something went wrong! Check the console.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleHomeProductSubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);

//     try {
//       let imageUrl = homeProductForm.imageUrl;
//       if (!imageUrl && homeProductImageFile) {
//         const imageRef = ref(
//           storage,
//           `showcaseImages/${homeProductImageFile.name}-${Date.now()}`
//         );
//         await uploadBytes(imageRef, homeProductImageFile);
//         imageUrl = await getDownloadURL(imageRef);
//       }
      
//       await addDoc(collection(db, "showcaseCards"), {
//         title: homeProductForm.name,
//         shortDescription: homeProductForm.material,
//         longDescription: `Thickness: ${homeProductForm.thickness}, Length: ${homeProductForm.length}`,
//         image: imageUrl,
//         features: [
//           `Material: ${homeProductForm.material}`,
//           `Thickness: ${homeProductForm.thickness}`,
//           `Length: ${homeProductForm.length}`,
//         ],
//         createdAt: new Date().toISOString(),
//       });

//       setHomeProductForm({
//         name: "",
//         material: "",
//         thickness: "",
//         length: "",
//         imageUrl: "",
//       });
//       setHomeProductImageFile(null);
//       alert("✅ Home Product added to showcaseCards!");
//       fetchProducts();
//     } catch (error) {
//       console.error("❌ Error adding product:", error);
//       setError("Failed to add product.");
//     }

//     setUploading(false);
//   };

//   // Delete product/card
//   const handleDelete = async (id, collectionName = "products") => {
//     if (window.confirm("Are you sure you want to delete this item?")) {
//       try {
//         await deleteDoc(doc(db, collectionName, id));
//         fetchProducts();
//       } catch (err) {
//         console.error("Delete error:", err);
//         setError("Failed to delete item");
//       }
//     }
//   };

//   // Edit functionality
//   const handleEditChange = (e) => {
//     setEditProduct((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleEditImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEditProduct((prev) => ({
//         ...prev,
//         newImageFile: file,
//       }));
//     }
//   };

//   const handleEditSubmit = async () => {
//     try {
//       setUploading(true);
//       let imageUrl = editProduct.image;

//       if (editProduct.newImageFile) {
//         const imageRef = ref(
//           storage,
//           `products/${uuidv4()}-${editProduct.newImageFile.name}`
//         );
//         await uploadBytes(imageRef, editProduct.newImageFile);
//         imageUrl = await getDownloadURL(imageRef);
//       }

//       const updateData = {
//         name: editProduct.name,
//         description: editProduct.description,
//         image: imageUrl,
//         updatedAt: new Date().toISOString(),
//       };

//       if (editProduct.category !== "product") {
//         updateData.price = Number(editProduct.price);
//       }

//       await updateDoc(doc(db, "products", editProduct.id), updateData);

//       setEditProduct(null);
//       fetchProducts();
//       alert("Product updated successfully!");
//     } catch (err) {
//       console.error("Error updating product:", err);
//       setError("Update failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const filteredProducts = modalCategory === "showcase" 
//     ? cards 
//     : products.filter(p => modalCategory ? p.category === modalCategory : true);

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
//           <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//             Admin Dashboard
//           </h2>
//           <p className="mt-3 text-xl text-gray-500">
//             Manage your products and showcase cards
//           </p>
//         </div>

//         {/* Form Selection Buttons */}
//         <div className="flex justify-center mb-8 gap-4">
//           <button
//             onClick={() => setActiveForm("product")}
//             className={`px-6 py-3 rounded-lg shadow transition-colors ${
//               activeForm === "product" 
//                 ? "bg-blue-600 text-white" 
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Add Product
//           </button>
//           <button
//             onClick={() => setActiveForm("homeProduct")}
//             className={`px-6 py-3 rounded-lg shadow transition-colors ${
//               activeForm === "homeProduct" 
//                 ? "bg-blue-600 text-white" 
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Add Home Product
//           </button>
//         </div>

//         {/* Add Product Form */}
//         {activeForm === "product" && (
//           <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10">
//             <div className="p-6 sm:p-8">
//               <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">
//                 Add New Product
//               </h3>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Product Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Category
//                     </label>
//                     <select
//                       name="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       required
//                     >
//                       <option value="product">Product</option>
//                       <option value="shop">Shop</option>
//                     </select>
//                   </div>
//                 </div>

//                 {formData.category !== "product" && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Price
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleChange}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       required
//                     />
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     rows={3}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Image URL (optional)
//                   </label>
//                   <input
//                     type="text"
//                     name="imageUrl"
//                     value={formData.imageUrl}
//                     onChange={handleChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Product Image
//                   </label>
//                   <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                     <div className="space-y-1 text-center">
//                       <div className="flex text-sm text-gray-600">
//                         <label
//                           htmlFor="product-file-upload"
//                           className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
//                         >
//                           <span>Upload a file</span>
//                           <input
//                             id="product-file-upload"
//                             type="file"
//                             className="sr-only"
//                             onChange={handleFileChange}
//                           />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                       </div>
//                       <p className="text-xs text-gray-500">
//                         PNG, JPG, GIF up to 10MB
//                       </p>
//                       {imageFile && (
//                         <p className="text-sm text-green-600">
//                           {imageFile.name} selected
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     type="submit"
//                     disabled={uploading}
//                     className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
//                       uploading
//                         ? "bg-indigo-400"
//                         : "bg-indigo-600 hover:bg-indigo-700"
//                     } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
//                   >
//                     {uploading ? "Processing..." : "Add Product"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Add Home Product Form */}
//         {activeForm === "homeProduct" && (
//           <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10">
//             <div className="p-6 sm:p-8">
//               <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">
//                 Add Home Product
//               </h3>
//               <form onSubmit={handleHomeProductSubmit} className="space-y-4">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={homeProductForm.name}
//                   onChange={handleHomeProductChange}
//                   className="w-full border px-3 py-2 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="material"
//                   placeholder="Material"
//                   value={homeProductForm.material}
//                   onChange={handleHomeProductChange}
//                   className="w-full border px-3 py-2 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="thickness"
//                   placeholder="Thickness"
//                   value={homeProductForm.thickness}
//                   onChange={handleHomeProductChange}
//                   className="w-full border px-3 py-2 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="length"
//                   placeholder="Length"
//                   value={homeProductForm.length}
//                   onChange={handleHomeProductChange}
//                   className="w-full border px-3 py-2 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="imageUrl"
//                   placeholder="Image URL (optional)"
//                   value={homeProductForm.imageUrl || ""}
//                   onChange={handleHomeProductChange}
//                   className="w-full border px-3 py-2 rounded"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleHomeProductFileChange}
//                   className="w-full border px-3 py-2 rounded"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                   disabled={uploading}
//                 >
//                   {uploading ? "Uploading..." : "Add Home Product"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Manage Items Section */}
//         <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//           <div className="p-6 sm:p-8">
//             <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">
//               Manage Items
//             </h3>

//             <div className="flex flex-wrap justify-center gap-4 mb-8">
//               <button
//                 onClick={() => setModalCategory("product")}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//               >
//                 View Products
//               </button>
//               <button
//                 onClick={() => setModalCategory("shop")}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 View Shop Items
//               </button>
//               <button
//                 onClick={() => setModalCategory("showcase")}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//               >
//                 View Showcase Cards
//               </button>
//             </div>

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
//                       Add some{" "}
//                       {modalCategory === "showcase"
//                         ? "showcase cards"
//                         : "products"}{" "}
//                       to get started.
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
//                           <img
//                             src={item.image || "/default.jpg"}
//                             alt={item.name || item.title}
//                             className="w-32 h-32 object-cover rounded-lg border"
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="text-lg font-semibold text-gray-900">
//                             {item.name || item.title}
//                           </h4>
//                           <p className="text-sm text-gray-600">
//                             {item.description || item.shortDescription}
//                           </p>
//                           {item.price && (
//                             <p className="mt-2 text-sm text-gray-500">
//                               Price: ${item.price}
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
//                             onClick={() => handleDelete(
//                               item.id, 
//                               modalCategory === "showcase" ? "showcaseCards" : "products"
//                             )}
//                             className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                           >
//                             Delete
//                           </button>
//                           {modalCategory !== "showcase" && (
//                             <button
//                               onClick={() => {
//                                 setEditProduct({
//                                   ...item,
//                                   category: modalCategory
//                                 });
//                               }}
//                               className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                             >
//                               Edit
//                             </button>
//                           )}
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

//       {/* Edit Product Modal */}
//       {editProduct && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Edit Product</h2>
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={editProduct.name}
//                 onChange={handleEditChange}
//                 className="w-full border p-2 rounded"
//               />
//               {editProduct.category !== "product" && (
//                 <input
//                   type="number"
//                   name="price"
//                   placeholder="Price"
//                   value={editProduct.price}
//                   onChange={handleEditChange}
//                   className="w-full border p-2 rounded"
//                 />
//               )}
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={editProduct.description}
//                 onChange={handleEditChange}
//                 className="w-full border p-2 rounded"
//                 rows={3}
//               />
//               <div className="flex items-center gap-4">
//                 <img 
//                   src={editProduct.image} 
//                   alt="Current product" 
//                   className="w-20 h-20 object-cover rounded border"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleEditImageChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   onClick={() => setEditProduct(null)}
//                   className="bg-gray-500 text-white px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleEditSubmit}
//                   disabled={uploading}
//                   className={`bg-blue-600 text-white px-4 py-2 rounded ${
//                     uploading ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {uploading ? "Saving..." : "Save Changes"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Showcase Card Details Modal */}
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
import { db, storage } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const AdminDashboard = () => {
  // State for regular products
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "shop",
    imageUrl: "",
  });
  const [homeProductForm, setHomeProductForm] = useState({
    name: "",
    material: "",
    thickness: "",
    length: "",
    imageUrl: "",
  });

  // File states
  const [imageFile, setImageFile] = useState(null);
  const [homeProductImageFile, setHomeProductImageFile] = useState(null);

  // Other states
  const [products, setProducts] = useState([]);
  const [cards, setCards] = useState([]);
  const [modalCategory, setModalCategory] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [editCard, setEditCard] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeForm, setActiveForm] = useState("product"); // 'product' or 'homeProduct'

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const productsSnap = await getDocs(collection(db, "products"));
      const showcaseSnap = await getDocs(collection(db, "showcaseCards"));

      const productItems = productsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const showcaseItems = showcaseSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productItems);
      setCards(showcaseItems);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Modal functions
  const openModal = (card) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  };

  // Handle changes for all forms
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleHomeProductChange = (e) => {
    setHomeProductForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle file changes
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleHomeProductFileChange = (e) => {
    setHomeProductImageFile(e.target.files[0]);
  };

  // Form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      let imageUrl = "";

      if (imageFile) {
        const imageRef = ref(storage, `products/${uuidv4()}-${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      } else if (formData.imageUrl) {
        imageUrl = formData.imageUrl;
      } else {
        alert("Please upload a file or paste a file URL.");
        setUploading(false);
        return;
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };

      if (formData.category !== "product") {
        productData.price = Number(formData.price);
      }

      await addDoc(collection(db, "products"), productData);

      alert("Product added successfully!");
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "shop",
        imageUrl: "",
      });
      setImageFile(null);
      fetchProducts();
    } catch (err) {
      console.error("Add error:", err);
      setError("Something went wrong! Check the console.");
    } finally {
      setUploading(false);
    }
  };

  const handleHomeProductSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = homeProductForm.imageUrl;
      if (!imageUrl && homeProductImageFile) {
        const imageRef = ref(
          storage,
          `showcaseImages/${homeProductImageFile.name}-${Date.now()}`
        );
        await uploadBytes(imageRef, homeProductImageFile);
        imageUrl = await getDownloadURL(imageRef);
      }
      
      await addDoc(collection(db, "showcaseCards"), {
        title: homeProductForm.name,
        shortDescription: homeProductForm.material,
        longDescription: `Thickness: ${homeProductForm.thickness}, Length: ${homeProductForm.length}`,
        image: imageUrl,
        features: [
          `Material: ${homeProductForm.material}`,
          `Thickness: ${homeProductForm.thickness}`,
          `Length: ${homeProductForm.length}`,
        ],
        createdAt: new Date().toISOString(),
      });

      setHomeProductForm({
        name: "",
        material: "",
        thickness: "",
        length: "",
        imageUrl: "",
      });
      setHomeProductImageFile(null);
      alert("✅ Home Product added to showcaseCards!");
      fetchProducts();
    } catch (error) {
      console.error("❌ Error adding product:", error);
      setError("Failed to add product.");
    }

    setUploading(false);
  };

  // Delete product/card
  const handleDelete = async (id, collectionName = "products") => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, collectionName, id));
        fetchProducts();
      } catch (err) {
        console.error("Delete error:", err);
        setError("Failed to delete item");
      }
    }
  };

  // Edit functionality for products
  const handleEditChange = (e) => {
    setEditProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProduct((prev) => ({
        ...prev,
        newImageFile: file,
      }));
    }
  };

  const handleEditSubmit = async () => {
    try {
      setUploading(true);
      let imageUrl = editProduct.image;

      if (editProduct.newImageFile) {
        const imageRef = ref(
          storage,
          `products/${uuidv4()}-${editProduct.newImageFile.name}`
        );
        await uploadBytes(imageRef, editProduct.newImageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const updateData = {
        name: editProduct.name,
        description: editProduct.description,
        image: imageUrl,
        updatedAt: new Date().toISOString(),
      };

      if (editProduct.category !== "product") {
        updateData.price = Number(editProduct.price);
      }

      await updateDoc(doc(db, "products", editProduct.id), updateData);

      setEditProduct(null);
      fetchProducts();
      alert("Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Update failed");
    } finally {
      setUploading(false);
    }
  };

  // Edit functionality for showcase cards
  const handleEditCardChange = (e) => {
    setEditCard((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditCardImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditCard((prev) => ({
        ...prev,
        newImageFile: file,
      }));
    }
  };

  const handleEditCardSubmit = async () => {
    try {
      setUploading(true);
      let imageUrl = editCard.image;

      if (editCard.newImageFile) {
        const imageRef = ref(
          storage,
          `showcaseImages/${uuidv4()}-${editCard.newImageFile.name}`
        );
        await uploadBytes(imageRef, editCard.newImageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const updateData = {
        title: editCard.name,
        shortDescription: editCard.material,
        longDescription: `Thickness: ${editCard.thickness}, Length: ${editCard.length}`,
        image: imageUrl,
        features: [
          `Material: ${editCard.material}`,
          `Thickness: ${editCard.thickness}`,
          `Length: ${editCard.length}`,
        ],
        updatedAt: new Date().toISOString(),
      };

      await updateDoc(doc(db, "showcaseCards", editCard.id), updateData);

      setEditCard(null);
      fetchProducts();
      alert("Showcase card updated successfully!");
    } catch (err) {
      console.error("Error updating showcase card:", err);
      setError("Update failed");
    } finally {
      setUploading(false);
    }
  };

  const filteredProducts = modalCategory === "showcase" 
    ? cards 
    : products.filter(p => modalCategory ? p.category === modalCategory : true);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
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

        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Admin Dashboard
          </h2>
          <p className="mt-3 text-xl text-gray-500">
            Manage your products and showcase cards
          </p>
        </div>

        {/* Form Selection Buttons */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            onClick={() => setActiveForm("product")}
            className={`px-6 py-3 rounded-lg shadow transition-colors ${
              activeForm === "product" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Add Product
          </button>
          <button
            onClick={() => setActiveForm("homeProduct")}
            className={`px-6 py-3 rounded-lg shadow transition-colors ${
              activeForm === "homeProduct" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Add Home Product
          </button>
        </div>

        {/* Add Product Form */}
        {activeForm === "product" && (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10">
            <div className="p-6 sm:p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">
                Add New Product
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="product">Product</option>
                      <option value="shop">Shop</option>
                    </select>
                  </div>
                </div>

                {formData.category !== "product" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL (optional)
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="product-file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="product-file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      {imageFile && (
                        <p className="text-sm text-green-600">
                          {imageFile.name} selected
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={uploading}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                      uploading
                        ? "bg-indigo-400"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {uploading ? "Processing..." : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Home Product Form */}
        {activeForm === "homeProduct" && (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10">
            <div className="p-6 sm:p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">
                Add Home Product
              </h3>
              <form onSubmit={handleHomeProductSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={homeProductForm.name}
                  onChange={handleHomeProductChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="material"
                  placeholder="Material"
                  value={homeProductForm.material}
                  onChange={handleHomeProductChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="thickness"
                  placeholder="Thickness"
                  value={homeProductForm.thickness}
                  onChange={handleHomeProductChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="length"
                  placeholder="Length"
                  value={homeProductForm.length}
                  onChange={handleHomeProductChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Image URL (optional)"
                  value={homeProductForm.imageUrl || ""}
                  onChange={handleHomeProductChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHomeProductFileChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Add Home Product"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Manage Items Section */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">
              Manage Items
            </h3>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setModalCategory("product")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                View Products
              </button>
              <button
                onClick={() => setModalCategory("shop")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Shop Items
              </button>
              <button
                onClick={() => setModalCategory("showcase")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                View Showcase Cards
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : modalCategory ? (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {filteredProducts.length === 0 ? (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No items found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Add some{" "}
                      {modalCategory === "showcase"
                        ? "showcase cards"
                        : "products"}{" "}
                      to get started.
                    </p>
                  </div>
                ) : (
                  filteredProducts.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image || "/default.jpg"}
                            alt={item.name || item.title}
                            className="w-32 h-32 object-cover rounded-lg border"
                            onClick={() => modalCategory === "showcase" ? openModal(item) : null}
                            style={{ cursor: modalCategory === "showcase" ? 'pointer' : 'default' }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {item.name || item.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item.description || item.shortDescription}
                          </p>
                          {item.price && (
                            <p className="mt-2 text-sm text-gray-500">
                              Price: ${item.price}
                            </p>
                          )}
                          {item.createdAt && (
                            <p className="mt-2 text-xs text-gray-500">
                              Added:{" "}
                              {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <button
                            onClick={() => handleDelete(
                              item.id, 
                              modalCategory === "showcase" ? "showcaseCards" : "products"
                            )}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              if (modalCategory === "showcase") {
                                // Parse the card data back into the edit form format
                                const thicknessMatch = item.longDescription?.match(/Thickness: ([^,]+)/);
                                const lengthMatch = item.longDescription?.match(/Length: (.+)/);
                                
                                setEditCard({
                                  id: item.id,
                                  name: item.title,
                                  material: item.shortDescription,
                                  thickness: thicknessMatch ? thicknessMatch[1] : '',
                                  length: lengthMatch ? lengthMatch[1] : '',
                                  image: item.image,
                                });
                              } else {
                                setEditProduct({
                                  ...item,
                                  category: modalCategory
                                });
                              }
                            }}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-center text-gray-500">
                  Select a category above to view and manage items
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editProduct && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editProduct.name}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
              />
              {editProduct.category !== "product" && (
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={editProduct.price}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                />
              )}
              <textarea
                name="description"
                placeholder="Description"
                value={editProduct.description}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
                rows={3}
              />
              <div className="flex items-center gap-4">
                <img 
                  src={editProduct.image} 
                  alt="Current product" 
                  className="w-20 h-20 object-cover rounded border"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setEditProduct(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  disabled={uploading}
                  className={`bg-blue-600 text-white px-4 py-2 rounded ${
                    uploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {uploading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Showcase Card Modal */}
      {editCard && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Showcase Card</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editCard.name}
                onChange={handleEditCardChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="material"
                placeholder="Material"
                value={editCard.material}
                onChange={handleEditCardChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="thickness"
                placeholder="Thickness"
                value={editCard.thickness}
                onChange={handleEditCardChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="length"
                placeholder="Length"
                value={editCard.length}
                onChange={handleEditCardChange}
                className="w-full border p-2 rounded"
              />
              <div className="flex items-center gap-4">
                <img 
                  src={editCard.image} 
                  alt="Current card" 
                  className="w-20 h-20 object-cover rounded border"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditCardImageChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setEditCard(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditCardSubmit}
                  disabled={uploading}
                  className={`bg-blue-600 text-white px-4 py-2 rounded ${
                    uploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {uploading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Showcase Card Details Modal */}
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
            <ul className="list-disc list-inside text-sm text-gray-700">
              {selectedCard.features?.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;