import React, { useEffect, useState } from "react";
import Navbar from "../components/adminPanel/navbarAdminPanel/Navbar";
import "./PageLayout.css";
import { getUserData } from "../config";

const PageLayout = ({ children }) => {
  const token = window.localStorage.getItem("token");
  const [userRole, setUserRole] = useState("");

  const getUserStatus = async () => {
    const user = await getUserData(token);

    return await user.status;
  };

  useEffect(() => {
    const role = getUserStatus();
    if (role) setUserRole(role);
  }, []);

  return (
    <div className="page-layout">
      {userRole === "admin" && <Navbar />}
      <div className="page-content">{children}</div>
    </div>
  );
};

export default PageLayout;
