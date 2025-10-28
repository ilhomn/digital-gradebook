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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/studentsList" element={<StudentsList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
