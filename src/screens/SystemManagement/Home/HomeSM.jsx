import React from "react";
import { Outlet, Link } from "react-router-dom";
import { LayoutDashboard, Menu } from "lucide-react";

const HomeSM = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">System Management</h1>
      <nav className="flex gap-4 mb-6">
        <Link
          to="dashboard"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link
          to="menu"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Menu size={20} /> Menu
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default HomeSM;
