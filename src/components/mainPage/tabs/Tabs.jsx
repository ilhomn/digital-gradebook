import React from "react";
import { useNavigate } from "react-router-dom";
import "./Tabs.css";

function Tabs({ groups = [], role = "", nameTeacher = "" }) {
  const navigate = useNavigate();

  const goToStudentsList = (groupId) => {
    navigate("/studentsList", { state: { groupId } });
  };

  if (!groups || groups.length === 0) {
    return <p className="load">Нет групп для отображения</p>;
  }

  return (
    <div className="tabs-container">
      {groups.map((group, index) => (
        <div
          key={index}
          className="tabs"
          onClick={() => goToStudentsList(group.id)}
          style={{ cursor: "pointer" }}
        >
          <span className="group">{group.name}</span>

          <span className="teacher">
            {role === "admin"
              ? `${group.teacher_first_name || ""} ${
                  group.teacher_last_name || ""
                }`
              : nameTeacher || "—"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Tabs;
