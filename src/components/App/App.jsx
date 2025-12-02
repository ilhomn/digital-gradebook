import React from "react";
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
import CreateTimeSlots from "../adminPanel/CreateTimeSlots/CreateTimeSlots";
import UpdateUser from "../adminPanel/updateUser/UpdateUser";
import UpdateGroup from "../adminPanel/updateGroup/UpdateGroup";
import UploadStudents from "../adminPanel/uploadStudents/UploadStudents";

import ProtectedRoute from "../ProtectedRoute";
import PageLayout from "../../layout/PageLayout";
import ManageUsers from "../adminPanel/users/ManageUsers";
// import AdminRoute from "../adminPanel/AdminRoute";
import './App.css';

function App() {

    if (!window.localStorage.getItem("token")) {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/main-page"
                    element={
                        <MainPage />
                    }
                />

                <Route
                    path="/students-list/:id"
                    element={
                        <ProtectedRoute>
                            <PageLayout>
                                <StudentsList />
                            </PageLayout>
                        </ProtectedRoute>
                    }
                />

                <Route path="/admin-panel/*" element={<AdminPanel />}>
                    <Route index element={
                        <ProtectedRoute>
                            <PageLayout>
                                <MainPageAdmin />
                            </PageLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="create-user" element={<CreateUser />} />
                    <Route path="create-group" element={<CreateGroup />} />
                    <Route path="create-time-slots" element={<CreateTimeSlots />} />
                    <Route path="update-user" element={<UpdateUser />} />
                    <Route path="update-group" element={<UpdateGroup />} />
                    <Route path="upload-students" element={<UploadStudents />} />
                    <Route path="manage-users" element={<ManageUsers />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
