interface CustomRatioModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    customWidth: string;
    customHeight: string;
    onWidthChange: (value: string) => void;
    onHeightChange: (value: string) => void;
}

export const CustomRatioModal: React.FC<CustomRatioModalProps> = ({
    show,
    onClose,
    onConfirm,
    customWidth,
    customHeight,
    onWidthChange,
    onHeightChange,
}) => {
    if (!show) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1001,
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    padding: "24px",
                    width: "90%",
                    maxWidth: "400px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "24px",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            border: "none",
                            background: "none",
                            color: "#666",
                        }}
                    >
                        Cancel
                    </button>
                    <span style={{ fontWeight: 600 }}>Custom Size</span>
                    <button
                        onClick={onConfirm}
                        style={{
                            border: "none",
                            background: "none",
                            color: "#005ECA",
                        }}
                    >
                        Confirm
                    </button>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "24px",
                    }}
                >
                    <div style={{ flex: 1 }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                color: "#666",
                            }}
                        >
                            Width
                        </label>
                        <input
                            type="number"
                            value={customWidth}
                            onChange={(e) => onWidthChange(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #E0E0E0",
                                borderRadius: "8px",
                            }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                color: "#666",
                            }}
                        >
                            Height
                        </label>
                        <input
                            type="number"
                            value={customHeight}
                            onChange={(e) => onHeightChange(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #E0E0E0",
                                borderRadius: "8px",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};