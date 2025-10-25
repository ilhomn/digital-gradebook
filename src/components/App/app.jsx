import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../login/login";
import MainPage from "../mainPage/main/mainPage";
import AdminPanel from "../adminPanel/adminPanel";
import StudentsList from "../studentsList/studentsList";

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
