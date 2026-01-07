import React, { useRef, useState, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (image && image instanceof File) {
            const preview = URL.createObjectURL(image);
            setPreviewUrl(preview);
            
            return () => {
                URL.revokeObjectURL(preview);
            };
        } else {
            setPreviewUrl(null);
        }
    }, [image]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const onChooseFile = (e) => {
        e?.stopPropagation?.();
        inputRef.current.click(); 
    };

    return (
        <div className='flex justify-center mb-6'>
            <input
                type='file'
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!previewUrl && !image && (
                <div className='relative'>
                    <div 
                        className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full cursor-pointer hover:bg-purple-200 transition-colors'
                        onClick={onChooseFile}
                    >
                        <LuUser className='text-4xl text-primary' />
                    </div>
                    <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 hover:bg-primary-dark transition-colors'
                        onClick={onChooseFile}
                    >
                        <LuUpload />
                    </button>
                </div>
            )}

            {previewUrl && (
                <div className='relative'>
                    <div 
                        className='w-20 h-20 rounded-full overflow-hidden cursor-pointer border-2 border-gray-200'
                        onClick={onChooseFile}
                    >
                        <img 
                            src={previewUrl}
                            alt='profile preview'
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-red-600 transition-colors'
                        onClick={handleRemoveImage}
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfilePhotoSelector;