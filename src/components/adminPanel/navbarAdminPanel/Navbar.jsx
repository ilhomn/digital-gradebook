import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const groupDropdownRef = useRef(null);
  const navbarRef = useRef(null);

  const toggleUserDropdown = () => setIsUserDropdownOpen((prev) => !prev);
  const toggleGroupDropdown = () => setIsGroupDropdownOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

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
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isGroupActive =
    location.pathname.startsWith("/admin-panel/create-group") ||
    location.pathname.startsWith("/admin-panel/manage-group") ||
    location.pathname.startsWith("/admin-panel/update-group");

  const isUserActive =
    location.pathname.startsWith("/admin-panel/create-user") ||
    location.pathname.startsWith("/admin-panel/manage-user") ||
    location.pathname.startsWith("/admin-panel/update-user");

  return (
    <nav className="navbaradmin-panel" ref={navbarRef}>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className={`navList ${isMenuOpen ? "open" : ""}`}>
        <li onClick={handleLinkClick}>
          <Link
            to="/main-page"
            className={location.pathname === "/main-page" ? "active" : ""}
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
              <li
                onClick={() => {
                  setIsUserDropdownOpen(false);
                  handleLinkClick();
                }}
              >
                <Link to="/admin-panel/create-user">Create User</Link>
              </li>
              <li
                onClick={() => {
                  setIsUserDropdownOpen(false);
                  handleLinkClick();
                }}
              >
                <Link to="/admin-panel/update-user">Update User</Link>
              </li>
              <li onClick={handleLinkClick}>
                <Link to="/admin-panel/upload-students">Upload Students</Link>
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
              <li
                onClick={() => {
                  setIsGroupDropdownOpen(false);
                  handleLinkClick();
                }}
              >
                <Link to="/admin-panel/create-group">Create Group</Link>
              </li>
              <li
                onClick={() => {
                  setIsGroupDropdownOpen(false);
                  handleLinkClick();
                }}
              >
                <Link to="/admin-panel/update-group">Update Group</Link>
              </li>
            </ul>
          )}
        </li>

        <li onClick={handleLinkClick}>
          <Link
            to="/admin-panel/create-time-slots"
            className={
              location.pathname === "/admin-panel/create-time-slots"
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
