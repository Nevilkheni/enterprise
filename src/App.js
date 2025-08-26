import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import AdminHeader from "./components/AdminHeader";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Invoice from "./pages/Invoice";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Category from "./pages/category";
import Shop from "./pages/shop";
import Home from "./pages/home";
import WhatsAppButton from "./components/WhatsAppButton";
import AllProducts from "./pages/allproduct";
import Payment from "./pages/Payment";
import { useProducts } from "./hooks/productHooks";
import VerifyEmail from "./components/VerifyEmail";


function AppContent() {
  const { user, cart, updateCart } = useAuth();
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/register"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  const { products, loading } = useProducts();

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
      {!shouldHideFooter && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              onAddToCart={handleAddToCart}
              productCount={products.length}
            />
          }
        />
        <Route
          path="/category"
          element={
            <Category
              productCount={products.length}
              loading={loading}
            />
          }
        />
        <Route
          path="/allproducts"
          element={
            <AllProducts
              onAddToCart={handleAddToCart}
            />
          }
        />
        <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
        <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryType" element={<Category />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart
                cart={cart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment cart={cart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoice"
          element={
            <ProtectedRoute>
              <Invoice cart={cart} />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute isAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!shouldHideFooter && <Footer />}
      <WhatsAppButton />
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