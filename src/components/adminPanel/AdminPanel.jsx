import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../resources/Sidebar";
import { VscMenu } from "react-icons/vsc";
import IP from "../../config";

const AdminPanel = () => {
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
    const [ userData, setUserData ] = useState({});

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
                    "token": window.localStorage.getItem("token"),
                }
            });

            if (response.ok) {
                const { data } = await response.json();
                if (data.status !== "admin") {
                    navigate('/');
                    return null;
                } else {
                    navigate('/admin-panel/manage');
                }

                setUserData(data);
            }
        };

        checkUser();
    }, [navigate]);

    return (
        <div>
            <div className="sidebar-toggle-btn" onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(true);}}>
                <VscMenu />
            </div>

            <Sidebar isSidebarOpen={isSidebarOpen} handleClose={handleClose} status={userData.status} />
            <Outlet />
        </div>
    );
};

export default AdminPanel;
