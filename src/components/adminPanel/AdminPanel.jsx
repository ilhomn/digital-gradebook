import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbarAdminPanel/Navbar";

const AdminPanel = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdminPanel;
