import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbarAdminPanel">
      <ul className="navList">
        <li>
          <Link to="/mainPage">Home</Link>
        </li>
        <li>
          <Link to="/adminPanel/create-user">Create User</Link>
        </li>
        <li>
          <Link to="/adminPanel/create-group">Create Group</Link>
        </li>
        <li>
          <Link to="/adminPanel/manage-group">Manage Group</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
