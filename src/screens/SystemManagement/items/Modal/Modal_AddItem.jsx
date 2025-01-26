import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../../../../config/redux/reducers/userSlice.js";

const Modal = ({ isOpen, toggleModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roles: [], // Array to store selected roles
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // List of available roles
  const availableRoles = ["Admin", "Receptionist", "Department Staff", "Beneficiary"];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle role selection
  const handleRoleChange = (e) => {
    const { value, checked } = e.target;

    if (value === "Admin" && checked) {
      // If "Admin" is selected, add all roles
      setFormData((prev) => ({ ...prev, roles: availableRoles }));
    } else if (value === "Admin" && !checked) {
      // If "Admin" is deselected, remove all roles
      setFormData((prev) => ({ ...prev, roles: [] }));
    } else {
      // Add or remove roles for other selections
      setFormData((prev) => ({
        ...prev,
        roles: checked
          ? [...prev.roles, value]
          : prev.roles.filter((role) => role !== value),
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (formData.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters long.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (formData.password.trim().length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
    if (formData.roles.length === 0)
      newErrors.roles = "Please select at least one role.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSave = async () => {
    if (!validateForm()) return;

    console.log('====================================');
    console.log(formData);
    console.log('====================================');
    setIsLoading(true);
    try {
      // Send POST request to the backend API to create a new user
      const response = await axios.post("https://hackaton-3-final-simit-zatoon-backend.vercel.app/api/users", formData);

      // If successful, dispatch action to Redux and alert the user
      dispatch(addUser(response.data.user));
      alert("User added successfully!");
      console.log(response.data.user);
      toggleModal();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Add New User</h3>
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={toggleModal}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <h4 className="font-bold mb-2">Select Roles</h4>
            {availableRoles.map((role) => (
              <div key={role} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={role}
                  value={role}
                  checked={formData.roles.includes(role)}
                  onChange={handleRoleChange}
                  className="mr-2"
                />
                <label htmlFor={role} className="text-gray-700">
                  {role}
                </label>
              </div>
            ))}
            {errors.roles && (
              <p className="text-red-500 text-sm">{errors.roles}</p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={toggleModal}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 flex items-center"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading && (
              <span className="loader mr-2 border-t-transparent border-4 border-white rounded-full w-4 h-4 animate-spin"></span>
            )}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
