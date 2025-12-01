import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ ref }) => {
    return (
        <aside ref={ref} className='sidebar'>
            <div className='sidebar__header'>
                Sidebar Header
            </div>
            <div className='sidebar__content'>
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
                </ul>
            </div>
        </aside> 
    );
};

export default Sidebar;