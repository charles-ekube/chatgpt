import React from 'react';
import { X, Upload } from 'lucide-react';
import { Add } from 'iconsax-react';
import CustomButton from '../../utils/Button';

interface MiniImageUploadModalProps {
    selectedImage: string | null;
    onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClose: () => void;
}

const MiniImageUploadModal: React.FC<MiniImageUploadModalProps> = ({
    selectedImage,
    onImageSelect,
    onClose,
}) => {
    return (
        <div className="mini-modal-overlay">
            <div style={{ width: '100%' }}>

                <div className="mini-modal-container">
                    <div className="mini-modal-header">
                        <h2 style={{ color: '#313131', fontSize: '14px' }}>Choose an image</h2>
                        <button style={{
                            border: '1px solid #313131',
                            borderRadius: '999px',
                            height: '20px',
                            width: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#fff'
                        }} onClick={onClose}>
                            <X size={16} color='#313131' />
                        </button>
                    </div>

                    <div className="mini-modal-content" style={{ padding: '0 16px 16px ' }}>
                        {!selectedImage ? (
                            <label className="upload-area">
                                <div style={{
                                    border: '1px solid #E6E6E6',
                                    height: '40px',
                                    width: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#fff',
                                    borderRadius: '999px'
                                }}>
                                    <div style={{
                                        border: '1px solid #005ECA',
                                        height: '20px',
                                        width: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#005ECA',
                                        borderRadius: '999px'
                                    }}>
                                        <Add color="white" size={24} />
                                    </div>
                                </div>

                                <span style={{
                                    color: '#313131',
                                    fontSize: '14px',
                                    paddingTop: '20px'
                                }}>Upload an image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={onImageSelect} // Use function from parent
                                    hidden
                                />
                            </label>
                        ) : (
                            <div className="image-preview">
                                <img src={selectedImage} alt="Selected" />
                                <div className="image-overlay">
                                    <span>Tap here to change image</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <CustomButton
                        backgroundColor={selectedImage ? '#1B42D2' : " #484848"}
                        borderColor={selectedImage ? '#1B42D2' : " #484848"}
                        textColor="#ffffff"
                        onClick={onClose}
                    >
                        Continue
                    </CustomButton>
                </div>
            </div>


        </div>
    );
};

export default MiniImageUploadModal;
