import React from "react";
import { Navigate } from "react-router-dom";
import { useLogin } from "./LoginContext"; // Assuming you're using useLogin based on previous context

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useLogin(); // Use the useLogin hook to check if the user is logged in

  return isLoggedIn ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;
