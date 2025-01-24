import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Box, Tag, Gift, ClipboardList } from "lucide-react";

const MenuHome = () => {
  return (
    <div>
      <nav className="flex gap-4 mb-6">
        <Link
          to="items"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          <Box size={20} /> Items
        </Link>
        <Link
          to="categories"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          <Tag size={20} /> Categories
        </Link>
        <Link
          to="offers"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          <Gift size={20} /> Offers
        </Link>
        <Link
          to="vouchers"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          <ClipboardList size={20} /> Vouchers
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MenuHome;
