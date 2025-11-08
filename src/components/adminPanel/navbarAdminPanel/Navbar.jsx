import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const groupDropdownRef = useRef(null);

  const toggleUserDropdown = () => setIsUserDropdownOpen((prev) => !prev);
  const toggleGroupDropdown = () => setIsGroupDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        groupDropdownRef.current &&
        !groupDropdownRef.current.contains(event.target)
      ) {
        setIsGroupDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isGroupActive =
    location.pathname.startsWith("/adminPanel/create-group") ||
    location.pathname.startsWith("/adminPanel/manage-group") ||
    location.pathname.startsWith("/adminPanel/update-group");

  const isUserActive =
    location.pathname.startsWith("/adminPanel/create-user") ||
    location.pathname.startsWith("/adminPanel/manage-user") ||
    location.pathname.startsWith("/adminPanel/update-user");

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

        <li ref={userDropdownRef} className="dropdown">
          <span
            onClick={toggleUserDropdown}
            className={isUserActive ? "active" : ""}
          >
            Manage User
          </span>

          {isUserDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => setIsUserDropdownOpen(false)}>
                <Link to="/adminPanel/create-user">Create User</Link>
              </li>
              <li onClick={() => setIsUserDropdownOpen(false)}>
                <Link to="/adminPanel/update-user">Update User</Link>
              </li>
            </ul>
          )}
        </li>

        <li ref={groupDropdownRef} className="dropdown">
          <span
            onClick={toggleGroupDropdown}
            className={isGroupActive ? "active" : ""}
          >
            Manage Group
          </span>

          {isGroupDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => setIsGroupDropdownOpen(false)}>
                <Link to="/adminPanel/create-group">Create Group</Link>
              </li>
              <li onClick={() => setIsGroupDropdownOpen(false)}>
                <Link to="/adminPanel/update-group">Update Group</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link
            to="/adminPanel/create-time-slots"
            className={
              location.pathname === "/adminPanel/create-time-slots"
                ? "active"
                : ""
            }
          >
            Create Time Slots
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
