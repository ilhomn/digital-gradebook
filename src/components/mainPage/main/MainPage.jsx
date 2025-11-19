import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Tabs from "../tabs/Tabs";
import { useNavigate } from "react-router-dom";
import IP from "../../../config";
import Navbar from "../../adminPanel/navbarAdminPanel/Navbar";

function MainPage() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [nameTeacher, setNameTeacher] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await fetch(`${IP}/get-user-data`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (!userRes.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userJson = await userRes.json();
        console.log("Response from /get-user-data:", userJson);

        const userData = Array.isArray(userJson.data)
          ? userJson.data[0]
          : userJson.data || {};

        if (!userData || typeof userData !== "object") {
          throw new Error("Invalid user data format");
        }

        setUserRole(userData.status || "");

        if (userData.status === "teacher") {
          const firstName =
            userData.korean_first_name || userData.first_name || "";
          const lastName =
            userData.korean_last_name || userData.last_name || "";
          setNameTeacher([firstName, lastName].filter(Boolean).join(" "));
        }

        const groupsRes = await fetch(`${IP}/get-groups`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (!groupsRes.ok) {
          throw new Error("Failed to fetch groups");
        }

        const groupsJson = await groupsRes.json();
        console.log("Response from /get-groups:", groupsJson);

        setGroups(groupsJson.data || groupsJson || []);
      } catch (error) {
        console.error("Data loading error:", error);
        alert("Error loading data. Please try again later.");
      }
    };

    fetchData();
  }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  return (
    <div className="main-page">
      <div className="container">
        <div className="top-row">
          {userRole === "admin" && <Navbar />}

          {/* <span className="log-out" onClick={handleLogout}>
            <img
              className="log-img"
              width="39"
              height="39"
              src="/img/icons8-log-out-color-32.png"
              alt="logout"
            />
          </span> */}
        </div>
        {userRole === "teacher" && (
          <h2 className="teacher-groups-title">Your Groups</h2>
        )}
        <Tabs groups={groups} role={userRole} nameTeacher={nameTeacher} />
      </div>
    </div>
  );
}

export default MainPage;
