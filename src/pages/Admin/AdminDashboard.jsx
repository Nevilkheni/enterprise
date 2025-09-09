import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
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
  const [editAllProduct, setEditAllProduct] = useState(null);
  const [editCategory, setEditCategory] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeForm, setActiveForm] = useState("product");
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Tailwind color classes mapping
  const colorClasses = {
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    orange: "bg-orange-600 hover:bg-orange-700",
    purple: "bg-purple-600 hover:bg-purple-700",
    blue: "bg-blue-600 hover:bg-blue-700",
  };

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
      setCards(
        filterItems(originalCards, [
          "title",
          "shortDescription",
          "longDescription",
        ])
      );
    } else if (modalCategory === "all") {
      setAllProducts(
        filterItems(originalAllProducts, ["name", "description"])
      );
    } else if (modalCategory === "categories") {
      setCategories(
        filterItems(originalCategories, [
          "name",
          "description",
          "material",
          "categoryType",
        ])
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

  // 🔹 Update product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // Handle image uploads if new images are selected
      let updatedImages = [...editProduct.images];
      
      if (editProduct.newImageFiles && editProduct.newImageFiles.length > 0) {
        for (const file of editProduct.newImageFiles) {
          const imageRef = ref(storage, `products/${uuidv4()}-${file.name}`);
          const snapshot = await uploadBytes(imageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          updatedImages.push(url);
        }
      }
      
      // Handle image URLs if new URLs are added
      if (editProduct.newImageUrls && editProduct.newImageUrls.length > 0) {
        const validUrls = editProduct.newImageUrls.filter(url => url.trim() !== "");
        updatedImages = [...updatedImages, ...validUrls];
      }
      
      // Prepare update data
      const updateData = {
        name: editProduct.name,
        description: editProduct.description,
        category: editProduct.category,
        images: updatedImages,
        updatedAt: new Date().toISOString(),
      };
      
      // Add optional fields if they exist
      if (editProduct.length) updateData.length = editProduct.length;
      if (editProduct.thickness) updateData.thickness = editProduct.thickness;
      if (editProduct.width) updateData.width = editProduct.width;
      if (editProduct.material) updateData.material = editProduct.material;
      if (editProduct.category !== "product" && editProduct.price) {
        updateData.price = Number(editProduct.price);
      }
      
      // Update the product
      await updateDoc(doc(db, "products", editProduct.id), updateData);
      
      // Also update in allProducts if needed
      const allProductsQuery = query(
        collection(db, "allProducts"),
        where("name", "==", editProduct.name)
      );
      const allProductsSnapshot = await getDocs(allProductsQuery);
      
      if (!allProductsSnapshot.empty) {
        const allProductDoc = allProductsSnapshot.docs[0];
        await updateDoc(doc(db, "allProducts", allProductDoc.id), {
          name: editProduct.name,
          description: editProduct.description,
          image: updatedImages.length > 0 ? updatedImages[0] : "",
          images: updatedImages,
          updatedAt: new Date().toISOString(),
        });
      }
      
      alert("Product updated successfully!");
      setEditProduct(null);
      await fetchProducts();
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Update showcase card
  const handleUpdateCard = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      let updatedImage = editCard.image;
      
      // Handle image upload if a new image is selected
      if (editCard.newImageFile) {
        const imageRef = ref(storage, `showcase/${uuidv4()}-${editCard.newImageFile.name}`);
        const snapshot = await uploadBytes(imageRef, editCard.newImageFile);
        updatedImage = await getDownloadURL(snapshot.ref);
      }
      
      // Prepare update data
      const updateData = {
        title: editCard.title,
        shortDescription: editCard.shortDescription,
        longDescription: editCard.longDescription,
        image: updatedImage,
        updatedAt: new Date().toISOString(),
      };
      
      // Update the showcase card
      await updateDoc(doc(db, "showcaseCards", editCard.id), updateData);
      
      alert("Showcase card updated successfully!");
      setEditCard(null);
      await fetchProducts();
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update showcase card");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Update all product
  const handleUpdateAllProduct = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // Handle image uploads if new images are selected
      let updatedImages = [...editAllProduct.images];
      
      if (editAllProduct.newImageFiles && editAllProduct.newImageFiles.length > 0) {
        for (const file of editAllProduct.newImageFiles) {
          const imageRef = ref(storage, `allProducts/${uuidv4()}-${file.name}`);
          const snapshot = await uploadBytes(imageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          updatedImages.push(url);
        }
      }
      
      // Handle image URLs if new URLs are added
      if (editAllProduct.newImageUrls && editAllProduct.newImageUrls.length > 0) {
        const validUrls = editAllProduct.newImageUrls.filter(url => url.trim() !== "");
        updatedImages = [...updatedImages, ...validUrls];
      }
      
      // Prepare update data
      const updateData = {
        name: editAllProduct.name,
        description: editAllProduct.description,
        images: updatedImages,
        updatedAt: new Date().toISOString(),
      };
      
      // Update the all product
      await updateDoc(doc(db, "allProducts", editAllProduct.id), updateData);
      
      alert("Product updated successfully!");
      setEditAllProduct(null);
      await fetchProducts();
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Update category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      let updatedImage = editCategory.image;
      
      // Handle image upload if a new image is selected
      if (editCategory.newImageFile) {
        const imageRef = ref(storage, `categories/${uuidv4()}-${editCategory.newImageFile.name}`);
        const snapshot = await uploadBytes(imageRef, editCategory.newImageFile);
        updatedImage = await getDownloadURL(snapshot.ref);
      }
      
      // Prepare update data
      const updateData = {
        name: editCategory.name,
        description: editCategory.description,
        material: editCategory.material,
        categoryType: editCategory.categoryType,
        image: updatedImage,
        updatedAt: new Date().toISOString(),
      };
      
      // Update the category
      await updateDoc(doc(db, "categories", editCategory.id), updateData);
      
      alert("Category updated successfully!");
      setEditCategory(null);
      await fetchProducts();
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update category");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Remove image from product
  const removeImage = (index, type) => {
    if (type === 'product') {
      const updatedImages = [...editProduct.images];
      updatedImages.splice(index, 1);
      setEditProduct({ ...editProduct, images: updatedImages });
    } else if (type === 'allProduct') {
      const updatedImages = [...editAllProduct.images];
      updatedImages.splice(index, 1);
      setEditAllProduct({ ...editAllProduct, images: updatedImages });
    }
  };

  // 🔹 Add new image URL field
  const addImageUrlField = (type) => {
    if (type === 'product') {
      setEditProduct({
        ...editProduct,
        newImageUrls: [...(editProduct.newImageUrls || []), ""],
      });
    } else if (type === 'allProduct') {
      setEditAllProduct({
        ...editAllProduct,
        newImageUrls: [...(editAllProduct.newImageUrls || []), ""],
      });
    }
  };

  // 🔹 Handle new image URL change
  const handleNewImageUrlChange = (index, value, type) => {
    if (type === 'product') {
      const newImageUrls = [...(editProduct.newImageUrls || [])];
      newImageUrls[index] = value;
      setEditProduct({ ...editProduct, newImageUrls });
    } else if (type === 'allProduct') {
      const newImageUrls = [...(editAllProduct.newImageUrls || [])];
      newImageUrls[index] = value;
      setEditAllProduct({ ...editAllProduct, newImageUrls });
    }
  };

  // 🔹 Handle file selection for new images
  const handleNewFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === 'product') {
      setEditProduct({
        ...editProduct,
        newImageFiles: [...(editProduct.newImageFiles || []), ...files],
      });
    } else if (type === 'allProduct') {
      setEditAllProduct({
        ...editAllProduct,
        newImageFiles: [...(editAllProduct.newImageFiles || []), ...files],
      });
    } else if (type === 'card') {
      setEditCard({
        ...editCard,
        newImageFile: files[0],
      });
    } else if (type === 'category') {
      setEditCategory({
        ...editCategory,
        newImageFile: files[0],
      });
    }
  };

  // 🔹 Remove new file
  const removeNewFile = (index, type) => {
    if (type === 'product') {
      const newFiles = [...(editProduct.newImageFiles || [])];
      newFiles.splice(index, 1);
      setEditProduct({ ...editProduct, newImageFiles: newFiles });
    } else if (type === 'allProduct') {
      const newFiles = [...(editAllProduct.newImageFiles || [])];
      newFiles.splice(index, 1);
      setEditAllProduct({ ...editAllProduct, newImageFiles: newFiles });
    } else if (type === 'card') {
      setEditCard({
        ...editCard,
        newImageFile: null,
      });
    } else if (type === 'category') {
      setEditCategory({
        ...editCategory,
        newImageFile: null,
      });
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
          <h2 className="font-michroma text-3xl text-gray-900">
            Admin Dashboard
          </h2>
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

        {/* 🔹 Edit Product Modal - Made Responsive */}
        {editProduct && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-2 sm:p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Product</h3>
                <button
                  onClick={() => setEditProduct(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={editProduct.name}
                    onChange={(e) => setEditProduct({...editProduct, name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={editProduct.description}
                    onChange={(e) => setEditProduct({...editProduct, description: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                    rows={3}
                    required
                  />
                </div>
                
                {editProduct.category !== "product" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      value={editProduct.price}
                      onChange={(e) => setEditProduct({...editProduct, price: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                      required
                    />
                  </div>
                )}
                
                {/* Existing Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Existing Images</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editProduct.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img src={img} alt={`Product ${index}`} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => removeImage(index, 'product')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* New Image URLs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Add Image URLs</label>
                  <div className="space-y-2 mt-2">
                    {(editProduct.newImageUrls || []).map((url, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => handleNewImageUrlChange(index, e.target.value, 'product')}
                          className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                          placeholder="Paste image URL here"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImageUrls = [...(editProduct.newImageUrls || [])];
                            newImageUrls.splice(index, 1);
                            setEditProduct({...editProduct, newImageUrls});
                          }}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addImageUrlField('product')}
                      className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      + Add another URL
                    </button>
                  </div>
                </div>
                
                {/* New Image Uploads */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload New Images</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleNewFileChange(e, 'product')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  />
                  {(editProduct.newImageFiles || []).length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Selected files:</p>
                      <ul className="text-sm text-green-600">
                        {(editProduct.newImageFiles || []).map((file, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span className="truncate max-w-xs">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeNewFile(index, 'product')}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditProduct(null)}
                    className="px-4 py-2 bg-gray-300 rounded-md text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm sm:text-base"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 🔹 Edit Showcase Card Modal - Made Responsive */}
        {editCard && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-2 sm:p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Showcase Card</h3>
                <button
                  onClick={() => setEditCard(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleUpdateCard} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={editCard.title}
                    onChange={(e) => setEditCard({...editCard, title: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Short Description</label>
                  <input
                    type="text"
                    value={editCard.shortDescription}
                    onChange={(e) => setEditCard({...editCard, shortDescription: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Long Description</label>
                  <textarea
                    value={editCard.longDescription}
                    onChange={(e) => setEditCard({...editCard, longDescription: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                    rows={3}
                    required
                  />
                </div>
                
                {/* Existing Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Existing Image</label>
                  <div className="mt-2">
                    <img src={editCard.image} alt={editCard.title} className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded" />
                  </div>
                </div>
                
                {/* New Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload New Image</label>
                  <input
                    type="file"
                    onChange={(e) => handleNewFileChange(e, 'card')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  />
                  {editCard.newImageFile && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Selected file:</p>
                      <div className="text-sm text-green-600 flex items-center justify-between">
                        <span className="truncate max-w-xs">{editCard.newImageFile.name}</span>
                        <button
                          type="button"
                          onClick={() => removeNewFile(null, 'card')}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditCard(null)}
                    className="px-4 py-2 bg-gray-300 rounded-md text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm sm:text-base"
                  >
                    Update Card
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 🔹 Edit All Product Modal - Made Responsive */}
        {editAllProduct && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-2 sm:p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Product (All Products)</h3>
                <button
                  onClick={() => setEditAllProduct(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleUpdateAllProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={editAllProduct.name}
                    onChange={(e) => setEditAllProduct({...editAllProduct, name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={editAllProduct.description}
                    onChange={(e) => setEditAllProduct({...editAllProduct, description: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                    rows={3}
                    required
                  />
                </div>
                
                {/* Existing Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Existing Images</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editAllProduct.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img src={img} alt={`Product ${index}`} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => removeImage(index, 'allProduct')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* New Image URLs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Add Image URLs</label>
                  <div className="space-y-2 mt-2">
                    {(editAllProduct.newImageUrls || []).map((url, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => handleNewImageUrlChange(index, e.target.value, 'allProduct')}
                          className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                          placeholder="Paste image URL here"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImageUrls = [...(editAllProduct.newImageUrls || [])];
                            newImageUrls.splice(index, 1);
                            setEditAllProduct({...editAllProduct, newImageUrls});
                          }}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addImageUrlField('allProduct')}
                      className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      + Add another URL
                    </button>
                  </div>
                </div>
                
                {/* New Image Uploads */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload New Images</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleNewFileChange(e, 'allProduct')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  />
                  {(editAllProduct.newImageFiles || []).length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Selected files:</p>
                      <ul className="text-sm text-green-600">
                        {(editAllProduct.newImageFiles || []).map((file, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span className="truncate max-w-xs">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeNewFile(index, 'allProduct')}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditAllProduct(null)}
                    className="px-4 py-2 bg-gray-300 rounded-md text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm sm:text-base"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 🔹 Edit Category Modal - Made Responsive */}
        {editCategory && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-2 sm:p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Category</h3>
                <button
                  onClick={() => setEditCategory(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleUpdateCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category Name</label>
                  <input
                    type="text"
                    value={editCategory.name}
                    onChange={(e) => setEditCategory({...editCategory, name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={editCategory.description}
                    onChange={(e) => setEditCategory({...editCategory, description: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Material</label>
                  <input
                    type="text"
                    value={editCategory.material}
                    onChange={(e) => setEditCategory({...editCategory, material: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category Type</label>
                  <input
                    type="text"
                    value={editCategory.categoryType}
                    onChange={(e) => setEditCategory({...editCategory, categoryType: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                  />
                </div>
                
                {/* Existing Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Existing Image</label>
                  <div className="mt-2">
                    <img src={editCategory.image} alt={editCategory.name} className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded" />
                  </div>
                </div>
                
                {/* New Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload New Image</label>
                  <input
                    type="file"
                    onChange={(e) => handleNewFileChange(e, 'category')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  />
                  {editCategory.newImageFile && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Selected file:</p>
                      <div className="text-sm text-green-600 flex items-center justify-between">
                        <span className="truncate max-w-xs">{editCategory.newImageFile.name}</span>
                        <button
                          type="button"
                          onClick={() => removeNewFile(null, 'category')}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditCategory(null)}
                    className="px-4 py-2 bg-gray-300 rounded-md text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm sm:text-base"
                  >
                    Update Category
                  </button>
                </div>
              </form>
            </div>
          </div>
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
                  className={`font-michroma text-sm inline-flex items-center px-4 py-2 rounded-md shadow-sm text-white ${colorClasses[btn.color]}`}
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
                            cursor:
                              modalCategory === "showcase" ? "pointer" : "default",
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
                            onClick={() => {
                              if (modalCategory === "categories") {
                                setEditCategory(item);
                              } else if (modalCategory === "showcase") {
                                setEditCard(item);
                              } else if (modalCategory === "all") {
                                setEditAllProduct(item);
                              } else {
                                setEditProduct(item);
                              }
                            }}
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
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
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