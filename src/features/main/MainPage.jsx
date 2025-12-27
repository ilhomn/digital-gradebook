/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import IP from "../../config";
import Sidebar from "../../components/Sidebar";
import { VscMenu } from "react-icons/vsc";

function MainPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [userData, setUserData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleCloseSidebar = () => setIsSidebarOpen(false);

    useEffect(() => {
        // Redirect if no token
        if (!token) {
            navigate("/");
            return;
        }

        // Fetch user data
        const fetchData = async () => {
            try {
                const [userResponse, groupsResponse] = await Promise.all([
                    fetch(`${IP}/get-user-data`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            token: token,
                        },
                    }),
                    fetch(`${IP}/get-groups`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            token: token,
                        },
                    }),
                ]);

                if (!userResponse.ok) {
                    console.error("Error fetching user data");
                    window.localStorage.removeItem("token");
                    navigate("/");
                    return; 
                }

                const userDataJson = await userResponse.json();
                const groupsData = groupsResponse.ok ? await groupsResponse.json() : { data: [] };

                setUserData({ ...userDataJson.data, groups: groupsData.data || [] });

            } catch (err) {
                console.error("User fetch error:", err);
                window.localStorage.removeItem("token");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Loading UI
    if (loading) {
        return (
            <div className="main-wrapper loading-state">
                <div className="loader">Loading…</div>
            </div>
        );
    }

    // Fallback: if user is null (e.g., token expired)
    if (!userData) {
        return (
            <div className="main-wrapper">
                <p>Error loading user data.</p>
            </div>
        );
    }

    return (
        <div
            className="main-wrapper"
            onClick={() => {
                if (isSidebarOpen) handleCloseSidebar();
            }}
        >
            {/* Sidebar Toggle */}
            <div
                className="sidebar-toggle-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsSidebarOpen(true);
                }}
            >
                <VscMenu />
            </div>

            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} handleClose={handleCloseSidebar} status={userData.status} />

            {/* Main Content */}
            <div
                className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="glass-board">
                    <div className="groups-list">
                        {userData?.groups?.length > 0 ? (
                            userData.groups.map((group, index) => (
                                <div key={index} className="group-card" onClick={() => navigate('/students-list/' + group.id)}>
                                    <div className="card-group-name">{group.name || "Name"}</div>
                                    <div className="card-teacher-name">
                                        {group.teacher_name_en || "Teacher"}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-groups-message">
                                You are not assigned to any groups.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
