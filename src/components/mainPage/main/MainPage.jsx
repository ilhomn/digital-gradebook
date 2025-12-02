import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./MainPage.css";
import Tabs from "../tabs/Tabs";
import { useNavigate } from "react-router-dom";
import IP, { getUserData } from "../../../config";
import Navbar from "../../adminPanel/navbarAdminPanel/Navbar";
import Sidebar from "../../resources/Sidebar";
import { VscMenu } from "react-icons/vsc";

function MainPage() {
    const navigate = useNavigate();

    const [ userData, setUserData ] = useState({});
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);

    const handleClose = () => {
        setIsSidebarOpen(false);
    };

    useLayoutEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        async function fetchData() {
            try {
                setUserData(await getUserData(token));
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [navigate]);
    
    // const handleLogout = () => {
    //   localStorage.removeItem("token");
    //   navigate("/");
    // };

    return (
        <div className="main-wrapper" onClick={() => { if (isSidebarOpen) handleClose();}}>
            <div className="sidebar-toggle-btn" onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(true);}}>
                <VscMenu />
            </div>

            <Sidebar isSidebarOpen={isSidebarOpen} handleClose={handleClose} />

            <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="groups-list">
                    {userData && userData.groups && userData.groups.length != 0 && userData.groups.map(item => (
                        <div className="group-card">
                            <div className="card-group-name"> Name </div>
                            <div className="card-teacher-name"> Teacher </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <button onClick={() => {
                window.localStorage.removeItem("token");
                navigate("/");
            }}> Logout </button>

            {userRole === "admin" && <Sidebar />}
            
            <div className="container">
                <div className="top-row">
                    {userRole === "admin" && <Navbar />}
                </div>
                {userRole === "teacher" && (
                    <h2 className="teacher-groups-title">Your Groups</h2>
                )}
                <Tabs groups={groups} role={userRole} nameTeacher={nameTeacher} />
            </div> */}
        </div>
    );
}

export default MainPage;
