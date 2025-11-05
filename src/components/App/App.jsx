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
import ManageGroup from "../adminPanel/manageGroup/ManageGroup";
import ProtectedRoute from "../ProtectedRoute"; // ✅ импорт защиты

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
          <Route path="manage-group" element={<ManageGroup />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
