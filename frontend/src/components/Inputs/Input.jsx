import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';


const Input = ({ value, onChange, label, placeholder, type }) => {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return <div>
        <label className=' text-[15px] md:text-[14px] text-slate-800'>{label}</label>

        <div className='input-box'>
            <input
                type={
                    type == "password" ? (showPassword ? "text" : "password") : type
                }
                placeholder={placeholder}
                className='w-full bg-transparent outline-none'
                value={value}
                onChange={(e) => onChange(e)}
            />

            {type === "password" && (
                <>
                    {showPassword ? (
                        <Eye
                            size={22}
                            className='text-neutral-600 cursor-pointer'
                            onClick={() => toggleShowPassword()}
                        />
                    ) : (
                        <EyeOff
                            size={22}
                            className='text-slate-400 cursor-pointer'
                            onClick={() => toggleShowPassword()}
                        />
                    )}
                </>
            )}
        </div>
    </div>

};

export default Input
