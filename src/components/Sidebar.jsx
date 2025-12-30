import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import {
    VscAccount,
    VscChromeClose,
    VscPerson,
    VscPreview,
    VscHome,
    VscGlobe,
    VscChevronDown,
} from "react-icons/vsc";

const LANGS = [
    { code: "tj", label: "TJ" },
    { code: "en", label: "EN" },
    { code: "kr", label: "KR" },
];

const Sidebar = ({ isSidebarOpen, handleClose, status }) => {
    const [lang, setLang] = useState("en");
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef(null);

    useEffect(() => {
        const savedLang = localStorage.getItem("lang");
        if (savedLang) setLang(savedLang);
    }, []);

    useEffect(() => {
        function handleClickOutside(e) {
            if (langRef.current && !langRef.current.contains(e.target)) {
                setLangOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        window.location.reload();
    }

    function changeLang(code) {
        setLang(code);
        localStorage.setItem("lang", code);
        setLangOpen(false);
        // i18n.changeLanguage(code);
    }

    return (
        <aside
            className={`sidebar ${isSidebarOpen ? "active" : ""}`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="sidebar__content">
                <button className="sidebar__close-btn" onClick={handleClose}>
                    <VscChromeClose />
                </button>

                <div className="avatar">
                    <VscAccount className="ico" />
                </div>


                <ul className="sidebar__list">
                    <li className="sidebar__item">
                        <Link to="/main-page">
                            <VscPreview className="sidebar-icon" /> Dashboard
                        </Link>
                    </li>

                    {status === "admin" && (
                        <li className="sidebar__item">
                            <Link to="/admin-panel/manage">
                                <VscPerson className="sidebar-icon" /> Admin Panel
                            </Link>
                        </li>
                    )}

                {/* === Language dropdown === */}
                <li className="lang-dropdown" ref={langRef}>
                    <button
                        className={`lang-trigger ${langOpen ? "active" : ""}`}
                        onClick={() => setLangOpen((p) => !p)}
                    >
                        <VscGlobe />
                        <span>{lang.toUpperCase()}</span>
                        <VscChevronDown className="chevron" />
                    </button>

                    <div className={`lang-menu ${langOpen ? "open" : ""}`}>
                        {LANGS.map((l) => (
                            <div
                                key={l.code}
                                className={`lang-item ${lang === l.code ? "selected" : ""}`}
                                onClick={() => changeLang(l.code)}
                            >
                                {l.label}
                            </div>
                        ))}
                    </div>
                </li>

                    <li className="logout-btn">
                        <button onClick={handleLogout}>
                            <VscHome className="sidebar-icon" /> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
