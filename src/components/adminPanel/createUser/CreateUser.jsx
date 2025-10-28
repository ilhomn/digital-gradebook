import React from "react";
import "./CreateUser.css";
import Navbar from "../navbarAdminPanel/Navbar";

const CreateUser = () => {
  return (
    <div className="createUserPage">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="container">
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Password" />
        <input type="text" placeholder="Name and Last Name" />
        <input type="text" placeholder="Status" />
        <input type="text" placeholder="Group" />
        <button>Create User</button>
      </div>
    </div>
  );
};
export default CreateUser;
