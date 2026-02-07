import React, { useState, useRef } from 'react';
import { User, Upload, Trash } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            if (setPreview) setPreview(preview);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        setImage(null);
        setPreviewUrl(null);
        if (setPreview) setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const onChooseFile = () => inputRef.current.click();

    return (
        <div className='flex justify-center mb-6'>
            <input
                type="file"
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!image ? (
                <div onClick={onChooseFile} className='w-24 h-24 flex items-center justify-center bg-card border-2 border-dashed border-muted-foreground/30 hover:border-primary rounded-full relative cursor-pointer group transition-all duration-300'>
                    <User className='w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors' />
                    <div className='absolute -bottom-1 -right-1'>
                        <div className='bg-primary text-black p-1.5 rounded-full'>
                            <Upload className='w-4 h-4' />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='relative group'>
                    <img src={preview || previewUrl} alt="profile photo" className='w-24 h-24 rounded-full object-cover border-2 border-primary' />
                    <Button
                        type='button'
                        size="icon"
                        variant="destructive"
                        className='absolute -bottom-1 -right-1 h-8 w-8 rounded-full'
                        onClick={handleRemoveImage}
                    >
                        <Trash className='w-4 h-4' />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;