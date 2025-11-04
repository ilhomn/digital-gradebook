import React, { useEffect, useState } from "react";
import "./CreateUser.css";
import Navbar from "../navbarAdminPanel/Navbar";
import IP from "../../../config";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [group, setGroup] = useState("");
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const hendlCreatUser = async () => {
    if (!username || !password || !fullName || !group || !status) {
      alert("Заполните все поля!");
      return;
    }

    try {
      const response = await fetch(`${IP}/create-user`, {
        method: "POST",
        headers: {
          "Conitent-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          username,
          password,
          fullName,
          group,
          status,
        }),
      });

      const data = await response.json();
      alert(data.message || "Пользователь успешно создан!");

      setUsername("");
      setPassword("");
      setFullName("");
      setGroup("");
      setStatus("");
    } catch (err) {
      console.error(err);
      alert("Ошибка при создании пользователя");
    }
  };

  return (
    <div className="createUserPage">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="containAdmin">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name and Last Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Group"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={hendlCreatUser}>Create User</button>
      </div>
    </div>
  );
};

export default CreateUser;
