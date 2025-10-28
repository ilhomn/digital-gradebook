import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ← импортируем navigate
import IP from "../../../config";
import "./Tabs.css";

function Tabs() {
  const [teacher, setTeacher] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // ← создаём navigate

  useEffect(() => {
    fetch(`${IP}/get-user-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User data:", data);
        if (data.data && data.data.length > 0) {
          setTeacher(data.data[0]);
        }
      });
  }, [token]);

  if (!teacher) {
    return <p className="load">Loading...</p>;
  }

  // Обработчик клика на вкладку
  const goToStudentsList = () => {
    navigate("/studentsList");
  };

  return (
    <div className="tabs-container">
      {teacher.groups.map((group, index) => (
        <div
          key={index}
          className="tabs"
          onClick={goToStudentsList} // ← добавляем клик
          style={{ cursor: "pointer" }} // чтобы курсор менялся на pointer
        >
          <span className="group">{group}</span>
          <span className="teacher">
            {teacher.korean_first_name} {teacher.korean_last_name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Tabs;
