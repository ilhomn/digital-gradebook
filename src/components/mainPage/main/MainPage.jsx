import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Tabs from "../tabs/Tabs";
import { useNavigate } from "react-router-dom";
import IP from "../../../config";

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

        if (!userRes.ok)
          throw new Error("Не удалось получить данные пользователя");

        const userJson = await userRes.json();
        console.log("Ответ от /get-user-data:", userJson);

        const userData = userJson.data ? userJson.data[0] : {};
        setUserRole(userData.status || "");

        if (userData.status === "teacher") {
          const firstName =
            userData.korean_first_name || userData.first_name || "";
          const lastName =
            userData.korean_last_name || userData.last_name || "";
          setNameTeacher([firstName, lastName].filter(Boolean).join(" "));
        }

        const groupsEndpoint = "/get-all-groups";

        const groupsRes = await fetch(`${IP}${groupsEndpoint}`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (!groupsRes.ok) throw new Error("Не удалось получить группы");

        const groupsJson = await groupsRes.json();
        console.log("Ответ от сервера групп:", groupsJson);

        setGroups(groupsJson.data || groupsJson || []);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        alert("Ошибка при загрузке данных");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="main-page">
      <div className="container">
        <span className="log-out" onClick={handleLogout}>
          <img
            className="log-img"
            width="39"
            height="39"
            src="/img/icons8-log-out-color-32.png"
            alt="exit"
          />
        </span>

        <Tabs groups={groups} role={userRole} nameTeacher={nameTeacher} />
      </div>
    </div>
  );
}

export default MainPage;
