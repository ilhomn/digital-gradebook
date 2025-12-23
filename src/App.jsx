/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "./features/auth/Login";
import MainPage from "./features/main/MainPage";
import AdminPanel from "./features/admin/AdminPanel";
import ManageUsers from "./features/admin/Manage";
import './App.css';
import { getUserData } from "./config";
import Group from "./features/main/Group";

function App() {
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        async function checkToken() {
            const data = await getUserData(token);
            
            if (data.name && data.name == "TokenExpiredError") {
                window.localStorage.removeItem("token");
                window.location.href = '/';
            }
        }

        checkToken();
    }, []);
    
    return (
        <Router>
                {!window.localStorage.getItem("token") ? (
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="*" element={<Navigate to="/" replace />} />                    
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/main-page" element={<MainPage />} />
                        <Route path="/students-list/:id" element={<Group />} />
                        <Route path="/admin-panel/*" element={<AdminPanel />}>
                            <Route path="manage" element={<ManageUsers />} />
                        </Route>        
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                )}
        </Router>
    );
}

export default App;
