import React, { useEffect, useState } from "react";
import "./CreateGroup.css";
import Navbar from "../navbarAdminPanel/Navbar";
import IP from "../../../config";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);
  useEffect(() => {
    if (!token) return;

    fetch(`${IP}/get-timeslots`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTimeSlots(data.data);
        console.log(data);
      })
      .catch((err) => console.error("Не удалось получить таймслоты", err));
  }, [token]);

  const handleCreateGroup = async () => {
    if (!selectedTimeSlot || !teacher || !amount) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    try {
      const response = await fetch(`${IP}/create-group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          name: groupName,
          teacher,
          amount: Number(amount),
          timeSlot: selectedTimeSlot,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ошибка сервера:", response.status, errorText);
        alert("Ошибка при создании группы");
        return;
      }

      const data = await response.json();
      alert(data.message || "Группа успешно создана!");

      setGroupName("");
      setTeacher("");
      setAmount("");
      setSelectedTimeSlot("");
    } catch (err) {
      console.error(err);
      alert("Ошибка при создании группы");
    }
  };

  return (
    <div className="createGroupPage">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="containAdmin">
        <input
          placeholder="Group Name"
          className="groupname"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <select
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
        >
          <option value="">Time slots</option>
          {timeSlots.length > 0 ? (
            timeSlots.map((slot, idx) => (
              <option key={idx} value={slot}>
                {slot.name}
              </option>
            ))
          ) : (
            <option disabled>Не удалось получить таймслоты</option>
          )}
        </select>

        <input
          type="text"
          placeholder="Teacher"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
        />

        <input
          type="text"
          placeholder="Number of Students"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleCreateGroup}>Create Group</button>
      </div>
    </div>
  );
};

export default CreateGroup;
``;
