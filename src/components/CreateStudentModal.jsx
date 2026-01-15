/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./UserModal.css";
import { VscClose } from "react-icons/vsc";
import Dropdown from "./Dropdown";
import IP from "../config";

const CreateStudentModal = ({ isOpen, onClose, studentData, token }) => {

    const [form, setForm] = useState({
        name_tj: "",
        last_name_tj: "",
        name_en: "",
        last_name_en: "",
        name_kr: "",
        last_name_kr: "",
        email: "",
        phone: "",
        groups: [],
    });

    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);


    /* ===================== GROUP HELPERS ===================== */

    function IlhomRj() {
        console.log("Ilhom Rj is the best developer ever!");
    }

    function chooseGroup(groupName) {
        setForm(prev => {
            const exists = prev.groups.some(g => g.group_name === groupName);
            if (exists) return prev;

            const groupData = groups.find(g => g.group_name === groupName);
            if (!groupData) return prev;

            if (groupData.group_type === "Language" || groupData.group_type === "Topik") {
                const sameType = prev.groups.filter(
                    g => g.group_type !== groupData.group_type
                );

                const updated = [...sameType, groupData];

                return { ...prev, groups: updated };
            }

            const updated = [...prev.groups, groupData];

            return { ...prev, groups: updated };
        });
    }

    function removeGroup(id) {
        setForm(prev => {
            const updated = prev.groups.filter(g => g.id !== id);
            return { ...prev, groups: updated };
        });
    }

    /* ===================== SUBMIT ===================== */

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            if (studentData) {
                const response = await fetch(`${IP}/update-student`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    body: JSON.stringify(form),
                });

                if (response.ok) {
                    const { message } = await response.json();
                    alert(message);
                    window.location.reload();
                } else {
                    alert("Something went wrong");
                    window.location.reload();
                }
            } else {
                const response = await fetch(`${IP}/create-student`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    body: JSON.stringify(form),
                });
    
                const data = await response.json();
                alert(data.message || "Success");
    
                onClose();
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    /* ===================== LOAD STUDENT ===================== */

    useEffect(() => {
        if (!studentData) {
            setForm({
                name_tj: "",
                last_name_tj: "",
                name_en: "",
                last_name_en: "",
                name_kr: "",
                last_name_kr: "",
                email: "",
                phone: "",
                groups: [],
            });
            return ;
        }

        setForm({...studentData, groups: []});

        const loadStudentGroups = async () => {
            const res = await fetch(`${IP}/get-student-groups/${studentData.id}`, {
                headers: { token },
            });

            if (res.ok) {
                const { data } = await res.json();

                const normalized = data.map(g => ({ ...g, id: g.group_id }));

                setForm(prev => ({ ...prev, groups: normalized }));
            }
        };

        loadStudentGroups();
    }, [studentData]);

    /* ===================== LOAD GROUPS ===================== */

    useEffect(() => {
        const fetchGroups = async () => {
            const res = await fetch(`${IP}/get-groups`, {
                headers: { token },
            });

            if (res.ok) {
                const { data } = await res.json();

                // 🔴 НОРМАЛИЗАЦИЯ
                const normalized = data.map(g => ({
                    ...g,
                    group_name: g.name,
                }));

                setGroups(normalized);
            }
        };

        fetchGroups();
    }, []);

    /* ===================== UI ===================== */

    return (
        <div className={`modal-backdrop ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div className={`modal-card ${isOpen ? "open" : ""}`} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{studentData ? "Update Student" : "Create Student"}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <VscClose />
                    </button>
                </div>

                <form className="modal-form" onSubmit={onSubmit}>
                    <input placeholder="Name (TJ)" value={form.name_tj} onChange={e => setForm({ ...form, name_tj: e.target.value })} />
                    <input placeholder="Last Name (TJ)" value={form.last_name_tj} onChange={e => setForm({ ...form, last_name_tj: e.target.value })} />
                    <input placeholder="Name (EN)" value={form.name_en} onChange={e => setForm({ ...form, name_en: e.target.value })} />
                    <input placeholder="Last Name (EN)" value={form.last_name_en} onChange={e => setForm({ ...form, last_name_en: e.target.value })} />
                    <input placeholder="이름" value={form.name_kr} onChange={e => setForm({ ...form, name_kr: e.target.value })} />
                    <input placeholder="성" value={form.last_name_kr} onChange={e => setForm({ ...form, last_name_kr: e.target.value })} />
                    <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />

                    <Dropdown
                        options={groups.map(g => g.group_name)}
                        value="Choose group"
                        onChange={chooseGroup}
                    />

                    <div className="student-groups-container">
                        {/* {["language", "topik", "other"].map(type => (
                            <div key={type} className="group-row">
                                <span className="group-row-label">{type.toUpperCase()}:</span>

                                {groupedGroups[type].length === 0 ? (
                                    <span className="groups-placeholder">No groups</span>
                                ) : (
                                    groupedGroups[type].map(g => (
                                        <div key={g.id} className="group-chip">
                                            {g.group_name}
                                            <button type="button" className="remove-group-btn" onClick={() => removeGroup(g.id)}>
                                                <VscClose />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        ))} */}
                        {["Language", "Topik", "Other"].map(type => (
                            <div key={type} className="group-row">
                                <span className="group-row-label">{type.toUpperCase()}:</span>

                                {form.groups.filter(g => g.group_type === type).length === 0 ? (
                                    <span className="groups-placeholder">No groups</span>
                                ) : (
                                    form.groups.filter(g => g.group_type === type).map(g => (
                                        <div key={g.id} className="group-chip">
                                            {g.group_name}
                                            <button type="button" className="remove-group-btn" onClick={() => removeGroup(g.id)}>
                                                <VscClose />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        ))}
                    </div>

                    <button className="submit-btn" disabled={loading}>
                        {loading ? "Loading..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateStudentModal;
