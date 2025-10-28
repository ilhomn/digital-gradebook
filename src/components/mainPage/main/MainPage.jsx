import React, { useEffect } from "react";
import "./MainPage.css";
import Tabs from "../tabs/Tabs";
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
            src="/img/icons8-log-out-color-32.png"
            alt="exit"
          />
        </button>
        <Tabs />
      </div>
    </div>
  );
}

export default MainPage;
