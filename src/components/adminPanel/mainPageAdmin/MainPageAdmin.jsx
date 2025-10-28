import React from "react";
import "../mainPageAdmin/mainPageAdmin.css";
import Navbar from "../navbarAdminPanel/Navbar";

const MainPageAdmin = () => {
  return (
    <div className="MainPageAdmin">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="container">
        <div className="createUser">Create User</div>
        <div className="createGroup">Create Group</div>
        <div className="manageGroup">Manage Group</div>
        <div className="sendExsel">Send Exsel</div>
        <div className="dataBase">Data Base</div>
      </div>
    </div>
  );
};
export default MainPageAdmin;
