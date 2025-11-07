import React from "react";
import { Link } from "react-router-dom";
import "../mainPageAdmin/mainPageAdmin.css";
import Navbar from "../navbarAdminPanel/Navbar";

const MainPageAdmin = () => {
  return (
    <div className="MainPageAdmin">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="containerAdmin">
        <Link to="/adminPanel/create-user" className="createUser">
          Create User
        </Link>
        <Link to="/adminPanel/create-group" className="createGroup">
          Create Group
        </Link>
        <Link to="/adminPanel/manage-group" className="manageGroup">
          Manage Group
        </Link>
        <div className="sendExsel">Send Exsel</div>
        <div className="dataBase">DataBase</div>
      </div>
    </div>
  );
};

export default MainPageAdmin;
