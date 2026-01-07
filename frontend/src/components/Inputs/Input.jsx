import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, palaceholder, lable, type }) => {
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className=''>
            <label className='text-[13px] text-slate-800'>{lable}</label>
            <div className='input-box'>
                <input type={type == 'password' ? showPassword ? 'text' : 'password' : type}
                    palaceholder={palaceholder}
                    className='w-full bg-transparent outline-none '
                    value={value}
                    onChange={(e) => onChange(e)}
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
