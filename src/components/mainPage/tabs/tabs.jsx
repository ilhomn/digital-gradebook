import React, { useState, useEffect } from "react";
import IP from "../../../config";
import "./tabs.css";

function Tabs() {
  const [teacher, setTeacher] = useState("");
  const token = localStorage.getItem("token");

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

  return (
    <div className="tabs-container">
      {teacher.groups.map((group, index) => (
        <div key={index} className="tabs">
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
