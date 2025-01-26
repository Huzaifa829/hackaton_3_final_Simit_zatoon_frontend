import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { firebaseLogin } from "../../firebaseDB/firebaseFunction.js";

// Validation Schema for Login
const loginSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Authentication = () => {
  const [loading, setLoading] = useState(false); // Loader state
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

 

  const onSubmit = async (data) => {
    setLoading(true);
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    setError(""); // Reset error
    try {
      const { email, password } = data;
  
      // Make a POST request to your login API using axios
      const response = await axios.post("http://localhost:3000/api/users/login/", {
        email: email,
        password: password,
      });
  
      // If login is successful, handle the response
      console.log(response.data); // Handle the response data as needed
      alert("Login Successful!");
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
          >
            {loading ? (
              <div className="loader border-t-transparent border-4 border-white rounded-full w-5 h-5 animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Authentication;
