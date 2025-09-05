import React, { lazy, Suspense, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import WhatsAppButton from "./components/WhatsAppButton";
import { useProducts } from "./hooks/productHooks";

// Lazy-loaded pages
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Invoice = lazy(() => import("./pages/Invoice"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const Category = lazy(() => import("./pages/category"));
const Shop = lazy(() => import("./pages/shop"));
const Home = lazy(() => import("./pages/home"));
const AllProducts = lazy(() => import("./pages/allproduct"));
const Payment = lazy(() => import("./pages/Payment"));
const VerifyEmail = lazy(() => import("./components/VerifyEmail"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));

function AppContent() {
  const { user, cart, updateCart } = useAuth();
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/register"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  const { products, loading } = useProducts();

  // ✅ Add to Cart
  const handleAddToCart = useCallback(
    async (product) => {
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
    },
    [user, cart, updateCart]
  );

  // ✅ Remove from Cart
  const handleRemoveFromCart = useCallback(
    async (idx) => {
      const newCart = cart.filter((_, i) => i !== idx);
      await updateCart(newCart);
    },
    [cart, updateCart]
  );

  // ✅ Update Quantity
  const handleUpdateQuantity = useCallback(
    async (idx, quantity) => {
      if (quantity < 1) return;

      const newCart = [...cart];
      newCart[idx].quantity = quantity;
      await updateCart(newCart);
    },
    [cart, updateCart]
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {!shouldHideFooter && <Header />}
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
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
              element={<Category productCount={products.length} loading={loading} />}
            />
            <Route path="/category/:categoryType" element={<Category />} />
            <Route path="/allproducts" element={<AllProducts onAddToCart={handleAddToCart} />} />
            <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
            <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Protected Routes */}
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
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </main>
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
