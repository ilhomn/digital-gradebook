import React from "react";
import "./ManageGroup.css";
import Navbar from "../navbarAdminPanel/Navbar";

const ManageGroup = () => {
  return (
    <div className="manageGroupPage">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="container">
        <input type="number" placeholder="Day" />
        <input type="text" placeholder="Group" />
        <button>Manage Group</button>
      </div>
    </div>
  );
};
export default ManageGroup;
