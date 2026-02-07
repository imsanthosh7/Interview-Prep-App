import React from 'react';
import { Link } from 'react-router-dom';
import ProfileInfoCard from '../Cards/ProfileInfoCard';

const Navbar = () => {
    return (
        <div className='h-20 bg-background/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 flex items-center mb-6'>
            <div className='w-full max-w-7xl mx-auto px-6 flex items-center justify-between'>
                <Link to="/" className="group">
                    <h2 className='text-xl font-display font-bold text-white tracking-tight flex items-center gap-1'>
                        INTERVIEW <span className='text-primary group-hover:animate-pulse'>.AI</span>
                    </h2>
                </Link>
                <ProfileInfoCard />
            </div>
        </div>
    )
}

export default Navbar;