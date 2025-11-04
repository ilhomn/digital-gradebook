import React, { useEffect, useState } from "react";
import "./CreateGroup.css";
import Navbar from "../navbarAdminPanel/Navbar";
import IP from "../../../config";
const CreateGroup = () => {
  const [gropName, setGroupName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleCreatGroup = async () => {
    if (!gropName || !teacher || !amount) {
      alert("Заполните все поля!");
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
          gropName,
          teacher,
          amount: Number(amount),
        }),
      });
      const data = await response.JSON();
      alert(data.message || "Групаа успешно создана!");
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
        <input
          type="text"
          placeholder="Group name"
          value={gropName}
          onChange={(e) => setGroupName(e.target.value)}
        />
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
        <button onClick={handleCreatGroup}>Create Group</button>
      </div>
    </div>
  );
};
export default CreateGroup;
