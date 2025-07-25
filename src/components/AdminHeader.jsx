import React from "react";
import { NavLink } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header className="bg-gray-800 text-white flex items-center justify-between px-6 py-4 shadow-md">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <nav className="flex gap-6 text-lg">
        <NavLink
          to="/admin/home-data"
          end
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-semibold" : "hover:text-gray-300"
          }
        >
          Home Data
        </NavLink>
        <NavLink
          to="/admin/product-data"
          end
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-semibold" : "hover:text-gray-300"
          }
        >
          Product Data
        </NavLink>
      </nav>
    </header>
  );
};

export default AdminHeader;
