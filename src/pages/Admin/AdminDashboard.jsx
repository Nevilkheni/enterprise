// import React, { useState, useEffect } from "react";
// import { db, storage } from "../../firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
//   query,
//   where,
// } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";

// const AdminDashboard = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category: "shop",
//     imageUrls: [""],
//   });
//   const [homeProductForm, setHomeProductForm] = useState({
//     name: "",
//     material: "",
//     thickness: "",
//     length: "",
//     imageUrl: "",
//     position: "1",
//   });
//   const [categoryForm, setCategoryForm] = useState({
//     name: "",
//     material: "",
//     thickness: "",
//     length: "",
//     imageUrl: "",
//     description: "",
//     categoryType: "roll", 
//   });

//   const [imageFiles, setImageFiles] = useState([]);
//   const [homeProductImageFile, setHomeProductImageFile] = useState(null);
//   const [categoryImageFile, setCategoryImageFile] = useState(null);

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
//   const [uploading, setUploading] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [activeForm, setActiveForm] = useState("product");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [duplicateWarning, setDuplicateWarning] = useState("");

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

//   // Check if product with same name already exists in the same category
//   const checkDuplicateProduct = async (name, category, collectionName = "products") => {
//     try {
//       const q = query(
//         collection(db, collectionName),
//         where("name", "==", name),
//         where("category", "==", category)
//       );
//       const querySnapshot = await getDocs(q);
//       return !querySnapshot.empty;
//     } catch (error) {
//       console.error("Error checking duplicate:", error);
//       return false;
//     }
//   };

//   // Check if showcase card with same name already exists
//   const checkDuplicateShowcase = async (name) => {
//     try {
//       const q = query(
//         collection(db, "showcaseCards"),
//         where("title", "==", name)
//       );
//       const querySnapshot = await getDocs(q);
//       return !querySnapshot.empty;
//     } catch (error) {
//       console.error("Error checking duplicate:", error);
//       return false;
//     }
//   };

//   // Check if category with same name already exists
//   const checkDuplicateCategory = async (name) => {
//     try {
//       const q = query(
//         collection(db, "categories"),
//         where("name", "==", name)
//       );
//       const querySnapshot = await getDocs(q);
//       return !querySnapshot.empty;
//     } catch (error) {
//       console.error("Error checking duplicate:", error);
//       return false;
//     }
//   };

//   const openModal = (card) => {
//     setSelectedCard(card);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedCard(null);
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//     setDuplicateWarning("");
//   };

//   const handleImageUrlChange = (index, value) => {
//     const newImageUrls = [...formData.imageUrls];
//     newImageUrls[index] = value;
//     setFormData((prev) => ({
//       ...prev,
//       imageUrls: newImageUrls,
//     }));
//   };

//   const addImageUrlField = () => {
//     setFormData((prev) => ({
//       ...prev,
//       imageUrls: [...prev.imageUrls, ""],
//     }));
//   };

//   const removeImageUrlField = (index) => {
//     if (formData.imageUrls.length <= 1) return;
    
//     const newImageUrls = [...formData.imageUrls];
//     newImageUrls.splice(index, 1);
//     setFormData((prev) => ({
//       ...prev,
//       imageUrls: newImageUrls,
//     }));
    
//     if (imageFiles[index]) {
//       const newImageFiles = [...imageFiles];
//       newImageFiles.splice(index, 1);
//       setImageFiles(newImageFiles);
//     }
//   };

//   const handleHomeProductChange = (e) => {
//     setHomeProductForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//     setDuplicateWarning("");
//   };

//   const handleCategoryChange = (e) => {
//     setCategoryForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//     setDuplicateWarning("");
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImageFiles((prev) => [...prev, ...files]);
//   };

//   const removeFile = (index) => {
//     const newFiles = [...imageFiles];
//     newFiles.splice(index, 1);
//     setImageFiles(newFiles);
//   };

//   const handleHomeProductFileChange = (e) => {
//     setHomeProductImageFile(e.target.files[0]);
//   };

//   const handleCategoryFileChange = (e) => {
//     setCategoryImageFile(e.target.files[0]);
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

//   const addToAllProducts = async (productData) => {
//     try {
//       const isDuplicate = await checkDuplicateProduct(productData.name, "all", "allProducts");
//       if (isDuplicate) {
//         console.log("Product already exists in allProducts, skipping");
//         return;
//       }
      
//       await addDoc(collection(db, "allProducts"), {
//         name: productData.name,
//         description: productData.description,
//         image: productData.images && productData.images.length > 0 ? productData.images[0] : "",
//         images: productData.images || [],
//         category: "all",
//         createdAt: new Date().toISOString(),
//       });
//     } catch (err) {
//       console.error("Error adding to all products:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setUploading(true);
      
//       // Check for duplicate product in the same category
//       const isDuplicate = await checkDuplicateProduct(formData.name, formData.category);
//       if (isDuplicate) {
//         setDuplicateWarning(`A product with the name "${formData.name}" already exists in the ${formData.category} category!`);
//         setUploading(false);
//         return;
//       }
      
//       let imageUrls = [];

//       if (imageFiles.length > 0) {
//         for (const file of imageFiles) {
//           const imageRef = ref(storage, `products/${uuidv4()}-${file.name}`);
//           const snapshot = await uploadBytes(imageRef, file);
//           const url = await getDownloadURL(snapshot.ref);
//           imageUrls.push(url);
//         }
//       }
      
//       if (formData.imageUrls && formData.imageUrls.length > 0) {
//         const validUrls = formData.imageUrls.filter(url => url.trim() !== "");
//         imageUrls = [...imageUrls, ...validUrls];
//       }
      
//       if (imageUrls.length === 0) {
//         alert("Please upload at least one image or paste at least one image URL.");
//         setUploading(false);
//         return;
//       }

//       const productData = {
//         name: formData.name,
//         description: formData.description,
//         category: formData.category,
//         images: imageUrls,
//         createdAt: new Date().toISOString(),
//       };

//       if (formData.category !== "product") {
//         productData.price = Number(formData.price);
//       }

//       await addDoc(collection(db, "products"), productData);
//       await addToAllProducts(productData);

//       alert("Product added successfully!");
//       setFormData({
//         name: "",
//         price: "",
//         description: "",
//         category: "shop",
//         imageUrls: [""],
//       });
//       setImageFiles([]);
//       setDuplicateWarning("");
//       await fetchProducts();
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
//       const isDuplicate = await checkDuplicateShowcase(homeProductForm.name);
//       if (isDuplicate) {
//         setDuplicateWarning(`A home product with the name "${homeProductForm.name}" already exists!`);
//         setUploading(false);
//         return;
//       }
      
//       const position = parseInt(homeProductForm.position);
//       if (isNaN(position) || position < 1 || position > 4) {
//         alert("Position must be between 1 and 4");
//         setUploading(false);
//         return;
//       }

//       const existingCards = await getDocs(collection(db, "showcaseCards"));
//       const existingInPosition = existingCards.docs.find(
//         (doc) => doc.data().position === homeProductForm.position
//       );

//       if (existingInPosition) {
//         if (
//           !window.confirm(
//             `Position ${homeProductForm.position} already has a product. Replace it?`
//           )
//         ) {
//           setUploading(false);
//           return;
//         }
//         await deleteDoc(doc(db, "showcaseCards", existingInPosition.id));
//         alert(
//           `Removed existing product from position ${homeProductForm.position}`
//         );
//       }

//       let imageUrl = homeProductForm.imageUrl;
//       if (!imageUrl && homeProductImageFile) {
//         const imageRef = ref(
//           storage,
//           `showcaseImages/${homeProductImageFile.name}-${Date.now()}`
//         );
//         const snapshot = await uploadBytes(imageRef, homeProductImageFile);
//         imageUrl = await getDownloadURL(snapshot.ref);
//       } else if (!imageUrl) {
//         alert("Please upload a file or paste a file URL.");
//         setUploading(false);
//         return;
//       }

//       const productData = {
//         title: homeProductForm.name,
//         shortDescription: homeProductForm.material,
//         longDescription: `Thickness: ${homeProductForm.thickness}, Length: ${homeProductForm.length}`,
//         image: imageUrl,
//         position: homeProductForm.position,
//         features: [
//           `Material: ${homeProductForm.material}`,
//           `Thickness: ${homeProductForm.thickness}`,
//           `Length: ${homeProductForm.length}`,
//         ],
//         createdAt: new Date().toISOString(),
//       };

//       await addDoc(collection(db, "showcaseCards"), productData);
      
//       await addToAllProducts({
//         name: homeProductForm.name,
//         description: `Material: ${homeProductForm.material}, Thickness: ${homeProductForm.thickness}, Length: ${homeProductForm.length}`,
//         image: imageUrl
//       });

//       setHomeProductForm({
//         name: "",
//         material: "",
//         thickness: "",
//         length: "",
//         imageUrl: "",
//         position: "1",
//       });
//       setHomeProductImageFile(null);
//       setDuplicateWarning("");
//       await fetchProducts();
//       alert("✅ Home Product added successfully!");
//     } catch (error) {
//       console.error("❌ Error adding product:", error);
//       setError("Failed to add product.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleCategorySubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);

//     try {
//       const isDuplicate = await checkDuplicateCategory(categoryForm.name);
//       if (isDuplicate) {
//         setDuplicateWarning(`A category with the name "${categoryForm.name}" already exists!`);
//         setUploading(false);
//         return;
//       }
      
//       let imageUrl = categoryForm.imageUrl;
//       if (!imageUrl && categoryImageFile) {
//         const imageRef = ref(
//           storage,
//           `categories/${categoryImageFile.name}-${Date.now()}`
//         );
//         const snapshot = await uploadBytes(imageRef, categoryImageFile);
//         imageUrl = await getDownloadURL(snapshot.ref);
//       } else if (!imageUrl) {
//         alert("Please upload a file or paste a file URL.");
//         setUploading(false);
//         return;
//       }

//       const categoryData = {
//         name: categoryForm.name,
//         material: categoryForm.material,
//         thickness: categoryForm.thickness,
//         length: categoryForm.length,
//         description: categoryForm.description,
//         categoryType: categoryForm.categoryType,
//         image: imageUrl,
//         createdAt: new Date().toISOString(),
//       };

//       await addDoc(collection(db, "categories"), categoryData);
      
//       await addToAllProducts({
//         name: categoryForm.name,
//         description: `${categoryForm.description} | Material: ${categoryForm.material} | Thickness: ${categoryForm.thickness} | Length: ${categoryForm.length}`,
//         image: imageUrl,
//         category: categoryForm.categoryType
//       });

//       setCategoryForm({
//         name: "",
//         material: "",
//         thickness: "",
//         length: "",
//         imageUrl: "",
//         description: "",
//         categoryType: "roll",
//       });
//       setCategoryImageFile(null);
//       setDuplicateWarning("");
//       await fetchProducts();
//       alert("✅ Category added successfully!");
//     } catch (error) {
//       console.error("❌ Error adding category:", error);
//       setError("Failed to add category.");
//     } finally {
//       setUploading(false);
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
//         const snapshot = await uploadBytes(imageRef, editProduct.newImageFile);
//         imageUrl = await getDownloadURL(snapshot.ref);
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
      
//       const allProductsSnap = await getDocs(collection(db, "allProducts"));
//       const productToUpdate = allProductsSnap.docs.find(doc => 
//         doc.data().name === editProduct.name
//       );
      
//       if (productToUpdate) {
//         await updateDoc(doc(db, "allProducts", productToUpdate.id), {
//           name: updateData.name,
//           description: updateData.description,
//           image: updateData.image,
//           updatedAt: updateData.updatedAt
//         });
//       }

//       setEditProduct(null);
//       await fetchProducts();
//       alert("Product updated successfully!");
//     } catch (err) {
//       console.error("Error updating product:", err);
//       setError("Update failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleEditCardChange = (e) => {
//     setEditCard((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleEditCardImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEditCard((prev) => ({
//         ...prev,
//         newImageFile: file,
//       }));
//     }
//   };

//   const handleEditCardSubmit = async () => {
//     try {
//       setUploading(true);

//       if (editCard.newPosition && editCard.newPosition !== editCard.position) {
//         const existingCards = await getDocs(collection(db, "showcaseCards"));
//         const existingInPosition = existingCards.docs.find(
//           (doc) => doc.data().position === editCard.newPosition
//         );

//         if (existingInPosition) {
//           await deleteDoc(doc(db, "showcaseCards", existingInPosition.id));
//         }
//       }

//       let imageUrl = editCard.image;

//       if (editCard.newImageFile) {
//         const imageRef = ref(
//           storage,
//           `showcaseImages/${uuidv4()}-${editCard.newImageFile.name}`
//         );
//         const snapshot = await uploadBytes(imageRef, editCard.newImageFile);
//         imageUrl = await getDownloadURL(snapshot.ref);
//       }

//       const updateData = {
//         title: editCard.name,
//         shortDescription: editCard.material,
//         longDescription: `Thickness: ${editCard.thickness}, Length: ${editCard.length}`,
//         image: imageUrl,
//         position: editCard.newPosition || editCard.position,
//         features: [
//           `Material: ${editCard.material}`,
//           `Thickness: ${editCard.thickness}`,
//           `Length: ${editCard.length}`,
//         ],
//         updatedAt: new Date().toISOString(),
//       };

//       await updateDoc(doc(db, "showcaseCards", editCard.id), updateData);
      
//       const allProductsSnap = await getDocs(collection(db, "allProducts"));
//       const productToUpdate = allProductsSnap.docs.find(doc => 
//         doc.data().name === editCard.name
//       );
      
//       if (productToUpdate) {
//         await updateDoc(doc(db, "allProducts", productToUpdate.id), {
//           name: editCard.name,
//           description: `Material: ${editCard.material}, Thickness: ${editCard.thickness}, Length: ${editCard.length}`,
//           image: imageUrl,
//           updatedAt: updateData.updatedAt
//         });
//       }

//       setEditCard(null);
//       await fetchProducts();
//       alert("Showcase card updated successfully!");
//     } catch (err) {
//       console.error("Error updating showcase card:", err);
//       setError("Update failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleEditCategoryChange = (e) => {
//     setEditCategory((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleEditCategoryImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEditCategory((prev) => ({
//         ...prev,
//         newImageFile: file,
//       }));
//     }
//   };

//   const handleEditCategorySubmit = async () => {
//     try {
//       setUploading(true);
//       let imageUrl = editCategory.image;

//       if (editCategory.newImageFile) {
//         const imageRef = ref(
//           storage,
//           `categories/${uuidv4()}-${editCategory.newImageFile.name}`
//         );
//         const snapshot = await uploadBytes(imageRef, editCategory.newImageFile);
//         imageUrl = await getDownloadURL(snapshot.ref);
//       }

//       const updateData = {
//         name: editCategory.name,
//         material: editCategory.material,
//         thickness: editCategory.thickness,
//         length: editCategory.length,
//         description: editCategory.description,
//         categoryType: editCategory.categoryType,
//         image: imageUrl,
//         updatedAt: new Date().toISOString(),
//       };

//       await updateDoc(doc(db, "categories", editCategory.id), updateData);
      
//       const allProductsSnap = await getDocs(collection(db, "allProducts"));
//       const productToUpdate = allProductsSnap.docs.find(doc => 
//         doc.data().name === editCategory.name
//       );
      
//       if (productToUpdate) {
//         await updateDoc(doc(db, "allProducts", productToUpdate.id), {
//           name: editCategory.name,
//           description: `${editCategory.description} | Material: ${editCategory.material} | Thickness: ${editCategory.thickness} | Length: ${editCategory.length}`,
//           image: imageUrl,
//           category: editCategory.categoryType,
//           updatedAt: updateData.updatedAt
//         });
//       }

//       setEditCategory(null);
//       await fetchProducts();
//       alert("Category updated successfully!");
//     } catch (err) {
//       console.error("Error updating category:", err);
//       setError("Update failed");
//     } finally {
//       setUploading(false);
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

//         {duplicateWarning && (
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
//             {duplicateWarning}
//             <button
//               onClick={() => setDuplicateWarning("")}
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
//                     Image URLs (one per line)
//                   </label>
//                   <div className="space-y-2">
//                     {formData.imageUrls.map((url, index) => (
//                       <div key={index} className="flex items-center gap-2">
//                         <input
//                           type="text"
//                           value={url}
//                           onChange={(e) => handleImageUrlChange(index, e.target.value)}
//                           className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                           placeholder="Paste image URL here"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImageUrlField(index)}
//                           className="text-red-500 hover:text-red-700 p-2"
//                           disabled={formData.imageUrls.length <= 1}
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={addImageUrlField}
//                       className="text-sm text-indigo-600 hover:text-indigo-500"
//                     >
//                       + Add another URL
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Upload Product Images
//                   </label>
//                   <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                     <div className="space-y-1 text-center">
//                       <div className="flex text-sm text-gray-600">
//                         <label
//                           htmlFor="product-file-upload"
//                           className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
//                         >
//                           <span>Upload files</span>
//                           <input
//                             id="product-file-upload"
//                             type="file"
//                             className="sr-only"
//                             onChange={handleFileChange}
//                             multiple
//                           />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                       </div>
//                       <p className="text-xs text-gray-500">
//                         PNG, JPG, GIF up to 10MB each
//                       </p>
//                       {imageFiles.length > 0 && (
//                         <div className="mt-2">
//                           <p className="text-sm font-medium text-gray-700">Selected files:</p>
//                           <ul className="text-sm text-green-600">
//                             {imageFiles.map((file, index) => (
//                               <li key={index} className="flex items-center justify-between">
//                                 <span>{file.name}</span>
//                                 <button
//                                   type="button"
//                                   onClick={() => removeFile(index)}
//                                   className="text-red-500 hover:text-red-700 ml-2"
//                                 >
//                                   ×
//                                 </button>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
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

//         {activeForm === "homeProduct" && (
//           <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10">
//             <div className="p-6 sm:p-8">
//               <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">
//                 Add Home Product (Positions 1-4)
//               </h3>
//               <form onSubmit={handleHomeProductSubmit} className="space-y-4">
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Position (1-4)
//                     </label>
//                     <select
//                       name="position"
//                       value={homeProductForm.position}
//                       onChange={handleHomeProductChange}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       required
//                     >
//                       <option value="1">Position 1</option>
//                       <option value="2">Position 2</option>
//                       <option value="3">Position 3</option>
//                       <option value="4">Position 4</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="Name"
//                       value={homeProductForm.name}
//                       onChange={handleHomeProductChange}
//                       className="w-full border px-3 py-2 rounded"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Material
//                     </label>
//                     <input
//                       type="text"
//                       name="material"
//                       placeholder="Material"
//                       value={homeProductForm.material}
//                       onChange={handleHomeProductChange}
//                       className="w-full border px-3 py-2 rounded"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Thickness
//                     </label>
//                     <input
//                       type="text"
//                       name="thickness"
//                       placeholder="Thickness"
//                       value={homeProductForm.thickness}
//                       onChange={handleHomeProductChange}
//                       className="w-full border px-3 py-2 rounded"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Length
//                     </label>
//                     <input
//                       type="text"
//                       name="length"
//                       placeholder="Length"
//                       value={homeProductForm.length}
//                       onChange={handleHomeProductChange}
//                       className="w-full border px-3 py-2 rounded"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Image URL (optional)
//                   </label>
//                   <input
//                     type="text"
//                     name="imageUrl"
//                     placeholder="Image URL (optional)"
//                     value={homeProductForm.imageUrl || ""}
//                     onChange={handleHomeProductChange}
//                     className="w-full border px-3 py-2 rounded"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Upload Image
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleHomeProductFileChange}
//                     className="w-full border px-3 py-2 rounded"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="bg-red-600 text-white px-4 py-2 rounded w-full"
//                   disabled={uploading}
//                 >
//                   {uploading ? "Uploading..." : "Add Home Product"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         {activeForm === "category" && (
//           <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10">
//             <div className="p-6 sm:p-8">
//               <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">
//                 Add New Category
//               </h3>
//               <form onSubmit={handleCategorySubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Category Type
//                   </label>
//                   <select
//                     name="categoryType"
//                     value={categoryForm.categoryType}
//                     onChange={handleCategoryChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     required
//                   >
//                     <option value="roll">Roll</option>
//                     <option value="cd">CD</option>
//                     <option value="spool">Spool</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     value={categoryForm.name}
//                     onChange={handleCategoryChange}
//                     className="w-full border px-3 py-2 rounded"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Material
//                   </label>
//                   <input
//                     type="text"
//                     name="material"
//                     placeholder="Material"
//                     value={categoryForm.material}
//                     onChange={handleCategoryChange}
//                     className="w-full border px-3 py-2 rounded"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Thickness
//                     </label>
//                     <input
//                       type="text"
//                       name="thickness"
//                       placeholder="Thickness"
//                       value={categoryForm.thickness}
//                       onChange={handleCategoryChange}
//                       className="w-full border px-3 py-2 rounded"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Length
//                     </label>
//                     <input
//                       type="text"
//                       name="length"
//                       placeholder="Length"
//                       value={categoryForm.length}
//                       onChange={handleCategoryChange}
//                       className="w-full border px-3 py-2 rounded"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     placeholder="Description"
//                     value={categoryForm.description}
//                     onChange={handleCategoryChange}
//                     className="w-full border px-3 py-2 rounded"
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
//                     placeholder="Image URL (optional)"
//                     value={categoryForm.imageUrl || ""}
//                     onChange={handleCategoryChange}
//                     className="w-full border px-3 py-2 rounded"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Upload Image
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleCategoryFileChange}
//                     className="w-full border px-3 py-2 rounded"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="bg-red-600 text-white px-4 py-2 rounded w-full"
//                   disabled={uploading}
//                 >
//                   {uploading ? "Uploading..." : "Add Category"}
//                 </button>
//               </form>
//             </div>
//           </div>
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
//                 {editProduct.images && editProduct.images.length > 0 ? (
//                   <div className="flex flex-wrap gap-2">
//                     {editProduct.images.map((img, index) => (
//                       <img
//                         key={index}
//                         src={img}
//                         alt={`Product ${index + 1}`}
//                         className="w-16 h-16 object-cover rounded border"
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <img
//                     src={editProduct.image}
//                     alt="Current product"
//                     className="w-20 h-20 object-cover rounded border"
//                   />
//                 )}
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

//       {editCard && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Edit Showcase Card</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Position (1-4)
//                 </label>
//                 <select
//                   name="newPosition"
//                   value={editCard.newPosition || editCard.position}
//                   onChange={handleEditCardChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   required
//                 >
//                   <option value="1">Position 1</option>
//                   <option value="2">Position 2</option>
//                   <option value="3">Position 3</option>
//                   <option value="4">Position 4</option>
//                 </select>
//               </div>

//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={editCard.name}
//                 onChange={handleEditCardChange}
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="material"
//                 placeholder="Material"
//                 value={editCard.material}
//                 onChange={handleEditCardChange}
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="thickness"
//                 placeholder="Thickness"
//                 value={editCard.thickness}
//                 onChange={handleEditCardChange}
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="length"
//                 placeholder="Length"
//                 value={editCard.length}
//                 onChange={handleEditCardChange}
//                 className="w-full border p-2 rounded"
//               />
//               <div className="flex items-center gap-4">
//                 <img
//                   src={editCard.image}
//                   alt="Current card"
//                   className="w-20 h-20 object-cover rounded border"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleEditCardImageChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   onClick={() => setEditCard(null)}
//                   className="bg-gray-500 text-white px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleEditCardSubmit}
//                   disabled={uploading}
//                   className={`bg-red-600 text-white px-4 py-2 rounded ${
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

//      {editCategory && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Edit Category</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Category Type
//                 </label>
//                 <select
//                   name="categoryType"
//                   value={editCategory.categoryType}
//                   onChange={handleEditCategoryChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   required
//                 >
//                   <option value="roll">Roll</option>
//                   <option value="cd">CD</option>
//                   <option value="spool">Spool</option>
//                 </select>
//               </div>

//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={editCategory.name}
//                 onChange={handleEditCategoryChange}
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="material"
//                 placeholder="Material"
//                 value={editCategory.material}
//                 onChange={handleEditCategoryChange}
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="thickness"
//                 placeholder="Thickness"
//                 value={editCategory.thickness}
//                 onChange={handleEditCategoryChange}
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="length"
//                 placeholder="Length"
//                 value={editCategory.length}
//                 onChange={handleEditCategoryChange}
//                 className="w-full border p-2 rounded"
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={editCategory.description}
//                 onChange={handleEditCategoryChange}
//                 className="w-full border p-2 rounded"
//                 rows={3}
//               />
//               <div className="flex items-center gap-4">
//                 <img
//                   src={editCategory.image}
//                   alt="Current category"
//                   className="w-20 h-20 object-cover rounded border"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleEditCategoryImageChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   onClick={() => setEditCategory(null)}
//                   className="bg-gray-500 text-white px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleEditCategorySubmit}
//                   disabled={uploading}
//                   className={`bg-purple-600 text-white px-4 py-2 rounded ${
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

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const productsSnap = await getDocs(collection(db, "products"));
      const showcaseSnap = await getDocs(collection(db, "showcaseCards"));
      const allProductsSnap = await getDocs(collection(db, "allProducts"));
      const categoriesSnap = await getDocs(collection(db, "categories"));

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

  const openModal = (card) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (modalCategory === "showcase") {
      if (term === "") {
        setCards(originalCards);
      } else {
        const filtered = originalCards.filter(
          (card) =>
            card.title?.toLowerCase().includes(term) ||
            card.shortDescription?.toLowerCase().includes(term) ||
            card.longDescription?.toLowerCase().includes(term)
        );
        setCards(filtered);
      }
    } else if (modalCategory === "all") {
      if (term === "") {
        setAllProducts(originalAllProducts);
      } else {
        const filtered = originalAllProducts.filter(
          (product) =>
            product.name?.toLowerCase().includes(term) ||
            product.description?.toLowerCase().includes(term)
        );
        setAllProducts(filtered);
      }
    } else if (modalCategory === "categories") {
      if (term === "") {
        setCategories(originalCategories);
      } else {
        const filtered = originalCategories.filter(
          (category) =>
            category.name?.toLowerCase().includes(term) ||
            category.description?.toLowerCase().includes(term) ||
            category.material?.toLowerCase().includes(term) ||
            category.categoryType?.toLowerCase().includes(term)
        );
        setCategories(filtered);
      }
    } else if (modalCategory) {
      if (term === "") {
        setProducts(
          originalProducts.filter((p) =>
            modalCategory ? p.category === modalCategory : true
          )
        );
      } else {
        const filtered = originalProducts.filter(
          (product) =>
            (product.name?.toLowerCase().includes(term) ||
              product.description?.toLowerCase().includes(term)) &&
            (modalCategory ? product.category === modalCategory : true)
        );
        setProducts(filtered);
      }
    }
  };

  const handleDelete = async (id, collectionName = "products") => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, collectionName, id));
        
        if (collectionName !== "allProducts") {
          const allProductsSnap = await getDocs(collection(db, "allProducts"));
          const productToDelete = allProductsSnap.docs.find(doc => doc.data().name === id);
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
          <h2 className="font-michroma  text-lg md:text-3xl text-gray-900 sm:text-4xl">
            Admin Dashboard
          </h2>
          <p className="mt-3 text-xl text-gray-500">
            Manage your products and showcase cards
          </p>
        </div>

        <div className="flex justify-center mb-8 gap-4 flex-wrap">
          <button
            onClick={() => setActiveForm("product")}
            className={`px-6 py-3 rounded-lg shadow transition-colors font-michroma text-sm ${
              activeForm === "product"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Add Product
          </button>
          <button
            onClick={() => setActiveForm("homeProduct")}
            className={`px-6 py-3 rounded-lg shadow transition-colors font-michroma text-sm ${
              activeForm === "homeProduct"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Add Home Product
          </button>
          <button
            onClick={() => setActiveForm("category")}
            className={`px-6 py-3 rounded-lg shadow transition-colors font-michroma text-sm ${
              activeForm === "category"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Add Category
          </button>
        </div>

        {activeForm === "product" && (
          <AddProduct 
            fetchProducts={fetchProducts} 
            setError={setError}
          />
        )}

        {activeForm === "homeProduct" && (
          <AddHomeProduct 
            fetchProducts={fetchProducts} 
            setError={setError}
          />
        )}

        {activeForm === "category" && (
          <AddCategory 
            fetchProducts={fetchProducts} 
            setError={setError}
          />
        )}

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h3 className="font-michroma text-lg font-medium text-gray-900 mb-6 border-b pb-2">
              Manage Items
            </h3>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setModalCategory("product")}
                className="font-michroma text-sm inline-flex items-center px-4 py-2 border border-transparent  font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                View Products
              </button>
              <button
                onClick={() => setModalCategory("shop")}
                className="font-michroma text-sm inline-flex items-center px-4 py-2 border border-transparent  font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                View Shop Items
              </button>
              <button
                onClick={() => setModalCategory("showcase")}
                className="font-michroma text-sm inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                View Showcase Cards
              </button>
              <button
                onClick={() => setModalCategory("categories")}
                className="font-michroma text-sm inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                View Categories
              </button>
              <button
                onClick={() => setModalCategory("all")}
                className=" font-michroma text-sm inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View All Products
              </button>
            </div>

            {modalCategory && (
              <div className="mb-6 w-full max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={`Search ${
                      modalCategory === "showcase"
                        ? "showcase cards"
                        : modalCategory === "all"
                        ? "all products"
                        : modalCategory === "categories"
                        ? "categories"
                        : "products"
                    }...`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

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
                      {searchTerm
                        ? "No matching items found"
                        : `Add some ${
                            modalCategory === "showcase"
                              ? "showcase cards"
                              : modalCategory === "all"
                              ? "all products"
                              : modalCategory === "categories"
                              ? "categories"
                              : "products"
                          } to get started.`}
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
                          {item.images && item.images.length > 1 ? (
                            <div className="relative">
                              <img
                                src={item.images[0] || "/default.jpg"}
                                alt={item.name || item.title}
                                className="w-32 h-32 object-cover rounded-lg border"
                                onClick={() =>
                                  modalCategory === "showcase"
                                    ? openModal(item)
                                    : null
                                }
                                style={{
                                  cursor:
                                    modalCategory === "showcase"
                                      ? "pointer"
                                      : "default",
                                }}
                              />
                              <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                                +{item.images.length - 1}
                              </div>
                            </div>
                          ) : (
                            <img
                              src={item.image || item.images?.[0] || "/default.jpg"}
                              alt={item.name || item.title}
                              className="w-32 h-32 object-cover rounded-lg border"
                              onClick={() =>
                                modalCategory === "showcase"
                                  ? openModal(item)
                                  : null
                              }
                              style={{
                                cursor:
                                  modalCategory === "showcase"
                                    ? "pointer"
                                    : "default",
                              }}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {item.name || item.title}
                          </h4>
                          {item.position && (
                            <p className="text-sm font-medium text-red-600">
                              Position: {item.position}
                            </p>
                          )}
                          {item.categoryType && (
                            <p className="text-sm font-medium text-blue-600">
                              Type: {item.categoryType}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">
                            {item.description || item.shortDescription}
                          </p>
                          {item.price && (
                            <p className="mt-2 text-sm text-gray-500">
                              Price: {item.price}₹
                            </p>
                          )}
                          {item.material && (
                            <p className="mt-1 text-sm text-gray-500">
                              Material: {item.material}
                            </p>
                          )}
                          {item.thickness && (
                            <p className="mt-1 text-sm text-gray-500">
                              Thickness: {item.thickness}
                            </p>
                          )}
                          {item.length && (
                            <p className="mt-1 text-sm text-gray-500">
                              Length: {item.length}
                            </p>
                          )}
                          {item.images && item.images.length > 1 && (
                            <p className="mt-1 text-xs text-gray-500">
                              {item.images.length} images
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
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              if (modalCategory === "showcase") {
                                const thicknessMatch =
                                  item.longDescription?.match(
                                    /Thickness: ([^,]+)/
                                  );
                                const lengthMatch =
                                  item.longDescription?.match(/Length: (.+)/);

                                setEditCard({
                                  id: item.id,
                                  name: item.title,
                                  material: item.shortDescription,
                                  thickness: thicknessMatch
                                    ? thicknessMatch[1]
                                    : "",
                                  length: lengthMatch ? lengthMatch[1] : "",
                                  image: item.image,
                                  position: item.position,
                                });
                              } else if (modalCategory === "categories") {
                                setEditCategory({
                                  id: item.id,
                                  name: item.name,
                                  material: item.material,
                                  thickness: item.thickness,
                                  length: item.length,
                                  description: item.description,
                                  categoryType: item.categoryType,
                                  image: item.image,
                                });
                              } else if (modalCategory === "all") {
                              } else {
                                setEditProduct({
                                  ...item,
                                  category: modalCategory,
                                });
                              }
                            }}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
            {selectedCard.position && (
              <p className="text-sm font-medium text-red-600">
                Position: {selectedCard.position}
              </p>
            )}
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