
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import "./index.css";
// import { AuthProvider, useAuth } from "./context/AuthContext";

// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import AdminHeader from "./components/AdminHeader";

// import Home from "./pages/Homee";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Products from "./pages/Products";
// import Cart from "./pages/Cart";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Invoice from "./pages/Invoice";

// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import HomeData from "./pages/Admin/HomeData";
// import ProductData from "./pages/Admin/Productdata";

// import ProtectedRoute from "./routes/ProtectedRoute";

// function AppContent() {
//   const [cart, setCart] = useState(() => {
//     const saved = localStorage.getItem("cart");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const { user } = useAuth(); // make sure this is used INSIDE <AuthProvider>

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const handleAddToCart = (product) => {
//     if (!user) {
//       alert("Please login to add products to cart!");
//       return;
//     }
//     setCart((prev) => {
//       const idx = prev.findIndex((item) => item.id === product.id);
//       if (idx !== -1) {
//         const updated = [...prev];
//         updated[idx].quantity += 1;
//         return updated;
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//     alert(`${product.name} added to cart!`);
//   };

//   const handleRemoveFromCart = (idx) => {
//     setCart((prev) => prev.filter((_, i) => i !== idx));
//   };

//   const handleUpdateQuantity = (idx, quantity) => {
//     setCart((prev) => {
//       const updated = [...prev];
//       if (quantity < 1) return updated;
//       updated[idx].quantity = quantity;
//       return updated;
//     });
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home cart={cart} onAddToCart={handleAddToCart} />} />
//         <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/cart" element={
//           <ProtectedRoute>
//             <Cart
//               cart={cart}
//               onRemoveFromCart={handleRemoveFromCart}
//               onUpdateQuantity={handleUpdateQuantity}
//             />
//           </ProtectedRoute>
//         } />
//         <Route path="/invoice" element={<Invoice />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Admin Routes */}
//         <Route path="/admin" element={
//           <ProtectedRoute isAdmin={true}>
//             <AdminDashboard />
//           </ProtectedRoute>
//         } />
//         <Route path="/admin/home-data" element={
//           <ProtectedRoute isAdmin={true}>
//             <>
//               <AdminHeader />
//               <HomeData />
//             </>
//           </ProtectedRoute>
//         } />
//         <Route path="/admin/product-data" element={
//           <ProtectedRoute isAdmin={true}>
//             <>
//               <AdminHeader />
//               <ProductData />
//             </>
//           </ProtectedRoute>
//         } />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }

// function App() {
//   return (
//     <React.StrictMode>
//       <AuthProvider>
//         <Router>
//           <AppContent />
//         </Router>
//       </AuthProvider>
//     </React.StrictMode>
//   );
// }

// export default App;
// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminHeader from "./components/AdminHeader";

// Import pages
import Home from "./pages/Homee";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Invoice from "./pages/Invoice";

// Admin pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import HomeData from "./pages/Admin/HomeData";
import ProductData from "./pages/Admin/Productdata";

import ProtectedRoute from "./routes/ProtectedRoute";

function AppContent() {
  const { user, cart, updateCart } = useAuth();

  const handleAddToCart = async (product) => {
    if (!user) {
      alert("Please login to add products to cart!");
      return;
    }

    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    let newCart;

    if (existingItemIndex !== -1) {
      newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    await updateCart(newCart);
    alert(`${product.name} added to cart!`);
  };

  const handleRemoveFromCart = async (idx) => {
    const newCart = cart.filter((_, i) => i !== idx);
    await updateCart(newCart);
  };

  const handleUpdateQuantity = async (idx, quantity) => {
    if (quantity < 1) return;
    
    const newCart = [...cart];
    newCart[idx].quantity = quantity;
    await updateCart(newCart);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home cart={cart} onAddToCart={handleAddToCart} />} />
        <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart
              cart={cart}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </ProtectedRoute>
        } />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute isAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/home-data" element={
          <ProtectedRoute isAdmin={true}>
            <>
              <AdminHeader />
              <HomeData />
            </>
          </ProtectedRoute>
        } />
        <Route path="/admin/product-data" element={
          <ProtectedRoute isAdmin={true}>
            <>
              <AdminHeader />
              <ProductData />
            </>
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;