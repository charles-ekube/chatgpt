import React, { useState } from 'react';
import { BottomSheet } from './BottomSheet';
import CustomButton from '../../utils/Button';
import { GalleryExport, Trash } from 'iconsax-react';
import { IonRange } from '@ionic/react';

interface CropOptionsModalProps {
    show: boolean;
    onClose: () => void;

}


export const RemoveObjectModal: React.FC<CropOptionsModalProps> = ({
    show,
    onClose,
}) => {



    return (
        <BottomSheet isOpen={show} onClose={onClose} height={'380px'}>
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
                    <span style={{ fontWeight: 600 }}>Remove Object</span>
                    <button
                        onClick={onClose}
                        style={{ border: "none", background: "none", color: "#1B42D2", fontSize: "16px" }}
                    >
                        Done
                    </button>
                </div>
                <div style={{ padding: '0 24px 24px' }}>

                    <div style={{ marginBottom: '16px' }}>
                        <span style={{ color: '#747474', fontSize: '13px' }}>Brush size</span>
                        <IonRange aria-label="Range" min={0} max={100} step={1}

                        // onIonChange={({ detail }) => console.log('ionChange emitted value: ' + detail.value)}

                        />

                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <CustomButton
                            backgroundColor="#005ECA"
                            borderColor="#005ECA"
                            textColor="#ffffff"
                            onClick={() => { }}
                        >
                            Remove Image (8C)
                        </CustomButton>
                    </div>

                </div>
            </div >
        </BottomSheet >
    );
};
