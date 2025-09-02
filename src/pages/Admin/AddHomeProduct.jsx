import React, { useState } from "react";
import { db, storage } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddHomeProduct = ({ fetchProducts, setError }) => {
  const [homeProductForm, setHomeProductForm] = useState({
    name: "",
    material: "",
    thickness: "",
    length: "",
    imageUrl: "",
    position: "1",
  });
  const [homeProductImageFile, setHomeProductImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState("");

  const checkDuplicateShowcase = async (name) => {
    try {
      const q = query(
        collection(db, "showcaseCards"),
        where("title", "==", name)
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
      const isDuplicate = await checkDuplicateShowcase(productData.name);
      if (isDuplicate) {
        console.log("Product already exists in allProducts, skipping");
        return;
      }
      
      await addDoc(collection(db, "allProducts"), {
        name: productData.name,
        description: productData.description,
        image: productData.image,
        category: "all",
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error adding to all products:", err);
    }
  };

  const handleHomeProductChange = (e) => {
    setHomeProductForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setDuplicateWarning("");
  };

  const handleHomeProductFileChange = (e) => {
    setHomeProductImageFile(e.target.files[0]);
  };

  const handleHomeProductSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const isDuplicate = await checkDuplicateShowcase(homeProductForm.name);
      if (isDuplicate) {
        setDuplicateWarning(`A home product with the name "${homeProductForm.name}" already exists!`);
        setUploading(false);
        return;
      }
      
      const position = parseInt(homeProductForm.position);
      if (isNaN(position) || position < 1 || position > 4) {
        alert("Position must be between 1 and 4");
        setUploading(false);
        return;
      }

      const existingCards = await getDocs(collection(db, "showcaseCards"));
      const existingInPosition = existingCards.docs.find(
        (doc) => doc.data().position === homeProductForm.position
      );

      if (existingInPosition) {
        if (
          !window.confirm(
            `Position ${homeProductForm.position} already has a product. Replace it?`
          )
        ) {
          setUploading(false);
          return;
        }
        await deleteDoc(doc(db, "showcaseCards", existingInPosition.id));
        alert(
          `Removed existing product from position ${homeProductForm.position}`
        );
      }

      let imageUrl = homeProductForm.imageUrl;
      if (!imageUrl && homeProductImageFile) {
        const imageRef = ref(
          storage,
          `showcaseImages/${homeProductImageFile.name}-${Date.now()}`
        );
        const snapshot = await uploadBytes(imageRef, homeProductImageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      } else if (!imageUrl) {
        alert("Please upload a file or paste a file URL.");
        setUploading(false);
        return;
      }

      const productData = {
        title: homeProductForm.name,
        shortDescription: homeProductForm.material,
        longDescription: `Thickness: ${homeProductForm.thickness}, Length: ${homeProductForm.length}`,
        image: imageUrl,
        position: homeProductForm.position,
        features: [
          `Material: ${homeProductForm.material}`,
          `Thickness: ${homeProductForm.thickness}`,
          `Length: ${homeProductForm.length}`,
        ],
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "showcaseCards"), productData);
      
      await addToAllProducts({
        name: homeProductForm.name,
        description: `Material: ${homeProductForm.material}, Thickness: ${homeProductForm.thickness}, Length: ${homeProductForm.length}`,
        image: imageUrl
      });

      setHomeProductForm({
        name: "",
        material: "",
        thickness: "",
        length: "",
        imageUrl: "",
        position: "1",
      });
      setHomeProductImageFile(null);
      setDuplicateWarning("");
      await fetchProducts();
      alert("✅ Home Product added successfully!");
    } catch (error) {
      console.error("❌ Error adding product:", error);
      setError("Failed to add product.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10">
      <div className="p-6 sm:p-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">
          Add Home Product (Positions 1-4)
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
        
        <form onSubmit={handleHomeProductSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Position (1-4)
              </label>
              <select
                name="position"
                value={homeProductForm.position}
                onChange={handleHomeProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="1">Position 1</option>
                <option value="2">Position 2</option>
                <option value="3">Position 3</option>
                <option value="4">Position 4</option>
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
                value={homeProductForm.name}
                onChange={handleHomeProductChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Material
              </label>
              <input
                type="text"
                name="material"
                placeholder="Material"
                value={homeProductForm.material}
                onChange={handleHomeProductChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thickness
              </label>
              <input
                type="text"
                name="thickness"
                placeholder="Thickness"
                value={homeProductForm.thickness}
                onChange={handleHomeProductChange}
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
                value={homeProductForm.length}
                onChange={handleHomeProductChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL (optional)
            </label>
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL (optional)"
              value={homeProductForm.imageUrl || ""}
              onChange={handleHomeProductChange}
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
              onChange={handleHomeProductFileChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded w-full"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Home Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHomeProduct;