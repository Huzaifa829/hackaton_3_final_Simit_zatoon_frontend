import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ModalAddItem from "./Modal/ModAl_AddItem";
import EditModal from "./Modal/EditedModal"; // Import EditModal
import { getAllItemFromTable } from "../../../supabase DB/supabaseFunctions";
import ItemTable from "./ItemTable/ItemTable";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../../config/redux/reducers/itemsSlice";
import axios from "axios";
import { addUser } from "../../../config/redux/reducers/userSlice";

const ItemsHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.items.itemsProduct);
  const UserSelector = useSelector((state) => state.users.users);

  if (UserSelector.length == 0) {
    axios
    .get("http://localhost:3000/api/users")
    .then((response) => {
      const getalldata = response.data;
      getalldata.map((item) => dispatch(addUser(item)));
    })
    .catch((error) => {
      console.error("There was an error fetching the users:", error);
    });
  }
  
  const getalldata = async () => {
    const getalldata = await getAllItemFromTable("items");
    getalldata.map((item) => dispatch(addItems(item)));
  };
  if (selector.length === 0) {
    getalldata();
  }

  const categories = ["Electronics", "Clothing", "Furniture", "Books", "Accessories"];

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);


  const handleEdit = (item) => {
    console.log('====================================');
    console.log(item);
    console.log('====================================');
    setItemToEdit(item); 
    toggleEditModal(); 
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(`Are you sure you want to delete item ID: ${id}?`);
    if (confirmed) {
      // Implement delete logic
    }
  };

  const handleSaveEdit = (updatedItem) => {
    console.log("Updated Item:", updatedItem);
    // Implement save logic, e.g., update Redux state or database
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search items..."
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow mr-4"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800"
          onClick={toggleModal}
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      <ItemTable users={UserSelector} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Add Item Modal */}
      <ModalAddItem isOpen={isModalOpen} toggleModal={toggleModal} categories={categories} />

      {/* Edit Item Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        toggleModal={toggleEditModal}
        categories={categories}
        item={itemToEdit}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default ItemsHome;
