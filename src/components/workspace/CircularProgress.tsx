// CircularProgress.tsx
import React from 'react';

interface CircularProgressProps {
    /** Progress value from 0 to 200 */
    value: number;
    /** Size of the circle in pixels */
    size?: number;
    /** Width of the progress stroke */
    strokeWidth?: number;
    /** Color of the background circle */
    backgroundColor?: string;
    /** Color of the progress circle */
    progressColor?: string;
    /** Custom suffix to display after the value */
    suffix?: string;
    /** Custom styles for the value text */
    textStyle?: React.CSSProperties;
    /** Whether to show the value text */
    showValue?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    value,
    size = 20,
    strokeWidth = 3,
    backgroundColor = "#e6e6e6",
    progressColor = "#4285f4",
    suffix = "c",
    textStyle,
    showValue = true,
}) => {
    // Calculate circle properties
    const radius = (size / 2) - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const percentage = (value / 200) * 100; // Assuming max value is 200
    const offset = circumference - (percentage / 100) * circumference;

    // Center point for the circles
    const center = size / 2;

    return (
        <div style={{ width: size, height: size, position: "relative" }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ transform: "rotate(-90deg)" }}
            >
                {/* Background circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={progressColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.3s ease" }}
                />
            </svg>

            {showValue && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: `${size / 5}px`,
                        fontWeight: "bold",
                        color: "#333",
                        ...textStyle,
                    }}
                >
                    {value}{suffix}
                </div>
            )}
        </div>
    );
};