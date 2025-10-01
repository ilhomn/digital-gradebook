import React, { useState } from "react";
import IP from "../../config";
import "./adminPanel.css";

function AdminPanel() {
  const [formData, setFormData] = useState({
    english_first_name: "",
    korean_first_name: "",
    english_last_name: "",
    korean_last_name: "",
    username: "",
    groups: [], // 👈 заменили group на groups
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Если меняем поле groups, преобразуем в массив (по запятой)
    if (name === "groups") {
      setFormData({
        ...formData,
        [name]: value
          .split(",")
          .map((g) => g.trim())
          .filter(Boolean),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${IP}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        alert("Пользователь успешно зарегистрирован!");
        setFormData({
          english_first_name: "",
          korean_first_name: "",
          english_last_name: "",
          korean_last_name: "",
          username: "",
          groups: [],
          password: "",
        });
      } else {
        console.error("Registration error");
        alert("Ошибка регистрации!");
      }
    } catch (error) {
      console.error("Error during request:", error);
      alert("Ошибка соединения с сервером!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="adminPanel">
      <div className="container">
        <span className="title">Admin Panel</span>

        <div className="row">
          <div className="inp1">
            <label className="label">English First Name</label>
            <input
              type="text"
              name="english_first_name"
              placeholder="English First Name"
              value={formData.english_first_name}
              onChange={handleChange}
            />

            <label className="label">Korean First Name</label>
            <input
              type="text"
              name="korean_first_name"
              placeholder="Korean First Name"
              value={formData.korean_first_name}
              onChange={handleChange}
            />

            <label className="label">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="inp2">
            <label className="label">English Last Name</label>
            <input
              type="text"
              name="english_last_name"
              placeholder="English Last Name"
              value={formData.english_last_name}
              onChange={handleChange}
            />

            <label className="label">Korean Last Name</label>
            <input
              type="text"
              name="korean_last_name"
              placeholder="Korean Last Name"
              value={formData.korean_last_name}
              onChange={handleChange}
            />

            <label className="label">Groups (comma separated)</label>
            <input
              type="text"
              name="groups"
              placeholder="e.g. A, B, C"
              value={formData.groups.join(", ")}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="inp3 password-wrapper">
          <label className="label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default AdminPanel;
