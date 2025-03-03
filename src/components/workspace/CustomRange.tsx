import React from 'react';
import { IonRange, IonItem, IonLabel } from '@ionic/react';
// import './CustomRange.css';

interface CustomRangeProps {
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    step?: number;
    showTicks?: boolean;
}

const CustomRange: React.FC<CustomRangeProps> = ({
    label,
    min,
    max,
    value,
    onChange,
    step = 1,
    showTicks = true
}) => {
    // Create tick marks at major points
    const tickValues = [min, (min + max) / 2, max]; // 0, 100, 200

    return (
        <IonItem lines="none" className="custom-range-item">
            <IonLabel>{label}</IonLabel>
            <div className="custom-range-container">
                <IonRange
                    min={min}
                    max={max}
                    value={value}
                    step={step}
                    onIonChange={e => onChange(e.detail.value as number)}
                    className="custom-range"
                />

                {showTicks && (
                    <>
                        <div className="custom-tick-marks">
                            {tickValues.map((tickValue) => (
                                <div
                                    key={tickValue}
                                    className={`custom-tick ${value >= tickValue ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                        <div className="tick-labels">
                            {tickValues.map((tickValue) => (
                                <div key={tickValue} className="tick-label">
                                    {tickValue}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </IonItem>
    );
};

export default CustomRange;