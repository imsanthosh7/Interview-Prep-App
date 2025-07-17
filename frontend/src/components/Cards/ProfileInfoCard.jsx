import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';






const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        localStorage.clear();
        navigate("/");

    }

    return (
        user && (
            <div className='flex items-center'>
                <img
                    src={user.profileImageUrl}
                    alt="profile-image"
                    className="w-11 h-11 object-cover rounded-full mr-3 border border-gray-200 shadow-sm"
                />
                <div>
                    <div className='text-[15px] text-black font-bold leading-3'>
                        {user.name || ""}
                    </div>
                    <button className='text-[#670D2F] text-sm font-semibold cursor-pointer hover:underline' onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

        )
    )
}

export default ProfileInfoCard