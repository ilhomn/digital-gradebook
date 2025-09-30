import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IP from "../../config";
import "./login.css";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      fetch(`${IP}/get-user-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log("User data:", data));

      const response = await fetch(`${IP}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: login, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful");
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/MainePage");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

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

      <button>Log in</button>
    </form>
  );
}

export default Login;
