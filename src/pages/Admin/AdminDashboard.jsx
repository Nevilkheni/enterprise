
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
    category: "shop",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalCategory, setModalCategory] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    try {
      setIsLoading(true);
      const snap = await getDocs(collection(db, "products"));
      const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
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
      alert("Something went wrong! Check the console.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        fetchProducts();
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete product");
      }
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

      const updateData = {
        name: editProduct.name,
        description: editProduct.description,
        image: imageUrl,
        updatedAt: new Date().toISOString(),
      };

      if (editProduct.category !== "product") {
        updateData.price = Number(editProduct.price);
      }

      const refDoc = doc(db, "products", editProduct.id);
      await updateDoc(refDoc, updateData);

      setEditProduct(null);
      fetchProducts();
      alert("Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Update failed");
    }
  };

  const filteredProducts = products.filter((p) => p.category === modalCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Admin Dashboard
          </h2>
          <p className="mt-3 text-xl text-gray-500">
            Manage your products and inventory
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10">
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">
              Add New Product
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      disabled={formData.category === "product"}
                      className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 px-3 ${
                        formData.category === "product" ? "bg-gray-100" : ""
                      }`}
                      required={formData.category !== "product"}
                    />
                  </div>
                  {formData.category === "product" && (
                    <p className="mt-1 text-xs text-gray-500">
                      Price is automatically calculated for products
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="shop">Shop</option>
                    <option value="product">Product</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image URL (optional)
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    placeholder="Paste image URL here"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
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
                  {uploading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">
              Manage Products
            </h3>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setModalCategory("product")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                View Product List
              </button>
              <button
                onClick={() => setModalCategory("shop")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Shop Products
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-center text-gray-500">
                  Select a category above to view and manage products
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {modalCategory && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 capitalize">
                        {modalCategory} Products
                      </h3>
                      <button
                        onClick={() => {
                          setModalCategory(null);
                          setEditProduct(null);
                        }}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {filteredProducts.length === 0 ? (
                      <div className="bg-gray-50 p-8 rounded-lg text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          No products found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Add some products in the {modalCategory} category to
                          get started.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {filteredProducts.map((product) => (
                          <div
                            key={product.id}
                            className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                          >
                            {editProduct?.id === product.id ? (
                              <div className="space-y-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                  <div className="flex-shrink-0">
                                    <img
                                      src={
                                        editProduct.newImageFile
                                          ? URL.createObjectURL(
                                              editProduct.newImageFile
                                            )
                                          : product.image
                                      }
                                      alt={product.name}
                                      className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                    <label className="block mt-2">
                                      <span className="sr-only">
                                        Choose product photo
                                      </span>
                                      <input
                                        type="file"
                                        onChange={handleEditImageChange}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                      />
                                    </label>
                                  </div>
                                  <div className="flex-1 space-y-3">
                                    <div>
                                      <label
                                        htmlFor="edit-name"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Name
                                      </label>
                                      <input
                                        type="text"
                                        name="name"
                                        id="edit-name"
                                        value={editProduct.name}
                                        onChange={handleEditChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="edit-price"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Price
                                      </label>
                                      <input
                                        type="number"
                                        name="price"
                                        id="edit-price"
                                        value={editProduct.price}
                                        onChange={handleEditChange}
                                        disabled={
                                          editProduct.category === "product"
                                        }
                                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                          editProduct.category === "product"
                                            ? "bg-gray-100"
                                            : ""
                                        }`}
                                      />
                                      {editProduct.category === "product" && (
                                        <p className="mt-1 text-xs text-gray-500">
                                          Price is automatically calculated for
                                          products
                                        </p>
                                      )}
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="edit-description"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Description
                                      </label>
                                      <textarea
                                        name="description"
                                        id="edit-description"
                                        rows={2}
                                        value={editProduct.description}
                                        onChange={handleEditChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end space-x-3 pt-2 border-t">
                                  <button
                                    onClick={() => setEditProduct(null)}
                                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={handleEditSubmit}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-shrink-0">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-32 h-32 object-cover rounded-lg border"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold text-gray-900">
                                    {product.name}
                                  </h4>
                                  <p className="text-lg font-medium text-indigo-600">
                                    ₹{product.price}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-600">
                                    {product.description}
                                  </p>
                                  {product.createdAt && (
                                    <p className="mt-2 text-xs text-gray-500">
                                      Added:{" "}
                                      {new Date(
                                        product.createdAt
                                      ).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                                <div className="flex flex-col sm:flex-row md:flex-col gap-2 justify-center">
                                  <button
                                    onClick={() => setEditProduct(product)}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(product.id)}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => {
                    setModalCategory(null);
                    setEditProduct(null);
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
