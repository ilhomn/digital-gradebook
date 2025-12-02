import { useState, useEffect, useRef } from "react";
import { VscClose, VscChevronDown } from "react-icons/vsc";
import "./UserModal.css";

const roles = ["teacher", "admin"];

const UserModal = ({ isOpen, onClose, onSubmit, userData }) => {
    const [form, setForm] = useState({
        username: "",
        englishFirstName: "",
        englishLastName: "",
        koreanFirstName: "",
        koreanLastName: "",
        email: "",
        password: "",
        role: "teacher",
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (userData) setForm(userData);
    }, [userData]);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        onClose();
    };

    return (
        <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className={`modal-card ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{userData ? "Edit User" : "Create User"}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <VscClose />
                    </button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
                    <input type="text" name="englishFistName" placeholder="English First Name" value={form.englishFirstName} onChange={(e) => setForm({ ...form, englishFirstName: e.target.value })} required />
                    <input type="text" name="englishLastName" placeholder="English Last Name" value={form.englishLastName} onChange={(e) => setForm({ ...form, englishLastName: e.target.value })} required />
                    <input type="text" name="koreanFirstName" placeholder="Korean First Name" value={form.koreanFirstName} onChange={(e) => setForm({ ...form, koreanFirstName: e.target.value })} required />
                    <input type="text" name="koreanLastName" placeholder="Korean Last Name" value={form.koreanLastName} onChange={(e) => setForm({ ...form, koreanLastName: e.target.value })} />
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />

                    {/* Custom dropdown for role */}
                    <div
                        className="custom-dropdown"
                        ref={dropdownRef}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className="dropdown-selected">{form.role}</span>
                        <VscChevronDown className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`} />
                        {isDropdownOpen && (
                            <div className="dropdown-options">
                                {roles.map((role) => (
                                    <div
                                        key={role}
                                        className="dropdown-option"
                                        onClick={() => {
                                            setForm({ ...form, role });
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {role}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="submit-btn">
                        {userData ? "Save Changes" : "Create User"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserModal;
