import React, { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const handleLogout = () => {
        clearUser();
        localStorage.clear();
        navigate("/");
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative flex  items-center" ref={dropdownRef}>
            <div
                className="border-2 border-neutral-200 rounded-full cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="w-11 h-11 rounded-full border-2 border-neutral-200 bg-pink-600 flex items-center justify-center text-2xl  font-semibold text-white overflow-hidden">
                    {user?.profileImageUrl ? (
                        <img
                            src={user?.profileImageUrl}
                            alt="User"
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        user?.name?.charAt(0)?.toUpperCase() || "U"
                    )}
                </div>

            </div>

            {isOpen && (
                <div className="absolute -right-7  md:-right-10  -bottom-12 w-30 bg-white border-1 border-gray-200   rounded-sm shadow-sm z-50 overflow-hidden">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm cursor-pointer text-rose-600  hover:bg-rose-400/5 font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileInfoCard;
