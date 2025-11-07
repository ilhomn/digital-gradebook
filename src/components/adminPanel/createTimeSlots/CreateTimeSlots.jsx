import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CreateTimeSlots.css";
import Navbar from "../navbarAdminPanel/Navbar";
import IP from "../../../config";

const CreateTimeSlots = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [days, setDays] = useState("");
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
    if (!days) {
      alert("Хотя бы укажи день!");
      return;
    }
    if (selectedDates.length === 0) {
      alert("Выберите хотя бы одну дату!");
      return;
    }

    const datesToSend = selectedDates.map((d) =>
      parseInt(d.toISOString().slice(0, 10).replace(/-/g, ""))
    );

    console.log("Отправляемые даты:", datesToSend, "Days:", days);

    try {
      const response = await fetch(`${IP}/create-timeslot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          name: days,
          timeslot: datesToSend,
        }),
      });

      const data = await response.json();
      alert(data.message || "Даты успешно сохранены!");
    } catch (err) {
      console.error(err);
      alert("Ошибка отправки данных на сервер");
    }
  };

  return (
    <div className="manageGroupPage">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="containAdmin">
        <input
          type="text"
          placeholder="Days of the week"
          className="groupInput"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <div className="calendarContainer">
          <Calendar
            onClickDay={handleDateClick}
            value={new Date()}
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

        <button onClick={handleSave}>Create time Slots</button>
      </div>
    </div>
  );
};

export default CreateTimeSlots;
