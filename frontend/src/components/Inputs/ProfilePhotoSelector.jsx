import React from 'react'
import { User, Upload, Trash } from 'lucide-react'
import { useState, useRef } from 'react';

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {




    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Update the image state
            setImage(file);

            // Generate preview URL from the file
            const preview = URL.createObjectURL(file);
            if (setPreview) {
                setPreview(preview)
            }
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);

        if (setPreview) {
            setPreview(null)
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <>
            <div className='flex justify-center mb-6'>
                <input
                    type="file"
                    accept='image/*'
                    ref={inputRef}
                    onChange={handleImageChange}
                    className='hidden'
                />

                {!image ? (
                    <div onClick={onChooseFile} className='w-20 h-20 flex items-center justify-center bg-rose-500/10 rounded-full relative cursor-pointer'>
                        <User className='text-4xl text-rose-500' />
                        <button
                            type='button'
                            className='w-8 h-8 flex items-center justify-center bg-rose-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                        >
                            <Upload className='size-5' />
                        </button>
                    </div>
                ) : (
                    <div className='relative'>
                        <img src={preview || previewUrl} alt="profile photo" className='w-20 h-20 rounded-full object-cover' />
                        <button type='button' className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer' onClick={handleRemoveImage}>
                            <Trash className='size-5' />
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProfilePhotoSelector