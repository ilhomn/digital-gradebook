import React, { useState } from "react";
import { Link } from "react-router-dom";
import IP from "../../../config";
import "../mainPageAdmin/mainPageAdmin.css";
import ConfirmModal from "./ConfirmModal";

const MainPageAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDropDataBase = () => {
    setIsModalOpen(true);
  };

  const confirmDropDataBase = async () => {
    setIsModalOpen(false);
    setLoading(true);
    try {
      const response = await fetch(`${IP}/drop-database`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: window.localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to drop database");
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error dropping database:", error);
      alert("Error dropping database. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        <div className="dataBase" onClick={handleDropDataBase}>
          {loading ? "Dropping..." : "Drop DataBase"}
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDropDataBase}
        message="Are you sure you want to drop the entire database? This action cannot be undone."
      />
    </div>
  );
};

export default MainPageAdmin;
