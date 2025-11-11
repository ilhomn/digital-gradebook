import React, { useEffect, useState } from "react";
import "./CreateUser.css";
import IP from "../../../config";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameKorean, setFullNameKorean] = useState("");
  const [fullNameEnglish, setFullNameEnglish] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch(`${IP}/get-groups`, {
      method: "GET",
      headers: { "Content-Type": "application/json", token },
    })
      .then((res) => res.json())
      .then((data) => setGroups(data.data))
      .catch((err) => console.error("Не удалось получить группы", err));
  }, [token]);

  const handleCreateUser = async () => {
    if (
      !username ||
      !password ||
      !fullNameKorean ||
      !fullNameEnglish ||
      !status ||
      selectedGroups.length === 0
    ) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    try {
      const response = await fetch(`${IP}/create-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({
          username,
          password,
          fullname_korean: fullNameKorean,
          fullname_english: fullNameEnglish,
          groups: selectedGroups,
          status,
        }),
      });

      const data = await response.json();
      alert(data.message || "Пользователь успешно создан!");

      // setUsername("");
      // setPassword("");
      // setFullNameKorean("");
      // setFullNameEnglish("");
      // setSelectedGroups([]);
      // setStatus("");
    } catch (err) {
      console.error(err);
      alert("Ошибка при создании пользователя");
    }
  };

  return (
    <div className="createUserPage">
      <div className="contaiAdmin">
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
          placeholder="Name and Last Name (Korean)"
          value={fullNameKorean}
          onChange={(e) => setFullNameKorean(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name and Last Name (English)"
          value={fullNameEnglish}
          onChange={(e) => setFullNameEnglish(e.target.value)}
        />

        <select
          value=""
          onChange={(e) => {
            const group = e.target.value;
            if (group && !selectedGroups.includes(group)) {
              setSelectedGroups((prev) => [...prev, group]);
            }
          }}
        >
          <option value="" disabled>
            Select group
          </option>
          {groups.map((group, idx) => (
            <option key={idx} value={group.name}>
              {group.name}
            </option>
          ))}
        </select>

        <div className="selectedGroups">
          {selectedGroups.map((group, idx) => (
            <div key={idx} className="groupTag">
              {group}
              <button
                className="removeGroupBtn"
                onClick={() =>
                  setSelectedGroups((prev) => prev.filter((g) => g !== group))
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="" disabled>
            Status
          </option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="sendBtn"
          onClick={handleCreateUser}
          style={{ width: "200px" }}
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
