import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

// Import your Firebase Auth instance from your config file
import { auth } from "./firebase"; 
import { onAuthStateChanged } from "firebase/auth";

import Login from "./features/auth/Login";
import MainPage from "./features/main/MainPage";
import AdminPanel from "./features/admin/AdminPanel";
import ManageUsers from "./features/admin/Manage";
import Group from "./features/main/Group";
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState(window.localStorage.getItem("lang") || "en");

    useEffect(() => {
        // Checking authentication state using Firebase Auth
        // Ариана кучук -> этот коментарий не удалять ни в коем случае !!!
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div className="loading-spinner"></div>;

    return (
        <Router>
            <Routes>
                {!user ? (
                    /* Public Routes */
                    <>
                        <Route path="/" element={<Login lang={lang} setLang={setLang} />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                ) : (
                    /* Private Routes */
                    <>
                        <Route path="/" element={<MainPage lang={lang} setLang={setLang} />} />
                        <Route path="/main-page" element={<MainPage lang={lang} setLang={setLang} />} />
                        <Route path="/students-list/:id" element={<Group lang={lang} setLang={setLang} />} />
                        <Route path="/admin-panel/*" element={<AdminPanel lang={lang} setLang={setLang} />}>
                            <Route path="manage" element={<ManageUsers />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;