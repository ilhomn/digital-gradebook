import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbarAdminPanel/Navbar";
import Sidebar from "../resources/Sidebar";
import { VscMenu } from "react-icons/vsc";

const AdminPanel = () => {
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);

    const handleClose = () => {
        setIsSidebarOpen(false);
    };


    return (
        <div>
            <div className="sidebar-toggle-btn" onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(true);}}>
                <VscMenu />
            </div>

            <Sidebar isSidebarOpen={isSidebarOpen} handleClose={handleClose} />
            <Outlet />
        </div>
    );
};

export default AdminPanel;
