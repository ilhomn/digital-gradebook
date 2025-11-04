import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ManageGroup.css";
import Navbar from "../navbarAdminPanel/Navbar";
import IP from "../../../config";

const ManageGroup = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleDateClick = (date) => {
    const dateStr = date.toDateString();

    if (selectedDates.find((d) => d.toDateString() === dateStr)) {
      setSelectedDates((prev) =>
        prev.filter((d) => d.toDateString() !== dateStr)
      );
    } else {
      setSelectedDates((prev) => [...prev, date]);
    }
  };

  const handleSave = async () => {
    if (!groupName) {
      alert("Введите название группы!");
      return;
    }
    if (selectedDates.length === 0) {
      alert("Выберите хотя бы одну дату!");
      return;
    }

    try {
      const response = await fetch(`${IP}/create-time-slot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          group: groupName,
          dates: selectedDates.map((d) => d.toISOString().slice(0, 10)),
        }),
      });

      const data = await response.json();
      alert(data.message || "Даты успешно сохранены!");
    } catch (err) {
      console.error(err);
      alert("Ошибка отправки данных на сервер");
    }
    console.log(selectedDates);
  };

  return (
    <div className="manageGroupPage">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="container">
        <input
          type="text"
          placeholder="Days of the week"
          className="groupInput"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <div className="calendarContainer">
          <Calendar
            onClickDay={handleDateClick}
            value={new Date()}
            // minDate={new Date()}
            selectRange={false}
            tileClassName={({ date }) =>
              selectedDates.find(
                (d) => d.toDateString() === date.toDateString()
              )
                ? "selected-date"
                : null
            }
          />
        </div>

        <button onClick={handleSave}>Manage Group</button>
      </div>
    </div>
  );
};

export default ManageGroup;
