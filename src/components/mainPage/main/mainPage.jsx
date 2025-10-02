import React, { useEffect } from "react";
import "./mainPage.css";
import Tabs from "../tabs/tabs";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="main-page">
      <div className="container">
        <button
          className="log-out
         "
          onClick={() => {
            localStorage.removeItem("token");

            navigate("/");
          }}
        >
          <img
            className="log-img"
            width="39"
            height="39"
            src="public\img\icons8-log-out-color-32.png"
            alt="exit"
          />
        </button>
        <Tabs />
      </div>
    </div>
  );
}

export default MainPage;
