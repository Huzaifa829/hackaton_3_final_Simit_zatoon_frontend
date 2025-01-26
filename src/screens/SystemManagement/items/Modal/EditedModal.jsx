import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const EditModal = ({ isOpen, toggleModal, item, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roles: [],  // Changed to an array to handle multiple roles
  });

  const [initialData, setInitialData] = useState(null); // Store the original item data
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (item) {
      const initialForm = {
        name: item.name || '',
        email: item.email || '',
        roles: item.roles || [], // Handle roles as an array
      };
      setFormData(initialForm);
      setInitialData(initialForm); // Set initial data for comparison
    } else {
      // Reset form if no item is provided
      setFormData({
        name: '',
        email: '',
        roles: [],
      });
      setInitialData(null);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => {
      const roles = prev.roles.includes(value)
        ? prev.roles.filter((role) => role !== value) // Remove role if already selected
        : [...prev.roles, value]; // Add role if not selected
      return { ...prev, roles: roles };
    });
  };

  const resetForm = () => {
    setFormData(initialData); // Reset formData to initial values
  };

  const isFormChanged = () => {
    if (!initialData) return false; // No changes if initial data is null
    return (
      formData.name !== initialData.name ||
      formData.email !== initialData.email ||
      !arraysEqual(formData.roles, initialData.roles)
    );
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // Prepare the updated data
      const updatedData = {
        name: formData.name,
        email: formData.email,
        roles: formData.roles, // Send roles as an array
      };

      console.log('Updated data:', updatedData);
      console.log('Updated data:', item._id);
      
      // Call the API to update the user data
      const response = await axios.put(
        `https://hackaton-3-final-simit-zatoon-backend.vercel.app/${item._id}`,
        updatedData
      );

      // Call onSave callback after successful update
      onSave(response.data.user);
      resetForm(); // Reset the form after saving
      toggleModal(); // Close the modal
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating user:', error);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm(); // Reset the form when cancel is clicked
    toggleModal(); // Close the modal
  };

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg overflow-auto max-h-full">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold">Edit User - ID: {item?._id || 'N/A'}</h3>
          </div>
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={handleCancel}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Roles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Roles</label>
            <div className="space-y-2">
              <label>
                <input
                  type="checkbox"
                  value="Admin"
                  checked={formData.roles.includes('Admin')}
                  onChange={handleRoleChange}
                  className="mr-2"
                />
                Admin
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Receptionist"
                  checked={formData.roles.includes('Receptionist')}
                  onChange={handleRoleChange}
                  className="mr-2"
                />
                Receptionist
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Department Staff"
                  checked={formData.roles.includes('Department Staff')}
                  onChange={handleRoleChange}
                  className="mr-2"
                />
                Department Staff
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Beneficiary"
                  checked={formData.roles.includes('Beneficiary')}
                  onChange={handleRoleChange}
                  className="mr-2"
                />
                Beneficiary
              </label>
            </div>
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
            disabled={!isFormChanged() || isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
