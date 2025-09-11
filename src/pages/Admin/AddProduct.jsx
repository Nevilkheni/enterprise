import React, { useState } from "react";
import { db, storage } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const AddProduct = ({ fetchProducts, setError }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "shop",
    categoryType: "roll", // New field for category type
    imageUrls: [""],
    length: "",
    thickness: "",
    width: "",
    material: ""
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState("");

  const checkDuplicateProduct = async (name, category, collectionName = "products") => {
    try {
      const q = query(
        collection(db, collectionName),
        where("name", "==", name),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking duplicate:", error);
      return false;
    }
  };

  const addToAllProducts = async (productData) => {
    try {
      const isDuplicate = await checkDuplicateProduct(productData.name, "all", "allProducts");
      if (isDuplicate) {
        console.log("Product already exists in allProducts, skipping");
        return;
      }
      
      await addDoc(collection(db, "allProducts"), {
        name: productData.name,
        description: productData.description,
        image: productData.images && productData.images.length > 0 ? productData.images[0] : "",
        images: productData.images || [],
        category: "all",
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error adding to all products:", err);
    }
  };

  const addToCategories = async (productData) => {
    try {
      // Check if product already exists in categories
      const categoriesQ = query(
        collection(db, "categories"),
        where("name", "==", productData.name)
      );
      const categoriesSnap = await getDocs(categoriesQ);
      
      if (!categoriesSnap.empty) {
        console.log("Product already exists in categories, skipping");
        return;
      }
      
      // Add to categories collection
      await addDoc(collection(db, "categories"), {
        name: productData.name,
        description: productData.description,
        image: productData.images && productData.images.length > 0 ? productData.images[0] : "",
        categoryType: productData.categoryType,
        material: productData.material || "",
        thickness: productData.thickness || "",
        length: productData.length || "",
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error adding to categories:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setDuplicateWarning("");
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...formData.imageUrls];
    newImageUrls[index] = value;
    setFormData((prev) => ({
      ...prev,
      imageUrls: newImageUrls,
    }));
  };

  const addImageUrlField = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ""],
    }));
  };

  const removeImageUrlField = (index) => {
    if (formData.imageUrls.length <= 1) return;
    
    const newImageUrls = [...formData.imageUrls];
    newImageUrls.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      imageUrls: newImageUrls,
    }));
    
    if (imageFiles[index]) {
      const newImageFiles = [...imageFiles];
      newImageFiles.splice(index, 1);
      setImageFiles(newImageFiles);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      
      // Check for duplicate product in the same category
      const isDuplicate = await checkDuplicateProduct(formData.name, formData.category);
      if (isDuplicate) {
        setDuplicateWarning(`A product with the name "${formData.name}" already exists in the ${formData.category} category!`);
        setUploading(false);
        return;
      }
      
      let imageUrls = [];

      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const imageRef = ref(storage, `products/${uuidv4()}-${file.name}`);
          const snapshot = await uploadBytes(imageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          imageUrls.push(url);
        }
      }
      
      if (formData.imageUrls && formData.imageUrls.length > 0) {
        const validUrls = formData.imageUrls.filter(url => url.trim() !== "");
        imageUrls = [...imageUrls, ...validUrls];
      }
      
      if (imageUrls.length === 0) {
        alert("Please upload at least one image or paste at least one image URL.");
        setUploading(false);
        return;
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        images: imageUrls,
        createdAt: new Date().toISOString(),
      };

      // Add optional fields if they exist
      if (formData.length) productData.length = formData.length;
      if (formData.thickness) productData.thickness = formData.thickness;
      if (formData.width) productData.width = formData.width;
      if (formData.material) productData.material = formData.material;
      if (formData.categoryType) productData.categoryType = formData.categoryType;

      if (formData.category !== "product") {
        productData.price = Number(formData.price);
      }

      await addDoc(collection(db, "products"), productData);
      await addToAllProducts(productData);
      
      // If this is a shop product, also add to categories
      if (formData.category === "shop") {
        await addToCategories(productData);
      }

      alert("Product added successfully!");
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "shop",
        categoryType: "roll",
        imageUrls: [""],
        length: "",
        thickness: "",
        width: "",
        material: ""
      });
      setImageFiles([]);
      setDuplicateWarning("");
      await fetchProducts();
    } catch (err) {
      console.error("Add error:", err);
      setError("Something went wrong! Check the console.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10">
      <div className="p-6 sm:p-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">
          Add New Product
        </h3>
        
        {duplicateWarning && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
            {duplicateWarning}
            <button
              onClick={() => setDuplicateWarning("")}
              className="absolute top-0 right-0 px-2 py-1"
            >
              ×
            </button>
          </div>
        )}
        
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

          {formData.category === "shop" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category Type
              </label>
              <select
                name="categoryType"
                value={formData.categoryType}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="roll">Roll</option>
                <option value="cd">CD</option>
                <option value="spool">Spool</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

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

          {/* New fields for shop products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Length (optional)
              </label>
              <input
                type="text"
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., 6 feet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thickness (optional)
              </label>
              <input
                type="text"
                name="thickness"
                value={formData.thickness}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., 2mm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Width (optional)
              </label>
              <input
                type="text"
                name="width"
                value={formData.width}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., 4 inches"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Material (optional)
              </label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., Steel, Wood, etc."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URLs (one per line)
            </label>
            <div className="space-y-2">
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Paste image URL here"
                  />
                  <button
                    type="button"
                    onClick={() => removeImageUrlField(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                    disabled={formData.imageUrls.length <= 1}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImageUrlField}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                + Add another URL
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Product Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="product-file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload files</span>
                    <input
                      id="product-file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      multiple
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB each
                </p>
                {imageFiles.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Selected files:</p>
                    <ul className="text-sm text-green-600">
                      {imageFiles.map((file, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span>{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
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
  );
};

export default AddProduct;