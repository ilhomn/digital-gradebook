import React from "react";
import "./login.css";

function Login() {
  return (
    <div className="login">
      <span className="login__title">Digital gradebook</span>
      <input type="text" placeholder="Login" />
      <input type="text" placeholder="Password" />
      <button>Log in</button>
    </div>
  );
}

export default Login;
