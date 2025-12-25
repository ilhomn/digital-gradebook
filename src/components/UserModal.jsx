import { useState, useEffect } from "react";
import { VscClose, VscChevronDown } from "react-icons/vsc";
import "./UserModal.css";
import Dropdown from "./Dropdown";

const roles = ["admin", "teacher",];

const UserModal = ({ isOpen, onClose, onSubmit, userData }) => {
    const [form, setForm] = useState({
        username: "",
        name_tj: "",
        last_name_tj: "",
        name_en: "",
        last_name_en: "",
        name_kr: "",
        last_name_kr: "",
        email: "",
        password: "",
        phone: "",
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
                    <label htmlFor="username" className="modal-label"> Username: </label>
                    <input type="text" name="username" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
                    
                    <label htmlFor="tajikFirstName" className="modal-label"> Tajik First Name: </label>
                    <input type="text" name="tajikFirstName" placeholder="Tajik First Name" value={form.name_tj} onChange={(e) => setForm({ ...form, name_tj: e.target.value })} required />
                    
                    <label htmlFor="tajikLastName" className="modal-label"> Tajik Last Name: </label>
                    <input type="text" name="tajikLastName" placeholder="Tajik Last Name" value={form.last_name_tj} onChange={(e) => setForm({ ...form, last_name_tj: e.target.value })} required />
                    
                    <label htmlFor="englishFirstName" className="modal-label"> English First Name: </label>
                    <input type="text" name="englishFirstName" placeholder="English First Name" value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} required />
                    
                    <label htmlFor="englishLastName" className="modal-label"> English Last Name: </label>
                    <input type="text" name="englishLastName" placeholder="English Last Name" value={form.last_name_en} onChange={(e) => setForm({ ...form, last_name_en: e.target.value })} required />
                    
                    <label htmlFor="koreanFirstName" className="modal-label"> Korean First Name: </label>
                    <input type="text" name="koreanFirstName" placeholder="Korean First Name" value={form.name_kr} onChange={(e) => setForm({ ...form, name_kr: e.target.value })} required />
                    
                    <label htmlFor="koreanLastName" className="modal-label"> Korean Last Name: </label>
                    <input type="text" name="koreanLastName" placeholder="Korean Last Name" value={form.last_name_kr} onChange={(e) => setForm({ ...form, last_name_kr: e.target.value })} />
                    
                    <label htmlFor="email" className="modal-label"> Email: </label>
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

                    <label htmlFor="phoneNumber" className="modal-label"> Phone number: </label>
                    <input type="number" name="phoneNumber" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    
                    <label htmlFor="password" className="modal-label"> Password: </label>
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />

                    {/* Custom dropdown for role */}
                    <label htmlFor="" className="modal-label"> Status: </label>
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
