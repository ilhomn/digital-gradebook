import React from "react";
import Login from "../login/login";
import MainPage from "../mainPage/main/mainPage";
import AdminPanel from "../adminPanel/adminPanel";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        {/* Любой другой путь редиректит на логин */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
