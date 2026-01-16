import React, { useState } from "react";
import "./Login.css";
import IP from "../../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";

function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${IP}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: login }),
            });

            if (response.ok) {
                const { data } = await response.json();
                const userCredential = await signInWithEmailAndPassword(auth, data, password);
                const user = userCredential.user;

                if (user) {
                    window.location.reload();
                } else {
                    alert("Wrong login or password");
                }
            }
        } catch (err) {
            alert("Ошибка при авторизации");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <h1 className="login-form__title">Digital gradebook</h1>

                <input
                    className="login-form__input"
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />

                <input
                    className="login-form__input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="login-form__button" type="submit" disabled={loading}>
                    {loading ? <div className="mini-loader">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div> : "Log in"}
                </button>
            </form>
        </div>
    );
}

export default Login;
