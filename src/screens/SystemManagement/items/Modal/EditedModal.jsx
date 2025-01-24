import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditModal = ({ isOpen, toggleModal, categories, item, onSave }) => {
  const [formData, setFormData] = useState({
    item_name: '',
    category: '',
    price: '',
    description: '',
    image_url: '',
  });

  const [initialData, setInitialData] = useState(null); // Store the original item data
  const [newImage, setNewImage] = useState(null); // Handle new image upload

  useEffect(() => {
    if (item) {
      const initialForm = {
        item_name: item.item_name || '',
        category: item.category || '',
        price: item.price || '',
        description: item.description || '',
        image_url: item.image_url || '',
      };
      setFormData(initialForm);
      setInitialData(initialForm); // Set initial data for comparison
    } else {
      // Reset form if no item is provided
      setFormData({
        item_name: '',
        category: '',
        price: '',
        description: '',
        image_url: '',
      });
      setInitialData(null);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewImage(imageURL);
    }
  };

  const resetForm = () => {
    setFormData(initialData); // Reset formData to initial values
    setNewImage(null); // Clear the new image
  };

  const isFormChanged = () => {
    if (!initialData) return false; // No changes if initial data is null
    const hasTextChanges = Object.keys(formData).some(
      (key) => formData[key] !== initialData[key],
    );
    return hasTextChanges || newImage !== null;
  };

  const handleSave = () => {
    const updatedData = {
      ...formData,
      image_url: newImage,
      id: item.id || formData.image_url,
    };
    onSave(updatedData); // Pass updated data back to the parent
    resetForm(); // Reset the form after saving
    toggleModal(); // Close the modal
  };

  const handleCancel = () => {
    resetForm(); // Reset the form when cancel is clicked
    toggleModal(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg overflow-auto max-h-full">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold">
              Edit Item - ID: {item?.id || 'N/A'}
            </h3>
            {/* Display item ID dynamically */}
          </div>
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={handleCancel} // Ensure cancel action resets data
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          {/* Image Display and Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Image
            </label>
            <div className="flex items-center gap-4">
              <img
                src={newImage || formData.image_url || '/placeholder-image.png'}
                alt="Item"
                className="w-24 h-24 object-cover rounded border border-gray-300"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border border-gray-300 rounded-lg px-2 py-1"
              />
            </div>
          </div>

          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={`${
              isFormChanged()
                ? 'bg-blue-600 hover:bg-blue-800'
                : 'bg-gray-300 cursor-not-allowed'
            } text-white px-4 py-2 rounded-lg`}
            onClick={handleSave}
            disabled={!isFormChanged()}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
