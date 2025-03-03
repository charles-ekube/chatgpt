import React from 'react';
import { BottomSheet } from './BottomSheet';

interface AspectRatio {
    value: string;
    label: string;
}

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSize: string;
    onSizeChange: (size: string) => void;
    numberOfImages: number;
    onNumberOfImagesChange: (num: number) => void;
    aspectRatios: AspectRatio[];
}

const TextToImageSettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    selectedSize,
    onSizeChange,
    numberOfImages,
    onNumberOfImagesChange,
    aspectRatios
}) => {
    const getScaledDimensions = (ratio: AspectRatio) => {
        const [width, height] = ratio.value.split(':').map(Number);
        const maxDimension = 16;
        let scaledWidth: number, scaledHeight: number;

        if (width >= height) {
            scaledWidth = maxDimension;
            scaledHeight = (height / width) * maxDimension;
        } else {
            scaledHeight = maxDimension;
            scaledWidth = (width / height) * maxDimension;
        }

        return { scaledWidth, scaledHeight };
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose} height="420px">
            <div className="ion-padding">
                <div style={{ marginBottom: '16px', padding: '10px 0', position: 'relative' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, textAlign: 'center' }}>Settings</h3>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#616161',
                            fontSize: '13px',
                            position: 'absolute',
                            right: '10px',
                            top: '15px'
                        }}
                    >
                        Done
                    </button>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '13px', marginBottom: '10px', color: '#747474' }}>Size</h4>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '8px',
                        marginBottom: '8px'
                    }}>
                        {aspectRatios.map((ratio) => {
                            const { scaledWidth, scaledHeight } = getScaledDimensions(ratio);

                            return (
                                <button
                                    key={ratio.value}
                                    onClick={() => onSizeChange(ratio.value)}
                                    style={{
                                        padding: '8px',
                                        border: `1px solid ${selectedSize === ratio.value ? '#007AFF' : '#E5E5EA'}`,
                                        borderRadius: '8px',
                                        background: selectedSize === ratio.value ? '#F0F7FF' : 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        width: '75px',
                                        height: '41px'
                                    }}
                                >
                                    <div style={{
                                        width: `${scaledWidth}px`,
                                        height: `${scaledHeight}px`,
                                        border: '1px solid #AFAFAF',
                                        borderRadius: '2px'
                                    }} />
                                    <span style={{ color: '#AFAFAF', fontSize: '12px' }}>{ratio.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <h4 style={{ fontSize: '13px', marginBottom: '16px', color: '#747474' }}>Number of images</h4>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '8px'
                    }}>
                        {[1, 2, 3, 4].map((num) => (
                            <button
                                key={num}
                                onClick={() => onNumberOfImagesChange(num)}
                                style={{
                                    padding: '8px 16px',
                                    border: `1px solid ${numberOfImages === num ? '#007AFF' : '#E5E5EA'}`,
                                    borderRadius: '8px',
                                    background: numberOfImages === num ? '#F0F7FF' : 'white',
                                    color: '#AFAFAF',
                                    fontSize: '15px',
                                    width: '75px',
                                    height: '41px'
                                }}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </BottomSheet>
    );
};

export default TextToImageSettingsModal;