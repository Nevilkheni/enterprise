// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   HeartIcon,
//   ShoppingBagIcon,
//   StarIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";
// import {
//   HeartIcon as HeartIconSolid,
//   XMarkIcon,
// } from "@heroicons/react/24/solid";

// const ShopCard = ({
//   product,
//   onAddToCart,
//   index,
//   onToggleFavorite,
//   isFavorite,
// }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [loadedImages, setLoadedImages] = useState({});
//   const cardRef = useRef(null);

//   const getProductImages = useCallback(() => {
//     if (product.images && product.images.length > 0) {
//       return product.images;
//     }
//     return product.image ? [product.image] : [];
//   }, [product.images, product.image]);

//   const images = getProductImages();

//   const nextImage = useCallback((e) => {
//     if (e) e.stopPropagation();
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   }, [images.length]);

//   const prevImage = useCallback((e) => {
//     if (e) e.stopPropagation();
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   }, [images.length]);

//   const goToImage = useCallback((index, e) => {
//     if (e) e.stopPropagation();
//     setCurrentImageIndex(index);
//   }, []);

//   const handleWhatsAppRedirect = useCallback((e) => {
//     if (e) e.stopPropagation();
    
//     let message = `Hello! I'm interested in this product:\n\n`;
//     message += `*${product.name}*\n\n`;
//     message += `*Price:* ₹${Number(product.price).toLocaleString("en-IN")}\n`;
    
//     if (product.originalPrice) {
//       message += `*Original Price:* ₹${Number(product.originalPrice).toLocaleString("en-IN")}\n`;
//     }
    
//     if (product.discount) {
//       message += `*Discount:* ${product.discount}% OFF\n`;
//     }
    
//     message += `\n*Description:* ${product.description}\n`;
    
//     // Additional product details
//     if (product.length) {
//       message += `*Length:* ${product.length}\n`;
//     }
    
//     if (product.thickness) {
//       message += `*Thickness:* ${product.thickness}\n`;
//     }
    
//     if (product.width) {
//       message += `*Width:* ${product.width}\n`;
//     }
    
//     if (product.material) {
//       message += `*Material:* ${product.material}\n`;
//     }
    
//     if (product.rating) {
//       message += `*Rating:* ${product.rating}/5 (${product.reviewCount || 0} reviews)\n`;
//     }
    
//     message += `\nPlease provide more information about this product.`;
    
//     const encodedMessage = encodeURIComponent(message);
//     const whatsappURL = `https://wa.me/916351091508?text=${encodedMessage}`;
    
//     window.open(whatsappURL, '_blank');
//   }, [product]);

//   useEffect(() => {
//     const currentCardRef = cardRef.current;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(entry.target);
//         }
//       },
//       {
//         threshold: 0.1,
//         rootMargin: "0px 0px -50px 0px",
//       }
//     );

//     if (currentCardRef) {
//       observer.observe(currentCardRef);
//     }

//     return () => {
//       if (currentCardRef) {
//         observer.unobserve(currentCardRef);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//       setCurrentImageIndex(0);
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isModalOpen]);

//   useEffect(() => {
//     if (isModalOpen) {
//       const imagesToPreload = getProductImages();
//       imagesToPreload.forEach((imgSrc, index) => {
//         if (!loadedImages[imgSrc]) {
//           const img = new Image();
//           img.src = imgSrc;
//           img.onload = () => {
//             setLoadedImages(prev => ({ ...prev, [imgSrc]: true }));
//           };
//         }
//       });
//     }
//   }, [isModalOpen, getProductImages, loadedImages]);

//   const handleFavoriteClick = (e) => {
//     e.stopPropagation();
//     if (onToggleFavorite && typeof onToggleFavorite === "function") {
//       onToggleFavorite(product);
//     }
//   };

//   useEffect(() => {
//     let interval;
//     if (isModalOpen && images.length > 1) {
//       interval = setInterval(() => {
//         nextImage();
//       }, 3000); 
//     }
//     return () => clearInterval(interval);
//   }, [isModalOpen, images.length, nextImage]);

//   const closeModal = useCallback(() => {
//     setIsModalOpen(false);
//   }, []);

//   return (
//     <>
//       <div
//         ref={cardRef}
//         className={`rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 transform ${
//           isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//         }`}
//         style={{ transitionDelay: `${index * 50}ms` }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onClick={() => setIsModalOpen(true)}
//       >
//         <div className="relative">
//           <div className="w-full h-60 overflow-hidden">
//             <img
//               src={images[0]}
//               alt={product.name}
//               className="w-full h-full p-4 object-contain hover:scale-105 transition-transform duration-500"
//               loading="lazy"
//             />
//           </div>

//           {images.length > 1 && (
//             <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
//               +{images.length - 1}
//             </div>
//           )}

//           <button
//             onClick={handleFavoriteClick}
//             className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all ${
//               isFavorite
//                 ? "bg-red-100 text-red-500"
//                 : "bg-white text-gray-700 hover:text-red-500"
//             }`}
//             aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
//           >
//             {isFavorite ? (
//               <HeartIconSolid className="h-6 w-6" />
//             ) : (
//               <HeartIcon className="h-6 w-6" />
//             )}
//           </button>

//           {product.discount && (
//             <span className="absolute top-3 left-3 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
//               {product.discount}% OFF
//             </span>
//           )}

//           {isHovered && (
//             <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   if (onAddToCart) onAddToCart(product);
//                 }}
//                 className="hidden sm:flex bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition items-center whitespace-nowrap"
//               >
//                 <ShoppingBagIcon className="h-5 w-5 mr-2" />
//                 Add to Cart
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="p-4">
//           <div className="flex justify-between items-start">
//             <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
//               {product.name}
//             </h3>
//           </div>

//           {product.rating && (
//             <div className="flex items-center mt-1">
//               <div className="flex">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <StarIcon
//                     key={star}
//                     className={`h-4 w-4 ${
//                       star <= Math.round(product.rating)
//                         ? "text-yellow-400 fill-current"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-xs text-gray-500 ml-1">
//                 ({product.reviewCount || 0})
//               </span>
//             </div>
//           )}

//           <p className="text-gray-600 text-sm mt-2 line-clamp-2">
//             {product.description}
//           </p>

//           <div className="mt-3 flex items-center">
//             <p className="text-gray-900 font-bold text-lg">
//               ₹{Number(product.price).toLocaleString("en-IN")}
//             </p>
//             {product.originalPrice && (
//               <p className="text-gray-400 text-sm line-through ml-2">
//                 ₹{Number(product.originalPrice).toLocaleString("en-IN")}
//               </p>
//             )}
//           </div>

//           <div className="mt-4 flex gap-2">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 if (onAddToCart) onAddToCart(product);
//               }}
//               className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center sm:hidden"
//             >
//               <ShoppingBagIcon className="h-5 w-5 mr-2" />
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div 
//           className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4"
//           onClick={closeModal}
//         >
//           <div 
//             className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 z-20 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition"
//             >
//               <XMarkIcon className="h-6 w-6 text-gray-700" />
//             </button>

//             <div className="relative md:w-1/2 h-72 md:h-96 flex items-center justify-center bg-gray-50">
//               {images.length > 0 && (
//                 <>
//                   <div className="w-full h-full flex items-center justify-center">
//                     <img
//                       src={images[currentImageIndex]}
//                       alt={product.name}
//                       className="max-w-full max-h-full object-contain p-4"
//                       onError={(e) => {
//                         e.target.src = "https://via.placeholder.com/400x400?text=Image+Not+Found";
//                       }}
//                     />
//                   </div>
                  
//                   {images.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition z-10"
//                       >
//                         <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
//                       </button>
//                       <button
//                         onClick={nextImage}
//                         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition z-10"
//                       >
//                         <ChevronRightIcon className="h-5 w-5 text-gray-700" />
//                       </button>
//                     </>
//                   )}
                  
//                   {images.length > 1 && (
//                     <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
//                       {images.map((_, index) => (
//                         <button
//                           key={index}
//                           onClick={(e) => goToImage(index, e)}
//                           className={`w-3 h-3 rounded-full transition-all ${
//                             index === currentImageIndex 
//                               ? "bg-red-600 scale-125" 
//                               : "bg-white"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   )}

//                   {images.length > 1 && (
//                     <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded z-10">
//                       {currentImageIndex + 1} / {images.length}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>

//             <div className="p-4 md:p-6 flex-1 overflow-y-auto">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {product.name}
//               </h2>
              
//               {product.rating && (
//                 <div className="flex items-center mt-2">
//                   <div className="flex">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <StarIcon
//                         key={star}
//                         className={`h-5 w-5 ${
//                           star <= Math.round(product.rating)
//                             ? "text-yellow-400 fill-current"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-sm text-gray-500 ml-2">
//                     ({product.reviewCount || 0} reviews)
//                   </span>
//                 </div>
//               )}

//               <p className="text-gray-600 mt-4">{product.description}</p>

//               <div className="mt-4 flex items-center">
//                 <p className="text-gray-900 font-bold text-xl">
//                   ₹{Number(product.price).toLocaleString("en-IN")}
//                 </p>
//                 {product.originalPrice && (
//                   <p className="text-gray-400 text-sm line-through ml-2">
//                     ₹{Number(product.originalPrice).toLocaleString("en-IN")}
//                   </p>
//                 )}
//                 {product.discount && (
//                   <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded-full ml-3">
//                     {product.discount}% OFF
//                   </span>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//                 {product.length && (
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <h3 className="text-sm font-semibold text-gray-700">Length:</h3>
//                     <p className="text-gray-600">{product.length}</p>
//                   </div>
//                 )}

//                 {product.thickness && (
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <h3 className="text-sm font-semibold text-gray-700">Thickness:</h3>
//                     <p className="text-gray-600">{product.thickness}</p>
//                   </div>
//                 )}

//                 {product.width && (
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <h3 className="text-sm font-semibold text-gray-700">Width:</h3>
//                     <p className="text-gray-600">{product.width}</p>
//                   </div>
//                 )}

//                 {product.material && (
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <h3 className="text-sm font-semibold text-gray-700">Material:</h3>
//                     <p className="text-gray-600">{product.material}</p>
//                   </div>
//                 )}
//               </div>

//               <div className="mt-6 flex gap-3 flex-col sm:flex-row">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     if (onAddToCart) onAddToCart(product);
//                     closeModal();
//                   }}
//                   className="flex-1 flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//                 >
//                   <ShoppingBagIcon className="h-5 w-5 mr-2" />
//                   Add to Cart
//                 </button>
                
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleFavoriteClick(e);
//                   }}
//                   className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border ${
//                     isFavorite
//                       ? "bg-red-100 text-red-500 border-red-300"
//                       : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//                   }`}
//                 >
//                   {isFavorite ? (
//                     <HeartIconSolid className="h-5 w-5 mr-2" />
//                   ) : (
//                     <HeartIcon className="h-5 w-5 mr-2" />
//                   )}
//                   {isFavorite ? "Wishlisted" : "Add to Wishlist"}
//                 </button>
//               </div>
              
//               <div className="mt-4">
//                 <button
//                   onClick={handleWhatsAppRedirect}
//                   className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                 >
//                   <InformationCircleIcon className="h-5 w-5 mr-2" />
//                   Get More Details on WhatsApp
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ShopCard;


import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  HeartIcon,
  ShoppingBagIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const ShopCard = ({
  product,
  onAddToCart,
  index,
  onToggleFavorite,
  isFavorite,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const cardRef = useRef(null);

  const placeholderImg =
    "https://via.placeholder.com/400x400?text=No+Image+Available";

  const getProductImages = useCallback(() => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return product.image ? [product.image] : [placeholderImg];
  }, [product.images, product.image]);

  const images = getProductImages();

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToImage = useCallback((index) => {
    setCurrentImageIndex(index);
  }, []);

  const handleWhatsAppRedirect = useCallback(() => {
    let message = `Hello! I'm interested in this product:\n\n`;
    message += `*${product.name}*\n\n`;
    message += `*Price:* ₹${Number(product.price).toLocaleString("en-IN")}\n`;

    if (product.originalPrice) {
      message += `*Original Price:* ₹${Number(
        product.originalPrice
      ).toLocaleString("en-IN")}\n`;
    }

    if (product.discount) {
      message += `*Discount:* ${product.discount}% OFF\n`;
    }

    message += `\n*Description:* ${product.description}\n`;

    if (product.length) {
      message += `*Length:* ${product.length}\n`;
    }
    if (product.thickness) {
      message += `*Thickness:* ${product.thickness}\n`;
    }
    if (product.width) {
      message += `*Width:* ${product.width}\n`;
    }
    if (product.material) {
      message += `*Material:* ${product.material}\n`;
    }
    if (product.rating) {
      message += `*Rating:* ${product.rating}/5 (${
        product.reviewCount || 0
      } reviews)\n`;
    }

    message += `\nPlease provide more information about this product.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/916351091508?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  }, [product]);

  useEffect(() => {
    const currentCardRef = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (currentCardRef) observer.observe(currentCardRef);

    return () => {
      if (currentCardRef) observer.unobserve(currentCardRef);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setCurrentImageIndex(0);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      const imagesToPreload = getProductImages();
      imagesToPreload.forEach((imgSrc) => {
        if (!loadedImages[imgSrc]) {
          const img = new Image();
          img.src = imgSrc;
          img.onload = () => {
            setLoadedImages((prev) => ({ ...prev, [imgSrc]: true }));
          };
        }
      });
    }
  }, [isModalOpen, getProductImages, loadedImages]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite && typeof onToggleFavorite === "function") {
      onToggleFavorite(product);
    }
  };

  useEffect(() => {
    let interval;
    if (isModalOpen && images.length > 1) {
      interval = setInterval(() => {
        nextImage();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isModalOpen, images.length, nextImage]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        className={`rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 50}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative">
          <div className="w-full h-60 overflow-hidden">
            <img
              src={images[0]}
              alt={product.name}
              className="w-full h-full p-4 object-contain hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = placeholderImg;
              }}
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              +{images.length - 1}
            </div>
          )}

          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all ${
              isFavorite
                ? "bg-red-100 text-red-500"
                : "bg-white text-gray-700 hover:text-red-500"
            }`}
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isFavorite ? (
              <HeartIconSolid className="h-6 w-6" />
            ) : (
              <HeartIcon className="h-6 w-6" />
            )}
          </button>

          {product.discount && (
            <span className="absolute top-3 left-3 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {product.name}
            </h3>
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
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 z-20 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition"
            >
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            </button>

            <div className="relative md:w-1/2 h-72 md:h-96 flex items-center justify-center bg-gray-50">
              {images.length > 0 && (
                <>
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={images[currentImageIndex]}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain p-4"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = placeholderImg;
                      }}
                    />
                  </div>

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition z-10"
                      >
                        <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition z-10"
                      >
                        <ChevronRightIcon className="h-5 w-5 text-gray-700" />
                      </button>
                    </>
                  )}

                  {images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            goToImage(index);
                          }}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentImageIndex
                              ? "bg-red-600 scale-125"
                              : "bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="p-4 md:p-6 flex-1 overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800">
                {product.name}
              </h2>

              {product.rating && (
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}

              <p className="text-gray-600 mt-4">{product.description}</p>

              <div className="mt-4 flex items-center">
                <p className="text-gray-900 font-bold text-xl">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>
                {product.originalPrice && (
                  <p className="text-gray-400 text-sm line-through ml-2">
                    ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                  </p>
                )}
                {product.discount && (
                  <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded-full ml-3">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {product.length && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Length:
                    </h3>
                    <p className="text-gray-600">{product.length}</p>
                  </div>
                )}

                {product.thickness && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Thickness:
                    </h3>
                    <p className="text-gray-600">{product.thickness}</p>
                  </div>
                )}

                {product.width && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Width:
                    </h3>
                    <p className="text-gray-600">{product.width}</p>
                  </div>
                )}

                {product.material && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Material:
                    </h3>
                    <p className="text-gray-600">{product.material}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3 flex-col sm:flex-row">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAddToCart) onAddToCart(product);
                    closeModal();
                  }}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteClick(e);
                  }}
                  className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border ${
                    isFavorite
                      ? "bg-red-100 text-red-500 border-red-300"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {isFavorite ? (
                    <HeartIconSolid className="h-5 w-5 mr-2" />
                  ) : (
                    <HeartIcon className="h-5 w-5 mr-2" />
                  )}
                  {isFavorite ? "Wishlisted" : "Add to Wishlist"}
                </button>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <InformationCircleIcon className="h-5 w-5 mr-2" />
                  Get More Details on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopCard;
