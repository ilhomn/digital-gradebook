import { useState, useEffect } from "react";
import { VscClose, VscChevronDown } from "react-icons/vsc";
import "./UserModal.css";
import Dropdown from "./Dropdown";
import IP from "../config";

const groupTypes = ["Language", "Topik", "Other"];

const GroupsModal = ({ isOpen, onClose, onSubmit, groupData }) => {
    const [form, setForm] = useState({
        "name": "",
        "time": "",
        "teacher_name": "Choose Teacher",
        "schedule": "Choose Schedule",
        "group_type": "Choose Group Type",
    });

    const [ users, setUsers ] = useState([]);
    const [ timeslots, setTimeslots ] = useState([]);
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        if (groupData) setForm(groupData);

        async function getData() {
            const usersResponse = await fetch(`${IP}/get-all-users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                }
            });

            if (usersResponse.ok) {
                const { data } = await usersResponse.json(),
                      filteredUsers = [];
                
                data.map(item => filteredUsers.push(`${item.id} ${item.english_last_name} ${item.english_first_name}`));
                
                setUsers(filteredUsers);
            }

            const scheduleResponse = await fetch(`${IP}/get-timeslots`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                },
            });

            if (scheduleResponse.ok) {
                const { data } = await scheduleResponse.json(),
                      filteredTimeslots = [];
                    
                data.map(item => filteredTimeslots.push(item.name));

                setTimeslots(filteredTimeslots);
            }
        }

        getData();
    }, [groupData, token]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        
        setForm({
            "name": "",
            "time": "",
            "teacher_name": "",
            "schedule": "",
            "group_type": "",
        })
        
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
                    <label htmlFor="name" className="modal-label"> Name: </label>
                    <input type="text" name="name" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

                    <label htmlFor="time" className="modal-label"> Time: </label>
                    <input type="time" name="time" placeholder="Time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />

                    {/* Custom dropdown */}
                    <label className="modal-label"> Group Type: </label>
                    <Dropdown options={groupTypes} value={form.group_type} onChange={val => setForm({ ...form, group_type: val })} />

                    <label className="modal-label"> Schedule: </label>
                    <Dropdown options={timeslots.length > 0 && timeslots} value={form.schedule} onChange={val => setForm({ ...form, schedule: val })} />
                    
                    <label className="modal-label"> Teacher: </label>
                    <Dropdown options={users.length > 0 && users} value={form.teacher_name} onChange={val => setForm({ ...form, teacher_name: val })} />


                    <button type="submit" className="submit-btn">
                        {groupData ? "Save Changes" : "Create Group"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GroupsModal;
