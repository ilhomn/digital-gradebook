import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbarAdminPanel">
      <ul className="navList">
        <li>
          <Link
            to="/mainPage"
            className={location.pathname === "/mainPage" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/adminPanel/create-user"
            className={
              location.pathname === "/adminPanel/create-user" ? "active" : ""
            }
          >
            Create User
          </Link>
        </li>
        <li>
          <Link
            to="/adminPanel/create-group"
            className={
              location.pathname === "/adminPanel/create-group" ? "active" : ""
            }
          >
            Create Group
          </Link>
        </li>
        <li>
          <Link
            to="/adminPanel/manage-group"
            className={
              location.pathname === "/adminPanel/manage-group" ? "active" : ""
            }
          >
            Manage Group
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
