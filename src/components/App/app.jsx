import React from "react";
import Login from "../login/login";
import MainPage from "../mainPage/main/mainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/MainePage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
