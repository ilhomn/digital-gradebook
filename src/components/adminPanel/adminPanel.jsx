import React, { useState } from "react";
import IP from "../../config";
import "./adminPanel.css";

function AdminPanel() {
  const [formData, setFormData] = useState({
    englishFirstName: "",
    koreanFirstName: "",
    englishLastName: "",
    koreanLastName: "",
    username: "",
    group: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          englishFirstName: "",
          koreanFirstName: "",
          englishLastName: "",
          koreanLastName: "",
          username: "",
          group: "",
          password: "",
        });
      } else {
        console.error("Registration error");
        alert("Ошибка регистрации!");
      }
    } catch (error) {
      console.error("Error during request:", error);
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
              name="englishFirstName"
              placeholder="English First Name"
              value={formData.englishFirstName}
              onChange={handleChange}
            />

            <label className="label">Korean First Name</label>
            <input
              type="text"
              name="koreanFirstName"
              placeholder="Korean First Name"
              value={formData.koreanFirstName}
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
              name="englishLastName"
              placeholder="English Last Name"
              value={formData.englishLastName}
              onChange={handleChange}
            />

            <label className="label">Korean Last Name</label>
            <input
              type="text"
              name="koreanLastName"
              placeholder="Korean Last Name"
              value={formData.koreanLastName}
              onChange={handleChange}
            />

            <label className="label">Group</label>
            <input
              type="text"
              name="group"
              placeholder="Group"
              value={formData.group}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="inp3">
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default AdminPanel;
