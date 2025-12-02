import { VscAccount, VscEdit, VscTrash } from 'react-icons/vsc';
import './ManageUsers.css';

const ManageUsers = () => {
    return (
        <div className="manage-users-wrapper">
            <div className="glass-board">
                <div className='users-container'>
                    <div className='user-card'>

                        {/* STATUS IN CORNER */}
                        <span className='status-badge'> status </span>

                        <div className='user-avatar'> 
                            <VscAccount className='avatar' /> 
                        </div>

                        <div className='user-info'>
                            <span className='name'> full name </span>
                            <span className='created-at'> created at </span>
                        </div>

                        <div className='manage'>
                            <button> <VscEdit /> </button>
                            <button> <VscTrash /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
