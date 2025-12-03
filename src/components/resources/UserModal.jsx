import { useState, useEffect } from "react";
import { VscClose, VscChevronDown } from "react-icons/vsc";
import "./UserModal.css";
import Dropdown from "./Dropdown";

const roles = ["teacher", "admin"];

const UserModal = ({ isOpen, onClose, onSubmit, userData }) => {
    const [form, setForm] = useState({
        username: "",
        english_first_name: "",
        english_last_name: "",
        korean_first_name: "",
        korean_last_name: "",
        email: "",
        password: "",
        status: "teacher",
    });


    useEffect(() => {
        if (userData) setForm(userData);
    }, [userData]);

    // Close dropdown if clicked outside
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        onClose();
    };

    return (
        <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className={`modal-card ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{userData ? "Edit User:" : "Create User:"}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <VscClose />
                    </button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
                    <input type="text" name="englishFirstName" placeholder="English First Name" value={form.english_first_name} onChange={(e) => setForm({ ...form, english_first_name: e.target.value })} required />
                    <input type="text" name="englishLastName" placeholder="English Last Name" value={form.english_last_name} onChange={(e) => setForm({ ...form, english_last_name: e.target.value })} required />
                    <input type="text" name="koreanFirstName" placeholder="Korean First Name" value={form.korean_first_name} onChange={(e) => setForm({ ...form, korean_first_name: e.target.value })} required />
                    <input type="text" name="koreanLastName" placeholder="Korean Last Name" value={form.korean_last_name} onChange={(e) => setForm({ ...form, korean_last_name: e.target.value })} />
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />

                    {/* Custom dropdown for role */}
                    <Dropdown options={roles} value={form.status} onChange={(val) => setForm({ ...form, status: val })} />

                    <button type="submit" className="submit-btn">
                        {userData ? "Save Changes" : "Create User"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserModal;
