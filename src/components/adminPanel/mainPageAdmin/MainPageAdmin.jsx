import React from "react";
import { Link } from "react-router-dom";
import "../mainPageAdmin/mainPageAdmin.css";

const MainPageAdmin = () => {
  return (
    <div className="MainPageAdmin">
      <div className="containerAdmin">
        <Link to="/admin-panel/create-user" className="createUser">
          Create User
        </Link>
        <Link to="/admin-panel/create-group" className="createGroup">
          Create Group
        </Link>
        <Link to="/admin-panel/manage-group" className="manageGroup">
          Create Time Slots
        </Link>
        <Link to="/admin-panel/upload-students" className="dataBase">
          Upload Students
        </Link>
        <div className="dataBase">DataBase</div>
      </div>
    </div>
  );
};

export default MainPageAdmin;
