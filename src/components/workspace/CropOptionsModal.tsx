import React from 'react';
import { BottomSheet } from './BottomSheet';
import { RatioOption } from '../../types/GeneralTypes';

interface CropOptionsModalProps {
    show: boolean;
    onClose: () => void;
    selectedRatio: RatioOption | null;
    onRatioSelect: (ratio: RatioOption) => void;
    onShowCustomRatio: () => void;
    ratioOptions: RatioOption[];
}

export const CropOptionsModal: React.FC<CropOptionsModalProps> = ({
    show,
    onClose,
    selectedRatio,
    onRatioSelect,
    onShowCustomRatio,
    ratioOptions,
}) => {
    return (
        <BottomSheet isOpen={show} onClose={onClose} height="410px">
            <div style={{ padding: '0 20px' }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                        borderBottom: '1px solid #EFEFEF',
                        padding: '8px 0 16px 0'
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{ border: "none", background: "none", color: "#666", fontSize: "16px" }}
                    >
                        Cancel
                    </button>
                    <span style={{ fontWeight: 600 }}>Crop</span>
                    <button
                        onClick={onClose}
                        style={{ border: "none", background: "none", color: "#005ECA", fontSize: "16px" }}
                    >
                        Apply
                    </button>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "12px",
                        marginBottom: "20px",
                    }}
                >
                    {ratioOptions.map((ratio) => {
                        // Parse the ratio to get width and height values
                        const [width, height] = ratio.value.split(':').map(Number);
                        // Calculate scaled dimensions while maintaining aspect ratio
                        const maxDimension = 16; // maximum size we want
                        let scaledWidth, scaledHeight;

                        if (width >= height) {
                            scaledWidth = maxDimension;
                            scaledHeight = (height / width) * maxDimension;
                        } else {
                            scaledHeight = maxDimension;
                            scaledWidth = (width / height) * maxDimension;
                        }

                        return ( // ✅ Added return statement here
                            <button
                                key={ratio.value}
                                onClick={() => onRatioSelect(ratio)}
                                style={{
                                    padding: "12px",
                                    border: `1px solid ${selectedRatio?.value === ratio.value ? "#005ECA" : "#E0E0E0"}`,
                                    borderRadius: "8px",
                                    background: "white",
                                    color: selectedRatio?.value === ratio.value ? "#005ECA" : "#666",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    // width: '75px',
                                    height: '41px'
                                }}
                            >
                                <div
                                    style={{
                                        width: `${scaledWidth}px`,
                                        height: `${scaledHeight}px`,
                                        border: '1px solid #AFAFAF',
                                        borderRadius: '2px'
                                    }}
                                />
                                <span style={{ color: '#AFAFAF', fontSize: '12px' }}>{ratio.label}</span>

                            </button>
                        );
                    })}

                    <button
                        onClick={onShowCustomRatio}
                        style={{
                            padding: "12px",
                            border: "1px solid #E0E0E0",
                            borderRadius: "8px",
                            background: "white",
                            color: "#666",
                        }}
                    >
                        Custom
                    </button>
                </div>
            </div>
        </BottomSheet>
    );
};