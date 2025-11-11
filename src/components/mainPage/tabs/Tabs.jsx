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
          <span className="teacher">{group.teacher}</span>
          {/* {console.log(group._name)} */}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
