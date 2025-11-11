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
import ProtectedRoute from "../ProtectedRoute";
import UpdateUser from "../adminPanel/updateUser/UpdateUser";
import UpdateGroup from "../adminPanel/updateGroup/UpdateGroup";
import UploadStudents from "../adminPanel/uploadStudents/UploadStudents";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/mainPage"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/studentsList"
          element={
            <ProtectedRoute>
              <StudentsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminPanel"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        >
          <Route index element={<MainPageAdmin />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="create-group" element={<CreateGroup />} />
          <Route path="create-time-slots" element={<CreateTimeSlots />} />
          <Route path="update-user" element={<UpdateUser />} />
          <Route path="update-group" element={<UpdateGroup />} />
          <Route path="upload-students" element={<UploadStudents />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
