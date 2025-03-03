import React, { useState } from 'react';
import { BottomSheet } from './BottomSheet';
import { IonRange } from '@ionic/react';

interface CropOptionsModalProps {
    show: boolean;
    onClose: () => void;
    onRatioSelect: (ratio: { width: number; height: number }) => void;
}

const RATIO_OPTIONS = [
    { name: 'Portrait', width: 9, height: 16 },
    { name: 'Landscape', width: 16, height: 9 },
    { name: 'Square', width: 10, height: 10 },
];

export const TextToVideoSettingsModal: React.FC<CropOptionsModalProps> = ({
    show,
    onClose,
    onRatioSelect,
}) => {
    const [selectedRatio, setSelectedRatio] = useState(RATIO_OPTIONS[0]); // Default to Portrait

    const handleRatioClick = (ratio: typeof RATIO_OPTIONS[number]) => {
        setSelectedRatio(ratio);
        onRatioSelect({ width: ratio.width, height: ratio.height });
    };

    return (
        <BottomSheet isOpen={show} onClose={onClose} height="420px">
            <div>
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                        borderBottom: '1px solid #EFEFEF',
                        padding: '10px 16px 16px 16px',
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{ border: "none", background: "none", color: "#666", fontSize: "13px" }}
                    >
                        Cancel
                    </button>
                    <span style={{ fontWeight: 600, fontSize: '16px' }}>Settings</span>
                    <button
                        onClick={onClose}
                        style={{ border: "none", background: "none", color: "#005ECA", fontSize: "13px" }}
                    >
                        Done
                    </button>
                </div>

                {/* Size Selector */}
                <div style={{ padding: '0 24px' }}>
                    <p style={{ color: '#747474', fontSize: '13px', paddingBottom: '20px' }}>Size</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {RATIO_OPTIONS.map((ratio) => (
                            <div
                                key={ratio.name}
                                onClick={() => handleRatioClick(ratio)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    borderRadius: '4px',
                                    transition: 'border 0.3s ease',
                                }}
                            >
                                <div
                                    style={{
                                        border: selectedRatio.name === ratio.name ? '1px solid #005ECA' : '1px solid #AFAFAF',
                                        borderRadius: '4px',
                                        height: ratio.height * 5,
                                        width: ratio.width * 5,
                                        // background: selectedRatio.name === ratio.name ? '#005ECA' : 'transparent',
                                    }}
                                />
                                <p style={{ fontSize: '13px', color: '#747474' }}>{ratio.name}</p>
                            </div>
                        ))}
                    </div>

                    {/* Duration Selector */}
                    <div style={{ margin: '30px 0' }}>
                        <span style={{ color: '#747474', fontSize: '13px' }}>Duration</span>
                        <IonRange
                            aria-label="Range with ticks"
                            ticks={true}
                            snaps={true}
                            min={5}
                            max={15}
                            step={5}
                        />
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: '13px',
                                color: '#747474',
                            }}
                        >
                            <span>5s</span>
                            <span>10s</span>
                            <span>15s</span>
                        </div>
                    </div>
                </div>
            </div>
        </BottomSheet>
    );
};
