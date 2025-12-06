import React from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { VscAccount, VscChromeClose, VscPerson, VscPreview, VscDatabase, VscHome } from 'react-icons/vsc';

const Sidebar = ({ isSidebarOpen, handleClose, status }) => {
    
    function handleLogout () {
        window.localStorage.removeItem("token");
        window.location.reload();
    }
    
    return (
        <aside className={`sidebar ${isSidebarOpen ? 'active': ''}`} onClick={(e) => e.stopPropagation()}>
            <div className='sidebar__content'>
                <button className="sidebar__close-btn" onClick={handleClose}>
                    <VscChromeClose />
                </button>
                <div className='avatar'>
                    <VscAccount className='ico' />
                </div>
                <ul className='sidebar__list'>
                    <li className='sidebar__item'>
                        <Link to='/main-page'><VscPreview className="sidebar-icon"/> Dashboard</Link>
                    </li>
                    {status === "admin" && (
                        <li className='sidebar__item'>
                            <Link to='/admin-panel/manage'><VscPerson className="sidebar-icon"/> Admin Panel </Link>
                        </li>
                    )}
                    <li className='logout-btn'>
                        <button onClick={handleLogout}><VscHome className='sidebar-icon' /> Logout </button>
                    </li>
                </ul>
            </div>
        </aside> 
    );
};

export default Sidebar;