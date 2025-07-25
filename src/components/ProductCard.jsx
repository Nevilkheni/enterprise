import React, { useState, useEffect, useRef } from "react";
import { HeartIcon, ShoppingBagIcon, StarIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const ProductCard = ({ product, onAddToCart, index }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } transition-transform duration-500 ease-out`}
      style={{ transitionDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name || "Product Image"}
          className="w-full h-60 object-cover hover:scale-105 transition-transform duration-500"
        />
        
        {/* <button
          onClick={handleAddToWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all ${
            isWishlisted 
              ? "bg-red-100 text-red-500" 
              : "bg-white text-gray-700 hover:text-red-500"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <HeartIconSolid className="h-6 w-6" />
          ) : (
            <HeartIcon className="h-6 w-6" />
          )}
        </button> */}

        {isHovered && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center whitespace-nowrap"
          >
            <ShoppingBagIcon className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          {product.discount && (
            <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {product.rating && (
          <div className="flex items-center mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-3 flex items-center">
          <p className="text-gray-900 font-bold text-lg">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>
          {product.originalPrice && (
            <p className="text-gray-400 text-sm line-through ml-2">
              ₹{Number(product.originalPrice).toLocaleString("en-IN")}
            </p>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center sm:hidden"
        >
          <ShoppingBagIcon className="h-5 w-5 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;