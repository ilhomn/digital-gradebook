/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "../login/Login";
import MainPage from "../mainPage/main/MainPage";
import AdminPanel from "../adminPanel/AdminPanel";
import StudentsList from "../studentsList/StudentsList";
import MainPageAdmin from "../adminPanel/mainPageAdmin/MainPageAdmin";
import CreateUser from "../adminPanel/createUser/CreateUser";
import CreateGroup from "../adminPanel/createGroup/CreateGroup";
import UpdateUser from "../adminPanel/updateUser/UpdateUser";
import UpdateGroup from "../adminPanel/updateGroup/UpdateGroup";
import UploadStudents from "../adminPanel/uploadStudents/UploadStudents";

import ProtectedRoute from "../ProtectedRoute";
import PageLayout from "../../layout/PageLayout";
import ManageUsers from "../adminPanel/users/ManageUsers";
// import AdminRoute from "../adminPanel/AdminRoute";
import './App.css';
import { getUserData } from "../../config";
import CreateTimeSlotsModal from "../adminPanel/createTimeSlots/CreateTimeSlots";
import Group from "../mainPage/main/Group";

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
