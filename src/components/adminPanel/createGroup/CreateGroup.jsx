import React, { useEffect, useState } from "react";
import "./CreateGroup.css";
import Navbar from "../navbarAdminPanel/Navbar";
import IP from "../../../config";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleCreateGroup = async () => {
    if (!groupName || !teacher || !amount) {
      alert("Хотябы мяу мяу скажи!");
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
          groupName,
          teacher,
          amount: Number(amount),
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
        <select
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        >
          <option value="">Groups</option>
          <option value="세종 1 (초급 1A-1)">세종 1 (초급 1A-1)</option>
          <option value="세종 2 (초급 1B-3)">세종 2 (초급 1B-3)</option>
          <option value="세종 3 (중급 2A-2)">세종 3 (중급 2A-2)</option>
          <option value="세종 4 (중급 2B-1)">세종 4 (중급 2B-1)</option>
        </select>

        <input
          type="text"
          placeholder="Teacher"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
        />

        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleCreateGroup}>Create Group</button>
      </div>
    </div>
  );
};

export default CreateGroup;
