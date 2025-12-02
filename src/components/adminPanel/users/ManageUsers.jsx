import { useState } from "react";
import { VscAccount, VscCalendar, VscEdit, VscMortarBoard, VscOrganization, VscPerson, VscShare, VscTrash } from "react-icons/vsc";
import "./ManageUsers.css";
import ArrowToggle from "../../resources/ArrowToggle";
import { useNavigate } from "react-router-dom";
import UserModal from "../../resources/UserModal";

const ManageUsers = () => {
    const navigate = useNavigate();

    const [openUsers, setOpenUsers] = useState(false);
    const [openGroups, setOpenGroups] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const onClose = () => {
        setIsUserModalOpen(false);
    };

    const onSubmit = (form) => {
        console.log(form);
    };

    return (
        <div className="manage-users-wrapper">
            <UserModal isOpen={isUserModalOpen} onClose={onClose} onSubmit={onSubmit} />
            <div className="glass-board">

                <div className="top-actions-cards">
                    <div className="action-card create-user" onClick={() => setIsUserModalOpen(true)}>
                        <VscAccount className="card-icon" />
                        <span> Create User </span>
                    </div>
                    <div className="action-card create-group">
                        <VscMortarBoard className="card-icon" />
                        <span>Create Group</span>
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
                            {[1,2,3,4,5,6,7,8].map((i) => (
                                <div className="user-card" key={i}>
                                    <div className="status-badge">Admin</div>
                                    <div className="user-avatar">
                                        <VscAccount className="avatar" />
                                    </div>
                                    <div className="user-info">
                                        <span className="name">Shokiri Muhammadrizo</span>
                                    </div>
                                    <div className="manage">
                                        <button><VscEdit /></button>
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
