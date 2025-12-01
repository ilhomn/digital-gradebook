import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { VscAccount, VscCalendar, VscChromeClose, VscOrganization, VscPerson, VscPreview, VscShare } from 'react-icons/vsc';

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
                        <Link to='/main-page'><VscPreview /> Dashboard</Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/'><VscPerson /> Manage Users</Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/'><VscOrganization /> Manage Groups</Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/'><VscCalendar /> Time Slots</Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/'><VscShare /> Upload Students</Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/'>Database Reset</Link>
                    </li>
                    <li className='logout-btn'>
                        <button onClick={handleLogout}> Logout </button>
                    </li>
                </ul>
            </div>
        </aside> 
    );
};

export default Sidebar;