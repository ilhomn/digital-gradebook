import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IP, { getUserData } from "../../config";
import "./Login.css";

function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${IP}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: login, password }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.token) {
                    localStorage.setItem("token", data.token);

                    const userData = await getUserData(data.token);

                    if (userData.status === "teacher") {
                        navigate("/main-page");
                    } else if (userData.status === "admin") {
                        navigate("/admin-panel");
                    } else {
                        alert("Неизвестная роль пользователя");
                    }
                }
            } else {
                alert("Неверный логин или пароль");
            }
        } catch (err) {
            alert("Ошибка при авторизации");
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {        
        if (window.localStorage.getItem("token")) {
            navigate("/main-page");
            return null;
        }
    }, [navigate]);

    return (
        <form className="login" onSubmit={handleLogin}>
            <div className="logiin">
                <span className="login__title">Digital gradebook</span>

                <input
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? <div className="mini-loader"></div> : "Log in"}
                </button>
            </div>
        </form>
    );
}

export default Login;
