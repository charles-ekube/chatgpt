// ImageUploader.tsx
import { Add } from 'iconsax-react';
import React, { useRef } from 'react';

interface ImageStyle {
    width: string;
    height: string;
    objectFit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

interface ImageUploaderProps {
    selectedImage: string | null;
    imageStyle: ImageStyle;
    onImageUpload: (file: File) => void;
    height?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    selectedImage,
    imageStyle,
    onImageUpload,
    height = "300px"
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                onImageUpload(file);
            } else {
                alert("Please upload an image file");
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
            />

            <div
                onClick={triggerFileInput}
                style={{
                    width: "100%",
                    height: height,
                    border: "2px dashed #E0E0E0",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {selectedImage ? (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        <img
                            src={selectedImage}
                            alt="Preview"
                            style={{
                                ...imageStyle,
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>
                ) : (
                    <>
                        <div style={{
                            border: '1px solid #E6E6E6',
                            height: '66px',
                            width: '66px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#fff',
                            borderRadius: '999px'
                        }}>
                            <div style={{
                                border: '1px solid #005ECA',
                                height: '38px',
                                width: '38px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#005ECA',
                                borderRadius: '999px'
                            }}>
                                <Add color="white" size={24} />
                            </div>
                        </div>
                        <p style={{ color: "#666666", margin: 0 }}>Upload an image</p>
                    </>
                )}
            </div>
        </>
    );
};