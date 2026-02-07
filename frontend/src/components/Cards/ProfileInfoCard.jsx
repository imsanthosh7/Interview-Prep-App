import React, { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const ProfileInfoCard = () => {
    const { user, clearUser, loading } = useContext(UserContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const dropdownRef = useRef();

    const handleLogout = () => {
        clearUser();
        localStorage.clear();
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => setImageError(false), [user?.profileImageUrl]);

    return (
        <div className="relative flex items-center z-50" ref={dropdownRef}>
            <div
                className="cursor-pointer group flex items-center gap-3"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">Expert</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center group-hover:border-primary transition-colors">
                    {loading ? (
                        <div className="w-full h-full animate-pulse bg-white/10"></div>
                    ) : user?.profileImageUrl && !imageError ? (
                        <img
                            src={user.profileImageUrl}
                            alt="User"
                            className="w-full h-full object-cover"
                            onError={() => setImageError(true)}
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <span className="text-lg font-bold text-primary">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="absolute right-0 top-14 w-48 bg-card border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-3 border-b border-white/5 md:hidden">
                        <p className="text-sm font-medium text-white">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm cursor-pointer text-destructive hover:bg-destructive/10 font-medium transition-colors"
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
