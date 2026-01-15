import { useEffect, useState } from "react";
import { VscAccount, VscArrowUp, VscCalendar, VscEdit, VscMortarBoard, VscOrganization, VscPerson, VscShare, VscTrash } from "react-icons/vsc";
import "./Manage.css";
import ArrowToggle from "../../components/ArrowToggle";
// import { useNavigate } from "react-router-dom";
import UserModal from "../../components/UserModal";
import IP, { interfaceLangs } from "../../config";
import GroupsModal from "../../components/GroupsModal";
import CreateTimeSlotsModal from "../../components/CreateTimeSlotModal";
import UploadStudentsModal from "../../components/UploadStudentsModal";
import { PiStudent } from "react-icons/pi";
import CreateStudentModal from "../../components/CreateStudentModal";
import { useNavigate, useOutletContext } from "react-router-dom";

const ManageUsers = () => {
    const { lang, setLang, token } = useOutletContext();
    const navigate = useNavigate();
    // const navigate = useNavigate();

    const [openUsers, setOpenUsers] = useState(false);
    const [openStudents, setOpenStudents] = useState(false);
    const [openGroups, setOpenGroups] = useState(false);
    const [openTimeslots, setOpenTimeslots] = useState(false);

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [isTimeSlotsOpen, setIsTimeSlotsOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isCreateStudentOpen, setIsCreateStudentOpen] = useState(false);

    const [users, setUsers] = useState([]);
    const [students, setStudents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [timeslots, setTimeslots] = useState([]);

    const [userData, setUserData] = useState(null);
    const [studentData, setStudentData] = useState(null);

    const onClose = () => {
        setIsUserModalOpen(false);
        setUserData(null);
    };

    const handleEditClick = (user) => {
        setIsUserModalOpen(true);
        setUserData(user);
    };

    const onUpload = async (file) => {
        if (!file) {
            alert("Ты хотябы мяу мяу скажи");
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${IP}/upload-students`, {
                method: "POST",
                headers: {
                    "token": token,
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();

                alert(data.message);
            } else {
                alert("Error while uploading students");
            }
        } catch (error) {
            console.error(error);
        }
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

    const onSubmit = async (form) => {
        try {
            let response;
            if (userData) {
                response = await fetch(`${IP}/update-user/${userData.username}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token,
                    },
                    body: JSON.stringify({
                        "new_username": form.username,
                        "new_password": form.password,
                        "new_name_tj": form.name_tj,
                        "new_last_name_tj": form.last_name_tj,
                        "new_name_kr": form.name_kr,
                        "new_last_name_kr": form.last_name_kr,
                        "new_name_en": form.name_en,
                        "new_last_name_en": form.last_name_en,
                        "new_status": form.status,
                        "new_email": form.email,
                        "new_phone": form.phone,
                    }),
                });

            }
            else {
                // Register in firesbase auth
                response = await fetch(`${IP}/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                });
            }
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);

            alert("Error while creating user");
        }
    };

    useEffect(() => {
        async function fetchData() {
            // Redirect if no token
            if (!token) {
                navigate("/");
                return;
            }
            try {
                const usersResponse = await fetch(`${IP}/get-all-users`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token,
                    }
                });

                if (usersResponse.ok) {
                    const { data } = await usersResponse.json();

                    // sort data by id
                    await data.sort((a, b) => a.id - b.id);
                    setUsers(data);
                }

                const groupsResponse = await fetch(`${IP}/get-groups`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token,
                    },
                });

                if (groupsResponse.ok) {
                    const { data } = await groupsResponse.json();

                    if (data.length === 0) {
                        console.log("No groups found");
                    }

                    await data.sort((a, b) => a.id - b.id);
                    setGroups(data);
                }

                const studentsResponse = await fetch(`${IP}/get-students`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token,
                    },
                });

                if (studentsResponse.ok) {
                    const { data } = await studentsResponse.json();

                    if (data.length === 0) {
                        console.log("No students found");
                    }

                    await data.sort((a, b) => a.id - b.id);
                    setStudents(data);
                }

                const timeslotsResponse = await fetch(`${IP}/get-timeslots`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token,
                    },
                });

                if (timeslotsResponse.ok) {
                    const { data } = await timeslotsResponse.json();

                    if (data.length === 0) {
                        console.log("No timeslots found");
                    }

                    await data.sort((a, b) => a.id - b.id);
                    setTimeslots(data);
                }

            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [navigate, token]);

    return (
        <div className="manage-users-wrapper">
            <UserModal isOpen={isUserModalOpen} onClose={() => {
                onClose()
                setUserData(null);
            }} onSubmit={onSubmit} userData={userData} />
            <GroupsModal token={token} isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} onSubmit={submitGroup} />
            <CreateTimeSlotsModal token={token} isOpen={isTimeSlotsOpen} onClose={() => setIsTimeSlotsOpen(false)} />
            <UploadStudentsModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} onUpload={onUpload} />
            <CreateStudentModal isOpen={isCreateStudentOpen} onClose={() => {
                setIsCreateStudentOpen(false)
                setStudentData(null);
            }} studentData={studentData} token={token} />
            <div className="glass-board">

                <div className="top-actions-cards">
                    <div className="action-card create-user" onClick={() => setIsUserModalOpen(true)}>
                        <VscAccount className="card-icon" />
                        <span> {interfaceLangs[lang].manage.createUser} </span>
                    </div>
                    <div className="action-card create-group" onClick={() => setIsGroupModalOpen(true)}>
                        <VscMortarBoard className="card-icon" />
                        <span> {interfaceLangs[lang].manage.createGroup} </span>
                    </div>
                    <div className="action-card create-user" onClick={() => setIsTimeSlotsOpen(true)}>
                        <VscCalendar className="card-icon" />
                        <span> {interfaceLangs[lang].manage.createTimeslot} </span>
                    </div>
                    <div className="action-card create-user" onClick={() => setIsUploadModalOpen(true)}>
                        <VscShare className="card-icon" />
                        <span> {interfaceLangs[lang].manage.uploadStudents} </span>
                    </div>
                    <div className="action-card create-user" onClick={() => setIsCreateStudentOpen(true)}>
                        <PiStudent className="card-icon" />
                        <span> {interfaceLangs[lang].manage.createStudent} </span>
                    </div>
                </div>

                {/* USERS SECTION */}
                <div className="collapsible-section">
                    <div
                        className="section-header"
                        onClick={() => setOpenUsers(!openUsers)}
                    >
                        <span>{interfaceLangs[lang].manage.users}</span>
                        <span className="arrow"> <ArrowToggle open={openUsers} onClick={() => setOpenUsers(!openUsers)} /> </span>
                    </div>

                    <div className={`collapsible-content ${openUsers ? "open" : ""}`}>
                        <div className="users-grid">
                            {users.length > 0 && users.map((user, index) => (
                                <div className="user-card" key={index}>
                                    <div className="status-badge"> {user.status} </div>
                                    <div className="user-avatar">
                                        <VscAccount className="avatar" />
                                    </div>
                                    <div className="user-info">
                                        <span className="name">{user.last_name_en} {user.name_en}</span>
                                    </div>
                                    <div className="user-contact">
                                        <div className="contact-item">{user.email}</div>
                                        <div className="contact-item">{user.phone}</div>
                                    </div>
                                    <div className="manage">
                                        <button onClick={() => handleEditClick(user)}><VscEdit /></button>
                                        <button><VscTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Button for scrolling to top glass board */}
                        {/* <button className="move-up-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <VscArrowUp />
                        </button> */}
                    </div>
                </div>

                {/* STUDENTS SECTION */}
                <div className="collapsible-section">
                    <div className="section-header" onClick={() => setOpenStudents(!openStudents)}>
                        <span> {interfaceLangs[lang].manage.students} </span>
                        <span className="arrow"> <ArrowToggle open={openStudents} onClick={() => setOpenStudents(!openStudents)} /> </span>
                    </div>

                    <div className={`collapsible-content ${openStudents ? 'open' : ''}`}>
                        <div className="users-grid">
                            {students.length > 0 && students.map((student, index) => (
                                <div className="user-card" key={index}>
                                    <div className="status-badge">{student.id}</div>
                                    <div className="user-avatar">
                                        <VscPerson className="avatar" />
                                    </div>
                                    <div className="user-info">
                                        <span className="name">{student.last_name_en} {student.name_en}</span>
                                    </div>
                                    <div className="user-contact">
                                        <div className="contact-item">{student.email}</div>
                                        <div className="contact-item">{student.phone}</div>
                                    </div>
                                    <div className="manage">
                                        <button><VscEdit onClick={() => {
                                            setStudentData(student);
                                            setIsCreateStudentOpen(true);
                                        }} /></button>
                                        <button><VscTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* GROUPS SECTION */}
                <div className="collapsible-section">
                    <div
                        className="section-header"
                        onClick={() => setOpenGroups(!openGroups)}
                    >
                        <span>{interfaceLangs[lang].manage.groups}</span>
                        <span className="arrow"> <ArrowToggle open={openGroups} onClick={() => setOpenGroups(!openGroups)} /> </span>
                    </div>

                    <div className={`collapsible-content ${openGroups ? "open" : ""}`}>
                        <div className="groups-list">
                            {groups.length > 0 && groups.map((item, i) => (
                                <div className="group-card" onClick={() => window.open(`/students-list/${item.id}`, '_blank')} key={i}>
                                    <div className="card-group-name">{item.name}</div>
                                    <div className="card-teacher-name">{item.teacher_name_en}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* TIMESLOTS SECTION */}
                <div className="collapsible-section">
                    <div className="section-header" onClick={() => setOpenTimeslots(!openTimeslots)}>
                        <span> {interfaceLangs[lang].manage.timeslots} </span>
                        <span className="arrow"> <ArrowToggle open={openTimeslots} onClick={() => setOpenTimeslots(!openTimeslots)} /> </span>
                    </div>

                    <div className={`collapsible-content ${openTimeslots ? 'open' : ''}`}>
                        <div className="timeslots-list">
                            {timeslots.length > 0 && timeslots.map((item, index) =>
                                <div className="timeslot-card" key={index}>
                                    <div className="timeslot-id-badge"> {item.id} </div>
                                    <div className="timeslot-name"> {item.name} </div>
                                    <div className="timeslot-actions">
                                        <button> <VscEdit /> </button>
                                        <button> <VscTrash /> </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
