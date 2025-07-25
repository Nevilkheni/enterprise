import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div
          className="text-3xl font-extrabold text-blue-600 tracking-tight cursor-pointer"
          onClick={() => navigate("/")}
        >
          Tech <span className="text-gray-800">Enterprise</span>
        </div>

        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="hidden gap-4 md:flex items-center">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
            onClick={() => navigate("/cart")}
          >
            Cart
          </button>
        </div>

        <div className="md:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                className="text-left text-gray-700 font-medium hover:text-blue-600 transition"
              >
                {item.name}
              </button>
            ))}

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Login
              </button>
            )}

            <button
              onClick={() => {
                navigate("/cart");
                setMenuOpen(false);
              }}
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Cart
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
