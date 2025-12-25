import { useEffect, useState } from "react";
import "./UserModal.css";
import { VscClose } from "react-icons/vsc";
import Dropdown from "./Dropdown";
import IP from "../config";

const CreateStudentModal = ({ isOpen, onClose, studentData }) => {
    const token = localStorage.getItem("token");

    const [ form, setForm ] = useState({
        name_tj: "",
        last_name_tj: "",
        name_en: "",
        last_name_en: "",
        name_kr: "",
        last_name_kr: "",
        email: "",
        phone: "",
        groups: []
    });

    const [ groups, setGroups ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const groupsResponse = await fetch(`${IP}/get-groups`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                });

                if (groupsResponse.ok) {
                    console.log(await groupsResponse.json());
                }
            } catch (error) {
                console.error("try catch error", error);
            }
        };

        fetchData();
    }, [token]);
    
    return (
        <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className={`modal-card ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{studentData ? "Edit Group:" : "Create Group:"}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <VscClose />
                    </button>
                </div>

                <form className="modal-form">
                    <label htmlFor="name-tj" className="modal-label"> Name (Taj): </label>
                    <input type="text" name="name-tj" placeholder="First name in Tajik" value={form.name_tj} onChange={(e) => setForm({ ...form, name_tj: e.target.value })} required />

                    <label htmlFor="last-name-tj" className="modal-label"> Last Name (Taj): </label>
                    <input type="text" name="last-name-tj" placeholder="Last name in Tajik" value={form.last_name_tj} onChange={(e) => setForm({ ...form, last_name_tj: e.target.value })} required />

                    <label htmlFor="name-en" className="modal-label"> Name (Eng): </label>
                    <input type="text" name="name-en" placeholder="First name in English" value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} required />

                    <label htmlFor="last-name-en" className="modal-label"> Last Name (Eng): </label>
                    <input type="text" name="last-name-en" placeholder="Last name in English" value={form.last_name_en} onChange={(e) => setForm({ ...form, last_name_en: e.target.value })} required />

                    <label htmlFor="name-kr" className="modal-label"> Name (Kor): </label>
                    <input type="text" name="name-kr" placeholder="이름 (한국어)" value={form.name_kr} onChange={(e) => setForm({ ...form, name_kr: e.target.value })} required />

                    <label htmlFor="last-name-kr" className="modal-label"> Last Name (Kor): </label>
                    <input type="text" name="last-name-kr" placeholder="성 (한국어)" value={form.last_name_en} onChange={(e) => setForm({ ...form, last_name_en: e.target.value })} required />

                    <label htmlFor="email" className="modal-label"> Email: </label>
                    <input type="email" name="email" placeholder="test@example.com" />

                    <label htmlFor="phone" className="modal-label"> Phone Number: </label>
                    <input type="tel" name="phone" placeholder="+992000000001" />

                    <label htmlFor="groups" className="modal-label"> Groups: </label>
                    <Dropdown />

                    {/* Custom dropdown */}
                    {/* <label className="modal-label"> Schedule: </label>
                    <Dropdown options={timeslots.length > 0 && timeslots} value={form.schedule} onChange={val => setForm({ ...form, schedule: val })} />
                    
                    <label className="modal-label"> Teacher: </label>
                    <Dropdown options={users.length > 0 && users} value={form.teacher_name} onChange={val => setForm({ ...form, teacher_name: val })} /> */}

                    <button type="submit" className="submit-btn">
                        {studentData ? "Save Changes" : "Create Student"}
                    </button>
                </form>
            </div>
        </div>        
    );
};

export default CreateStudentModal;