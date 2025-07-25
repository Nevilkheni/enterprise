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
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "home",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalCategory, setModalCategory] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const fetchProducts = async () => {
    const snap = await getDocs(collection(db, "products"));
    const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(items);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

      await addDoc(collection(db, "products"), {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category,
        image: imageUrl,
      });

      alert("Product added!");
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "home",
        imageUrl: "",
      });
      setImageFile(null);
      fetchProducts();
    } catch (err) {
      console.error("Add error:", err);
      alert("Something went wrong! Check the console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    }
  };

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
      let imageUrl = editProduct.image;

      if (editProduct.newImageFile) {
        const imageRef = ref(
          storage,
          `products/${uuidv4()}-${editProduct.newImageFile.name}`
        );
        await uploadBytes(imageRef, editProduct.newImageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const refDoc = doc(db, "products", editProduct.id);
      await updateDoc(refDoc, {
        name: editProduct.name,
        price: Number(editProduct.price),
        description: editProduct.description,
        image: imageUrl,
      });

      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Update failed");
    }
  };

  const filteredProducts = products.filter((p) => p.category === modalCategory);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="home">Home</option>
          <option value="product">Product</option>
        </select>

        <input
          type="text"
          name="imageUrl"
          placeholder="Or paste file URL (optional)"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </form>

      <div className="flex gap-4 mt-10 justify-center">
        <button
          onClick={() => setModalCategory("home")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Home
        </button>
        <button
          onClick={() => setModalCategory("product")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Product
        </button>
      </div>

      {modalCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-3xl w-full rounded-lg p-6 relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setModalCategory(null)}
              className="absolute top-2 right-4 text-red-600 text-xl"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4 capitalize">
              {modalCategory} Products
            </h3>

            {filteredProducts.length === 0 ? (
              <p>No products found in this category.</p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded mb-4 flex gap-4"
                >
                  <img
                    src={
                      editProduct?.id === product.id &&
                      editProduct?.newImageFile
                        ? URL.createObjectURL(editProduct.newImageFile)
                        : product.image
                    }
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  {editProduct?.id === product.id ? (
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        name="name"
                        value={editProduct.name}
                        onChange={handleEditChange}
                        className="w-full border p-1 rounded"
                      />
                      <input
                        type="number"
                        name="price"
                        value={editProduct.price}
                        onChange={handleEditChange}
                        className="w-full border p-1 rounded"
                      />
                      <textarea
                        name="description"
                        value={editProduct.description}
                        onChange={handleEditChange}
                        className="w-full border p-1 rounded"
                      />
                      <input
                        type="file"
                        onChange={handleEditImageChange}
                        className="w-full border p-1 rounded"
                      />
                      <button
                        onClick={handleEditSubmit}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      <p>₹{product.price}</p>
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    {editProduct?.id === product.id ? null : (
                      <>
                        <button
                          onClick={() => setEditProduct(product)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
