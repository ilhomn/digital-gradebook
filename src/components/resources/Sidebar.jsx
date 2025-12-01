import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { VscAccount, VscCalendar, VscChromeClose, VscOrganization, VscPerson, VscPreview, VscShare, VscDatabase, VscHome } from 'react-icons/vsc';

const Sidebar = ({ isSidebarOpen, handleClose }) => {
    const navigate = useNavigate();
    
    function handleLogout () {
        window.localStorage.removeItem("token");
        navigate("/");
        
        return null;
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
                    <li className='sidebar__item'>
                        <Link to='/'><VscPerson className="sidebar-icon"/> Manage Users</Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/'><VscOrganization className="sidebar-icon"/> Manage Groups</Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/'><VscCalendar className="sidebar-icon"/> Time Slots</Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/'><VscShare className="sidebar-icon"/> Upload Students</Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/'><VscDatabase className="sidebar-icon"/> Database Reset</Link>
                    </li>
                    <li className='logout-btn'>
                        <button onClick={handleLogout}><VscHome className='sidebar-icon' /> Logout </button>
                    </li>
                </ul>
            </div>
        </aside> 
    );
};

export default Sidebar;