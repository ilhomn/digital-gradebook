import React, { useState } from "react";
import "./CreateUser.css";
import Navbar from "../navbarAdminPanel/Navbar";

const CreateUser = () => {
  const [status, setStatus] = useState("");

  return (
    <div className="createUserPage">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="container">
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Password" />
        <input type="text" placeholder="Name and Last Name" />

        <input type="text" placeholder="Group" />
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
        <button>Create User</button>
      </div>
    </div>
  );
};

export default CreateUser;
