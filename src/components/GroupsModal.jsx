import { useState, useEffect } from "react";
import { VscClose, VscChevronDown } from "react-icons/vsc";
import "./UserModal.css";
import Dropdown from "./Dropdown";
import IP from "../config";

const groupTypes = ["Language", "Topik", "Other"];

const GroupsModal = ({ isOpen, onClose, groupData, token }) => {
    const [form, setForm] = useState({
        "name": "",
        "time": "",
        "teacher_id": null,
        "teacher_name_en": "Choose Teacher",
        "teacher_name_tj": "Choose Teacher",
        "teacher_name_kr": "Choose Teacher",
        "schedule": "Choose Schedule",
        "group_type": "Choose Group Type",
    });

    const [users, setUsers] = useState([]);
    const [timeslots, setTimeslots] = useState([]);

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
                const { data } = await usersResponse.json();

                // data.map(item => filteredUsers.push(`${item.id} ${item.last_name_en} ${item.name_en}`));

                setUsers(data);
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
        submitGroup(form);

        setForm({
            "name": "",
            "time": "",
            "teacher_id": null,
            "teacher_name_en": "",
            "teacher_name_tj": "",
            "teacher_name_kr": "",
            "schedule": "",
            "group_type": "",
        })

        onClose();
    };

    const submitGroup = async (form) => {
        try {
            const response = await fetch(`${IP}/create-group`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                alert("Success");
                window.location.reload();
            } else {
                alert("Error while creating group");
            }
        } catch (error) {
            console.error(error);
        }
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
                    <Dropdown options={users.length > 0 && users.map(user => `${user.last_name_en} ${user.name_en}`)} value={form.teacher_name_en}
                        onChange={val => setForm({
                            ...form,
                            teacher_id: users.find(user => `${user.last_name_en} ${user.name_en}` === val && user.status !== "guest")?.id,
                            teacher_name_en: val,
                            teacher_name_tj: `${users.find(user => `${user.last_name_en} ${user.name_en}` === val && user.status !== "guest")?.last_name_tj} ${users.find(user => `${user.last_name_en} ${user.name_en}` === val && user.status !== "guest")?.name_tj}`,
                            teacher_name_kr: `${users.find(user => `${user.last_name_en} ${user.name_en}` === val && user.status !== "guest")?.last_name_kr} ${users.find(user => `${user.last_name_en} ${user.name_en}` === val && user.status !== "guest")?.name_kr}`,
                        })}
                    />

                    <button type="submit" className="submit-btn">
                        {groupData ? "Save Changes" : "Create Group"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GroupsModal;
