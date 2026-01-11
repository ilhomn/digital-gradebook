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
