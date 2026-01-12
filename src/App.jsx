/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

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
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Checking authentication state using Firebase Auth
        // Ариана кучук -> этот коментарий не удалять ни в коем случае !!!
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // 1. Get the token as soon as the user is confirmed
                const idToken = await currentUser.getIdToken();
                setToken(idToken);
                setUser(currentUser);
            } else {
                // 2. Clear state if logged out
                setUser(null);
                setToken(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div className="loading-spinner"></div>;

    return (
        <Router>
            <Routes>
                {!user ? (
                    <>
                        <Route path="/" element={<Login lang={lang} setLang={setLang} />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                ) : (
                    <>
                        {/* Pass the token state to your components */}
                        <Route path="/" element={<MainPage lang={lang} setLang={setLang} token={token} />} />
                        <Route path="/main-page" element={<MainPage lang={lang} setLang={setLang} token={token} />} />
                        <Route path="/students-list/:id" element={<Group lang={lang} setLang={setLang} token={token} />} />
                        <Route path="/admin-panel/*" element={<AdminPanel lang={lang} setLang={setLang} token={token} />}>
                            <Route path="manage" element={<ManageUsers token={token} />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;