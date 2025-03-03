import React, { useState } from 'react';
import { BottomSheet } from './BottomSheet';
import CustomButton from '../../utils/Button';
import { GalleryExport, Trash } from 'iconsax-react';

interface CropOptionsModalProps {
    show: boolean;
    onClose: () => void;

}

type Selected = {
    id: string;
    title: string;
};

export const ImageUpscaleModal: React.FC<CropOptionsModalProps> = ({
    show,
    onClose,
}) => {
    const buttons = [
        { id: '2K', title: '2K' },
        { id: '4K', title: '4K' },
        { id: '8K', title: '8K' },
    ];

    // ✅ Set default selected button
    const [selectedFunction, setSelectedFunction] = useState<Selected>(buttons[0]);

    const selectFunction = (item: Selected) => {
        setSelectedFunction(item);
    };

    return (
        <BottomSheet isOpen={show} onClose={onClose} height={'350px'}>
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                        borderBottom: '1px solid #EFEFEF',
                        padding: '24px 16px 16px 16px'
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{ border: "none", background: "none", color: "#666", fontSize: "16px" }}
                    >
                        Undo
                    </button>
                    <span style={{ fontWeight: 600 }}>Image Upscaler</span>
                    <button
                        onClick={onClose}
                        style={{ border: "none", background: "none", color: "#616161", fontSize: "16px" }}
                    >
                        Compare
                    </button>
                </div>
                <div style={{ padding: '0 24px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {buttons.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => selectFunction(item)}
                                style={{
                                    backgroundColor: selectedFunction?.id === item.id ? '#1B42D2' : 'inherit',
                                    borderColor: selectedFunction?.id === item.id ? '#1B42D2' : '#ECECEC',
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    height: '48px',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    width: '100%',
                                    cursor: 'pointer' // 🟢 Allow clicking to select
                                }}
                            >
                                <span style={{ color: selectedFunction?.id === item.id ? "#fff" : '#6C6C6C', fontSize: '16px' }}>
                                    {item.title}
                                </span>
                            </div>
                        ))}
                    </div>


                    <div style={{ marginTop: '30px' }}>
                        <CustomButton
                            backgroundColor="#005ECA"
                            borderColor="#005ECA"
                            textColor="#ffffff"
                            onClick={() => { }}
                        >
                            Upscale image (7C)
                        </CustomButton>
                    </div>

                </div>
            </div >
        </BottomSheet >
    );
};
