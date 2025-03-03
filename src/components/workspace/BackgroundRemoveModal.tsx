import React, { useState } from 'react';
import { BottomSheet } from './BottomSheet';
import CustomButton from '../../utils/Button';
import { GalleryExport, Trash } from 'iconsax-react';

interface CropOptionsModalProps {
    show: boolean;
    onClose: () => void;
    selectedImage: string | null;
    onDeleteImage: () => void;
    openMiniUpload: () => void;
}

type Selected = {
    id: string;
    title: string;
};

export const BackgroundRemoveModal: React.FC<CropOptionsModalProps> = ({
    show,
    onClose,
    selectedImage,
    onDeleteImage,
    openMiniUpload
}) => {
    const buttons = [
        { id: 'RemoveBackground', title: 'Remove background' },
        { id: 'ReplaceBackground', title: 'Replace background' }
    ];

    // ✅ Set default selected button
    const [selectedFunction, setSelectedFunction] = useState<Selected>(buttons[0]);

    const selectFunction = (item: Selected) => {
        setSelectedFunction(item);
    };

    return (
        <BottomSheet isOpen={show} onClose={onClose} height={selectedFunction?.id === 'RemoveBackground' ? '350px' : '550px'}>
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
                    <span style={{ fontWeight: 600 }}>Background Remover</span>
                    <button
                        onClick={onClose}
                        style={{ border: "none", background: "none", color: "#005ECA", fontSize: "16px" }}
                    >
                    </button>
                </div>
                <div style={{ padding: '0 24px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {buttons.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => selectFunction(item)}
                                style={{
                                    backgroundColor: selectedFunction?.id === item.id ? '#EEF3F9' : 'inherit',
                                    borderColor: selectedFunction?.id === item.id ? '#EEF3F9' : '#ECECEC',
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    height: '35px',
                                    borderRadius: '999px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    width: '100%',
                                    cursor: 'pointer' // 🟢 Allow clicking to select
                                }}
                            >
                                <span style={{ color: '#6C6C6C', fontSize: '11px' }}>
                                    {item.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div style={{ paddingTop: '24px' }}>
                        {selectedFunction?.id === 'RemoveBackground' &&
                            <CustomButton
                                backgroundColor="#005ECA"
                                borderColor="#005ECA"
                                textColor="#ffffff"
                                onClick={() => { }}
                            >
                                Remove Background (7C)
                            </CustomButton>}

                        {selectedFunction?.id === 'ReplaceBackground' &&
                            <>
                                <div>
                                    <label style={{
                                        color: '#747474',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                    }}>Prompt</label>
                                    <textarea style={{
                                        width: '100%',
                                        background: '#fff',
                                        borderRadius: '8px',
                                        border: '1px solid #DAE1EA',
                                        margin: '10px 0 16px 0',
                                        height: '87px',
                                        outline: 'none',
                                        fontSize: '13px',
                                        padding: '10px'
                                    }}></textarea>
                                </div>
                                <div style={{ marginBottom: '20px' }}>


                                    {selectedImage ?
                                        <div style={{
                                            border: '1px solid #AFD0F8',
                                            borderRadius: '999px',
                                            height: '47px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '0 16px'
                                        }}>

                                            <img src={selectedImage} style={{
                                                height: '24px',
                                                width: '24px',
                                                borderRadius: '4px',
                                            }} />

                                            <p style={{
                                                color: '#747474',
                                                fontSize: '13px'
                                            }}
                                                onClick={openMiniUpload}
                                            >Change image</p>

                                            <Trash color='#747474' onClick={onDeleteImage} />

                                        </div> : <CustomButton
                                            backgroundColor="#fff"
                                            borderColor="#DAE1EA"
                                            textColor="#747474"
                                            onClick={openMiniUpload}
                                            icon={<GalleryExport
                                                size="20"
                                                color="#747474"
                                            />}
                                        >
                                            Upload an image instead
                                        </CustomButton>
                                    }
                                </div>
                                <div>
                                    <CustomButton
                                        backgroundColor="#005ECA"
                                        borderColor="#005ECA"
                                        textColor="#ffffff"
                                        onClick={() => { }}
                                    >
                                        Remove Background (9C)
                                    </CustomButton>
                                </div>

                            </>
                        }
                    </div>

                </div>
            </div>
        </BottomSheet>
    );
};
