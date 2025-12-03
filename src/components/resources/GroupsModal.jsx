import { useState, useEffect } from "react";
import { VscClose, VscChevronDown } from "react-icons/vsc";
import "./UserModal.css";
import Dropdown from "./Dropdown";
import IP from "../../config";

const GroupsModal = ({ isOpen, onClose, onSubmit, groupData }) => {
    const [form, setForm] = useState({
        "name": "",
        "level": "",
        "time": "",
        "teacher_name": "",
        "schedule": "",
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
            "level": "",
            "time": "",
            "teacher_name": "",
            "schedule": "",
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
                    
                    <label htmlFor="level" className="modal-label"> Level: </label>
                    <input type="text" name="level" placeholder="Level" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} required />
                    
                    <label htmlFor="time" className="modal-label"> Time: </label>
                    <input type="time" name="time" placeholder="Time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />

                    {/* Custom dropdown */}
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
