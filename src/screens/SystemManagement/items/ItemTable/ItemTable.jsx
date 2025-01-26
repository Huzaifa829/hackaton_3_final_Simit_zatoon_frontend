import React from "react";
import { MoreVertical, Eye, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto w-full p-4">
      <Table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
        {/* Table Head */}
        <thead>
          <TableRow className="bg-gray-100">
            <TableCell as="th" className="font-bold text-sm text-gray-700 px-4 py-2">
              Name
            </TableCell>
            <TableCell as="th" className="font-bold text-sm text-gray-700 px-4 py-2">
              Email
            </TableCell>
            <TableCell as="th" className="font-bold text-sm text-gray-700 px-4 py-2">
              Role
            </TableCell>
            <TableCell as="th" className="font-bold text-sm text-gray-700 px-4 py-2 text-center">
              Actions
            </TableCell>
          </TableRow>
        </thead>

        {/* Table Body */}
        <tbody>
          {users.map((user, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell className="text-sm text-gray-600 px-4 py-2">{user.name}</TableCell>
              <TableCell className="text-sm text-gray-600 px-4 py-2">{user.email}</TableCell>
              <TableCell className="text-sm text-gray-600 px-4 py-2">
                {user.roles && user.roles.length > 0
                  ? user.roles.join(', ') // Display roles as a comma-separated list
                  : 'No Role Assigned'}
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
                      onClick={() => onEdit(user)}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 px-4 py-2"
                    >
                      <Pencil size={16} />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(user._id)} // Use user._id for deletion
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
      {/* Show message if there are no users */}
      {users.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No users available.</p>
      )}
    </div>
  );
};

export default UserTable;
