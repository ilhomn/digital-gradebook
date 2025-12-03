import { useState, useEffect, useRef } from "react";
import { VscClose, VscChevronDown } from "react-icons/vsc";
import "./UserModal.css";

const roles = ["teacher", "admin"];

const GroupsModal = ({ isOpen, onClose, onSubmit, groupData }) => {
    const [form, setForm] = useState({
        "name": "",
        "level": "",
        "teacher_id": 0,
        "teacher_name": "",
        "schedule": "",
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (groupData) setForm(groupData);
    }, [groupData]);

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
                    <h2>{groupData ? "Edit Group:" : "Create Group:"}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <VscClose />
                    </button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    <input type="text" name="englishFirstName" placeholder="English First Name" value={form.english_first_name} onChange={(e) => setForm({ ...form, english_first_name: e.target.value })} required />
                    <input type="text" name="englishLastName" placeholder="English Last Name" value={form.english_last_name} onChange={(e) => setForm({ ...form, english_last_name: e.target.value })} required />
                    <input type="text" name="koreanFirstName" placeholder="Korean First Name" value={form.korean_first_name} onChange={(e) => setForm({ ...form, korean_first_name: e.target.value })} required />
                    <input type="text" name="koreanLastName" placeholder="Korean Last Name" value={form.korean_last_name} onChange={(e) => setForm({ ...form, korean_last_name: e.target.value })} />

                    {/* Custom dropdown for role */}
                    <div
                        className="custom-dropdown"
                        ref={dropdownRef}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className="dropdown-selected">{form.status}</span>
                        <VscChevronDown className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`} />
                        {isDropdownOpen && (
                            <div className="dropdown-options">
                                {roles.map((role) => (
                                    <div
                                        key={role}
                                        className="dropdown-option"
                                        onClick={() => {
                                            setForm({ ...form, status: role });
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
                        {groupData ? "Save Changes" : "Create User"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GroupsModal;
