import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IP, { getUserData } from "../../config";
import "./login.css";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${IP}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: login, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);

          const userData = await getUserData(data.token);
          console.log(userData);

          if (userData.status === "teacher") {
            navigate("/mainPage");
          } else if (userData.status === "admin") {
            navigate("/adminPanel");
          } else {
            alert("Неизвестная роль пользователя");
          }
        }
      } else {
        console.error("Login failed");
        alert("Неверный логин или пароль");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Ошибка при авторизации");
    }
  };

  useEffect(() => {
    // Clear any lingering token when the login page loads
    localStorage.removeItem("token");
  }, []);

  return (
    <form className="login" onSubmit={handleLogin}>
      <span className="login__title">Digital gradebook</span>

      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Log in</button>
    </form>
  );
}

export default Login;
