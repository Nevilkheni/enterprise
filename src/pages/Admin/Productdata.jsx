
import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import AdminHeader from "../../components/AdminHeader";
import { useAuth } from "../../context/AuthContext";

const ProductData = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!user || user.role !== "admin") return;
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (isConfirmed) {
      try {
        await deleteDoc(doc(db, "products", id));
        setProducts((prev) => prev.filter((p) => p.id !== id));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-600">Loading products...</p>;
  }

  if (!products.length) {
    return (
      <div>
        <AdminHeader />
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Product Management</h1>
          <p className="text-gray-600">No products found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Product Management</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow-md">
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name || "Unnamed Product"}
                className="h-40 object-cover w-full mb-3 rounded"
              />
              <h2 className="text-xl font-semibold">{product.name || "Unnamed"}</h2>
              <p className="text-gray-600 text-sm mb-1">
                {product.description || "No description provided."}
              </p>
              <p className="text-green-700 font-bold">
                ₹{Number(product.price || 0).toLocaleString("en-IN")}
              </p>

              {user?.role === "admin" && (
                <div className="flex justify-between mt-4">
                  <button className="text-yellow-600 hover:underline">Edit</button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductData;
