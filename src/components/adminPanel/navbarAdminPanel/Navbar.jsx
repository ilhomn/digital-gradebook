import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbarAdminPanel">
      <ul className="navList">
        <li>Home</li>
        <li>Create User</li>
        <li>Create Group</li>
        <li>Manage Group</li>
      </ul>
    </nav>
  );
};

export default Navbar;
