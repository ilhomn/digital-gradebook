import React from "react";
import "./CreateGroup.css";
import Navbar from "../navbarAdminPanel/Navbar";

const CreateGroup = () => {
  return (
    <div className="createGroupPage">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="container">
        <input type="text" placeholder="User Name" />
        <input type="text" placeholder="Teacher" />
        <input type="text" placeholder="Amount" />
        <button>Create Group</button>
      </div>
    </div>
  );
};
export default CreateGroup;
