import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Products = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [activeFilters, setActiveFilters] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "products"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data.filter((p) => p.category === "product"));
        
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const filtered = products
      .filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) => {
        if (product.category === "product") return true;
        return product.price >= priceRange[0] && product.price <= priceRange[1];
      })
      .sort((a, b) => {
        const aIsFavorite = favorites.includes(a.id);
        const bIsFavorite = favorites.includes(b.id);
        if (aIsFavorite && !bIsFavorite) return -1;
        if (!aIsFavorite && bIsFavorite) return 1;

        if (a.category === "product" && b.category !== "product") return -1;
        if (a.category !== "product" && b.category === "product") return 1;

        switch (sortOption) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          case "newest":
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
          default:
            return 0;
        }
      });

    setFilteredProducts(filtered);
    
    let count = 0;
    if (searchTerm) count++;
    if (sortOption !== "featured") count++;
    if (priceRange[0] !== 0 || priceRange[1] !== 10000) count++;
    setActiveFilters(count);
  }, [products, searchTerm, sortOption, priceRange, favorites]);

  const toggleFavorite = (product) => {
    if (favorites.includes(product.id)) {
      setFavorites(favorites.filter(id => id !== product.id));
    } else {
      setFavorites([...favorites, product.id]);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSortOption("featured");
    setPriceRange([0, 10000]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Product Collection</h1>
        <p className="text-lg text-gray-600">
          Discover quality items for your every need
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearch} className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </form>

        <div className="w-full md:w-auto">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md border"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      {activeFilters > 0 && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm("")}
                className="ml-1.5 inline-flex text-red-400 hover:text-red-600"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </span>
          )}
          {sortOption !== "featured" && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              Sorted: {sortOption.replace("-", " ")}
              <button
                onClick={() => setSortOption("featured")}
                className="ml-1.5 inline-flex text-purple-400 hover:text-purple-600"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </span>
          )}
          {(priceRange[0] !== 0 || priceRange[1] !== 10000) && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Price: ₹{priceRange[0]} - ₹{priceRange[1]}
              <button
                onClick={() => setPriceRange([0, 10000])}
                className="ml-1.5 inline-flex text-green-400 hover:text-green-600"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </span>
          )}
          <button
            onClick={clearFilters}
            className="ml-2 text-sm text-red-600 hover:text-red-800 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-gray-500">
            {activeFilters > 0
              ? "Try adjusting your filters or search term"
              : "No products available in this category"}
          </p>
          {activeFilters > 0 && (
            <button
              onClick={clearFilters}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <>
          <div className="mb-4  flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            {favorites.length > 0 && (
              <p className="text-sm text-gray-500">
                {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onAddToCart={product.category === "product" ? null : onAddToCart}
                showPrice={product.category !== "product"}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;