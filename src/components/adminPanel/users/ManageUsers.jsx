import { VscAccount } from 'react-icons/vsc';
import './ManageUsers.css';

const ManageUsers = () => {
    return (
        <div className="manage-users-wrapper">
            <div className='users-container'>
                <div className='user-card'>
                    <div className='user-avatar'> <VscAccount /> </div>
                    <div className='user-info'>
                        <span className='name'> full name </span>
                        <span className='status'> status </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
