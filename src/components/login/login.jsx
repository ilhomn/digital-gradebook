import React, { useState } from "react";
import "./login.css";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.0.110:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: login, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful");
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login">
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

      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}

export default Login;
