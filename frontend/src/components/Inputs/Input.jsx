import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, lable, type }) => {
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className='mb-4'>
            <label className='text-[13px] text-slate-800'>{lable}</label>
            <div className='input-box'>
                <input 
                    type={type == 'password' ? showPassword ? 'text' : 'password' : type}
                    placeholder={placeholder}  // اصلاح: palaceholder → placeholder
                    className='w-full bg-transparent outline-none '
                    value={value}
                    onChange={onChange}  // نیازی به e => onChange(e) نیست
                />
                {type === 'password' && (
                    <>
                        {showPassword ? (
                            <FaRegEye
                                size={22}
                                className='text-primary cursor-pointer '
                                onClick={() => toggleShowPassword()}
                            />

                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                className='text-slate-400 cursor-pointer'
                                onClick={() => toggleShowPassword()}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Input;