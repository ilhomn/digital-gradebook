import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../login/Login";
import MainPage from "../mainPage/main/MainPage";
import AdminPanel from "../adminPanel/AdminPanel"; // New AdminPanel component
import StudentsList from "../studentsList/StudentsList";
import MainPageAdmin from "../adminPanel/mainPageAdmin/MainPageAdmin";
import CreateUser from "../adminPanel/createUser/CreateUser";
import CreateGroup from "../adminPanel/createGroup/CreateGroup";
import ManageGroup from "../adminPanel/manageGroup/ManageGroup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/studentsList" element={<StudentsList />} />
        <Route path="/adminPanel" element={<AdminPanel />}>
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
