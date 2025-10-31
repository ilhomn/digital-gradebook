import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../mainPageAdmin/mainPageAdmin.css";
import Navbar from "../navbarAdminPanel/Navbar";
import IP from "../../../config";

const MainPageAdmin = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`${IP}/get-all-groups`, {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const { data } = await response.json();
          setGroups(data);
        } else {
          console.error("Failed to fetch groups");
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const goToStudentsList = (group) => {
    navigate(`/studentsList?group=${group}`);
  };

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
        <div className="dataBase">Data Base</div>
      </div>
      <div className="groups-container">
        {groups.map((group, index) => (
          <div
            key={index}
            className="group-card"
            onClick={() => goToStudentsList(group.name)}
          >
            <span className="group-name">{group.name}</span>
            {/* Add more group details if available */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPageAdmin;
