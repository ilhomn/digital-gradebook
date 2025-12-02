import { useState } from "react";
import { VscAccount, VscEdit, VscTrash } from "react-icons/vsc";
import "./ManageUsers.css";
import ArrowToggle from "../../resources/ArrowToggle";

const ManageUsers = () => {
    const [openUsers, setOpenUsers] = useState(true);
    const [openGroups, setOpenGroups] = useState(false);

    return (
        <div className="manage-users-wrapper">
            <div className="glass-board">

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
