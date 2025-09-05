
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
