import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Tabs.css";

function Tabs({ groups }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(groups);
  }, [groups]);

  const goToStudentsList = (groupId) => {
    navigate("/students-list/" + groupId);
  };

  if (!groups) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <p className="load" style={{ display: "flex" }}>
        You don`t have group
      </p>
    );
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
          <span className="teacher">{group.teacher}</span>
        </div>
      ))}
    </div>
  );
}

export default Tabs;
