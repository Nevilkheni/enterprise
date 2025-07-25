
import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition-all">
      <img
        src={product.image}
        alt={product.name || "Product Image"}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">
        {product.name}
      </h3>
      <p className="text-gray-600 text-sm mt-1 mb-2">
        {product.description}
      </p>
      <p className="text-gray-900 font-bold text-lg">
        ₹{Number(product.price).toLocaleString("en-IN")}
      </p>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
