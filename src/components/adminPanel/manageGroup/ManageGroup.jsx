import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // стили календаря
import "./ManageGroup.css";
import Navbar from "../navbarAdminPanel/Navbar";

const ManageGroup = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // состояние выбранной даты

  return (
    <div className="manageGroupPage">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="container">
        <input type="text" placeholder="Group" className="groupInput" />

        {/* Календарь */}
        <div className="calendarContainer">
          <Calendar
            onChange={setSelectedDate} // обновляем выбранную дату
            value={selectedDate} // текущее значение
            minDate={new Date()} // запрет выбора прошлых дат
            view="month" // показываем один месяц
          />
        </div>

        {/* Кнопка */}
        <button onClick={() => console.log("Selected date:", selectedDate)}>
          Manage Group
        </button>
      </div>
    </div>
  );
};

export default ManageGroup;
