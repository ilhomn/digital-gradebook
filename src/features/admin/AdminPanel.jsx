import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { VscMenu } from "react-icons/vsc";
import IP from "../../config";

const AdminPanel = ({ lang, setLang, token }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const handleCloseSidebar = () => setIsSidebarOpen(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      const response = await fetch(`${IP}/get-user-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
      });

      if (response.ok) {
        const { data } = await response.json();
        if (data.status !== "admin") {
          navigate("/");
          return null;
        }

        setUserData(data);
      }
    };

    if (token) {
        checkUser();
    }
  }, [navigate, token]);

  return (
    <div
      onClick={() => {
        if (isSidebarOpen) handleCloseSidebar();
      }}
    >
      <div
        className="sidebar-toggle-btn"
        onClick={(e) => {
          e.stopPropagation();
          setIsSidebarOpen(true);
        }}
      >
        <VscMenu />
      </div>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleClose={handleClose}
        status={userData.status}
        lang={lang}
        setLang={setLang}
      />
      <Outlet context={{ lang, setLang, token }} />
    </div>
  );
};

export default AdminPanel;
