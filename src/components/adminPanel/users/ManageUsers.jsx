import { useEffect, useState } from "react";
import { VscAccount, VscCalendar, VscEdit, VscMortarBoard, VscOrganization, VscPerson, VscShare, VscTrash } from "react-icons/vsc";
import "./ManageUsers.css";
import ArrowToggle from "../../resources/ArrowToggle";
import { useNavigate } from "react-router-dom";
import UserModal from "../../resources/UserModal";
import IP from "../../../config";

const ManageUsers = () => {
    const navigate = useNavigate();
    const token = window.localStorage.getItem("token");

    const [openUsers, setOpenUsers] = useState(false);
    const [openGroups, setOpenGroups] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [ users, setUsers ] = useState([]);
    const [ userData, setUserData ] = useState(null);

    const onClose = () => {
        setIsUserModalOpen(false);
    };

    const handleEditClick = (user) => {
        setIsUserModalOpen(true);
        setUserData(user);
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
                        "new_korean_first_name": form.korean_first_name,
                        "new_korean_last_name": form.korean_last_name,
                        "new_english_first_name": form.english_first_name,
                        "new_english_last_name": form.english_last_name,
                        "new_status": form.status,
                        "new_email": form.email,
                    }),
                });

            }
            else {
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
            const usersResponse = await fetch(`${IP}/get-all-users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                }
            });
        
            if (usersResponse.ok) {
                const { data } = await usersResponse.json();
                
                setUsers(data);
            }
        }

        fetchData();
    }, [token]);

    return (
        <div className="manage-users-wrapper">
            <UserModal isOpen={isUserModalOpen} onClose={onClose} onSubmit={onSubmit} userData={userData} />
            <div className="glass-board">

                <div className="top-actions-cards">
                    <div className="action-card create-user" onClick={() => setIsUserModalOpen(true)}>
                        <VscAccount className="card-icon" />
                        <span> Create User </span>
                    </div>
                    <div className="action-card create-group">
                        <VscMortarBoard className="card-icon" />
                        <span> Create Group </span>
                    </div>
                    <div className="action-card create-user" onClick={() => navigate('/admin-panel/create-time-slots')}>
                        <VscCalendar className="card-icon" />
                        <span> Create Timeslot </span>
                    </div>
                    <div className="action-card create-user">
                        <VscShare className="card-icon" />
                        <span> Upload Students </span>
                    </div>
                </div>

                {/* USERS SECTION */}
                <div className="collapsible-section">
                    <div 
                        className="section-header"
                        onClick={() => setOpenUsers(!openUsers)}
                    >
                        <span>Users</span>
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
                                        <span className="name">{user.english_last_name} {user.english_first_name}</span>
                                    </div>
                                    <div className="manage">
                                        <button onClick={() => handleEditClick(user)}><VscEdit /></button>
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
                        <span>Groups</span>
                        <span className="arrow"> <ArrowToggle open={openGroups} onClick={() => setOpenGroups(!openGroups)} /> </span>
                    </div>

                    <div className={`collapsible-content ${openGroups ? "open" : ""}`}>
                        <div className="groups-list">
                            {[1,2,3,4,5].map(i => (
                                <div className="group-card" key={i}>
                                    <div className="card-group-name">Group {i}</div>
                                    <div className="card-teacher-name">Teacher A</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageUsers;
