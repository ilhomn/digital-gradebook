import React, { forwardRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { VscAccount } from 'react-icons/vsc';

const Sidebar = ({ ref, isSidebarOpen }) => {
    const navigate = useNavigate();
    
    function handleLogout () {
        window.localStorage.removeItem("token");
        navigate("/");
        
        return null;
    }
    
    return (
        <aside ref={ref} className={`sidebar ${isSidebarOpen ? 'active': ''}`}>
            <div className='sidebar__header'>
                Sidebar Header
            </div>
            <div className='sidebar__content'>
                <div className='avatar'>
                    <VscAccount className='ico' />
                </div>
                <ul className='sidebar__list'>
                    <li className='sidebar__item'>
                        <Link to='/main-page'>Dashboard</Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/'>Manage Users</Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/'>Manage Groups</Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/'>Time Slots</Link>
                    </li>
                    <li className='sidebar__item'>
                        <Link to='/'>Upload Students</Link>
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