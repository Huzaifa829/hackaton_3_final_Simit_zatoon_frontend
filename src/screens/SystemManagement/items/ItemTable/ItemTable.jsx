import React from "react";
import { MoreVertical, Eye, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

const ItemTable = ({ items, onEdit, onDelete, onView }) => {
  return (
    <div className="overflow-x-auto w-full p-4">
      <Table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
        {/* Table Head */}
        <thead>
          <TableRow className="bg-gray-100">
            <TableCell as="th" className="font-bold text-sm text-gray-700 px-4 py-2">
              ID
            </TableCell>
            <TableCell as="th" className="font-bold text-sm text-gray-700 px-4 py-2">
              Item Name
            </TableCell>
            <TableCell as="th" className="font-bold text-sm text-gray-700 px-4 py-2">
              Category
            </TableCell>
            <TableCell as="th" className="font-bold text-sm text-gray-700 px-4 py-2">
              Price
            </TableCell>
            <TableCell as="th" className="font-bold text-sm text-gray-700 px-4 py-2">
              Description
            </TableCell>
            <TableCell as="th" className="font-bold text-sm text-gray-700 px-4 py-2">
              Image
            </TableCell>
            <TableCell as="th" className="font-bold text-sm text-gray-700 px-4 py-2 text-center">
              Actions
            </TableCell>
          </TableRow>
        </thead>

        {/* Table Body */}
        <tbody>
          {items.map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell className="text-sm text-gray-600 px-4 py-2">{item.id}</TableCell>
              <TableCell className="text-sm text-gray-600 px-4 py-2">{item.item_name}</TableCell>
              <TableCell className="text-sm text-gray-600 px-4 py-2">{item.category}</TableCell>
              <TableCell className="text-sm text-gray-600 px-4 py-2">{item.price}</TableCell>
              <TableCell className="text-sm text-gray-600 px-4 py-2 truncate max-w-xs">
                {item.description}
              </TableCell>
              <TableCell className="px-4 py-2">
                <img
                  src={item.image_url}
                  alt={item.item_name}
                  className="w-16 h-16 rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="px-4 py-2 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-gray-600 hover:text-gray-800">
                      <MoreVertical size={18} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-md border rounded-md">
                    <DropdownMenuItem
                      onClick={() => onView(item)}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 px-4 py-2"
                    >
                      <Eye size={16} />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onEdit(item)}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 px-4 py-2"
                    >
                      <Pencil size={16} />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(item.id)}
                      className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-100 px-4 py-2"
                    >
                      <Trash size={16} />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {/* Show message if there are no items */}
      {items.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No items available.</p>
      )}
    </div>
  );
};

export default ItemTable;
