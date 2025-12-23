import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserData } from "../../config";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [role, setRole] = useState("");

  const getUserStatus = async () => {
    const user = await getUserData(token);

    return await user.status;
  };

  useEffect(() => {
    setRole(getUserStatus());
  }, []);

  if (!token) return <Navigate to="/" replace />;
  if (role !== "admin") return <Navigate to="/main-page" replace />;

  return children;
};

export default AdminRoute;
