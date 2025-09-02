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

const AddCategory = ({ fetchProducts, setError }) => {
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    material: "",
    thickness: "",
    length: "",
    imageUrl: "",
    description: "",
    categoryType: "roll", 
  });
  const [categoryImageFile, setCategoryImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState("");

  const checkDuplicateCategory = async (name) => {
    try {
      const q = query(
        collection(db, "categories"),
        where("name", "==", name)
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
      const isDuplicate = await checkDuplicateCategory(productData.name);
      if (isDuplicate) {
        console.log("Product already exists in allProducts, skipping");
        return;
      }
      
      await addDoc(collection(db, "allProducts"), {
        name: productData.name,
        description: productData.description,
        image: productData.image,
        category: productData.categoryType,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error adding to all products:", err);
    }
  };

  const handleCategoryChange = (e) => {
    setCategoryForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setDuplicateWarning("");
  };

  const handleCategoryFileChange = (e) => {
    setCategoryImageFile(e.target.files[0]);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const isDuplicate = await checkDuplicateCategory(categoryForm.name);
      if (isDuplicate) {
        setDuplicateWarning(`A category with the name "${categoryForm.name}" already exists!`);
        setUploading(false);
        return;
      }
      
      let imageUrl = categoryForm.imageUrl;
      if (!imageUrl && categoryImageFile) {
        const imageRef = ref(
          storage,
          `categories/${categoryImageFile.name}-${Date.now()}`
        );
        const snapshot = await uploadBytes(imageRef, categoryImageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      } else if (!imageUrl) {
        alert("Please upload a file or paste a file URL.");
        setUploading(false);
        return;
      }

      const categoryData = {
        name: categoryForm.name,
        material: categoryForm.material,
        thickness: categoryForm.thickness,
        length: categoryForm.length,
        description: categoryForm.description,
        categoryType: categoryForm.categoryType,
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "categories"), categoryData);
      
      await addToAllProducts({
        name: categoryForm.name,
        description: `${categoryForm.description} | Material: ${categoryForm.material} | Thickness: ${categoryForm.thickness} | Length: ${categoryForm.length}`,
        image: imageUrl,
        categoryType: categoryForm.categoryType
      });

      setCategoryForm({
        name: "",
        material: "",
        thickness: "",
        length: "",
        imageUrl: "",
        description: "",
        categoryType: "roll",
      });
      setCategoryImageFile(null);
      setDuplicateWarning("");
      await fetchProducts();
      alert("✅ Category added successfully!");
    } catch (error) {
      console.error("❌ Error adding category:", error);
      setError("Failed to add category.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10">
      <div className="p-6 sm:p-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">
          Add New Category
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
        
        <form onSubmit={handleCategorySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Type
            </label>
            <select
              name="categoryType"
              value={categoryForm.categoryType}
              onChange={handleCategoryChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="roll">Roll</option>
              <option value="cd">CD</option>
              <option value="spool">Spool</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={categoryForm.name}
              onChange={handleCategoryChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Material
            </label>
            <input
              type="text"
              name="material"
              placeholder="Material"
              value={categoryForm.material}
              onChange={handleCategoryChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thickness
              </label>
              <input
                type="text"
                name="thickness"
                placeholder="Thickness"
                value={categoryForm.thickness}
                onChange={handleCategoryChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Length
              </label>
              <input
                type="text"
                name="length"
                placeholder="Length"
                value={categoryForm.length}
                onChange={handleCategoryChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={categoryForm.description}
              onChange={handleCategoryChange}
              className="w-full border px-3 py-2 rounded"
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
              placeholder="Image URL (optional)"
              value={categoryForm.imageUrl || ""}
              onChange={handleCategoryChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCategoryFileChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded w-full"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;