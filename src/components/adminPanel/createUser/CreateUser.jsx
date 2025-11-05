import React, { useEffect, useState } from "react";
import "./CreateUser.css";
import Navbar from "../navbarAdminPanel/Navbar";
import IP from "../../../config";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return;

    fetch(`${IP}/get-groups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: storedToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setGroups(data.data))
      .catch((err) => console.error("Не удалось получить группы", err));
  }, []);

  const handleCreateUser = async () => {
    if (!username || !password || !fullName || !status) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    try {
      const response = await fetch(`${IP}/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          username,
          password,
          fullname: fullName,
          groupName,
          status,
        }),
      });

      const data = await response.json();
      alert(data.message || "Пользователь успешно создан!");

      setUsername("");
      setPassword("");
      setFullName("");
      setGroupName("");
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

        <select
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        >
          <option value="">Groups</option>
          {groups.length > 0 ? (
            groups.map((group, idx) => (
              <option key={idx} value={group.name}>
                {group.name}
              </option>
            ))
          ) : (
            <option disabled>Не удалось получить группы</option>
          )}
        </select>

        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="" disabled>
            Status
          </option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleCreateUser}>Create User</button>
      </div>
    </div>
  );
};

export default CreateUser;
