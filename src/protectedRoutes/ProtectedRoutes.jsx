import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseDB/config.js";

const ProtectedRoutes = ({ component }) => {
  const [isUser, setIsUser] = useState(null); // Use `null` to handle initial loading state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
      } else {
        setIsUser(false);
        navigate("/auth"); // Redirect to the login page if not authenticated
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [navigate]);

  if (isUser === null) {
    // Show a loading state while checking authentication
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Spinning Loader */}
        <div className="w-16 h-16 border-4 border-gray-300 border-t-[#462865] rounded-full animate-spin"></div>
        {/* Heading */}
        <h1 className="mt-4 text-lg font-semibold text-gray-800">
          Huzaifa Ahmed Final Hackathon Simit Batch 11
        </h1>
      </div>
    );
  }

  // Render the component if the user is authenticated
  return isUser ? component : null;
};

export default ProtectedRoutes;
