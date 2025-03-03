

import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonRange, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { BottomSheet } from './BottomSheet';
import CustomRange from './CustomRange';


interface CropOptionsModalProps {
    show: boolean;
    onClose: () => void;

}

interface ImageFilters {
    Saturation: number;
    Temperature: number;
    Hue_Rotation: number;
}

export const ColorRangeModal: React.FC<CropOptionsModalProps> = ({
    show,
    onClose,
}) => {


    const [filters, setFilters] = useState<ImageFilters>({
        Saturation: 100,
        Temperature: 50,
        Hue_Rotation: 150,
    });

    const [activeTab, setActiveTab] = useState<string>('light');
    const [editedImageStyle, setEditedImageStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        updateImageStyle();
    }, [filters]);


    const updateImageStyle = () => {
        // Convert filter values to CSS filters
        const Saturation = filters.Saturation / 100;
        const Temperature = filters.Temperature / 100;
        const Hue_Rotation = filters.Hue_Rotation / 100;

        // Apply CSS filters based on our adjustments
        setEditedImageStyle({
            filter: `
        saturation(${Saturation})
        temperature(${Temperature})
        hue_rotation(${Hue_Rotation})
      `,
            // We simulate highlights and shadows with a combination of filters
            // This is simplified - a real implementation would be more sophisticated
        });
    };

    const handleFilterChange = (filter: keyof ImageFilters, value: number) => {
        setFilters(prev => ({
            ...prev,
            [filter]: value
        }));
    };

    const resetFilters = () => {
        setFilters({
            Saturation: 100,
            Temperature: 100,
            Hue_Rotation: 100,

        });
    };

    const applyChanges = () => {
        // In a real implementation, this would apply the changes to the image
        // and possibly save the result
        onClose();
    };
    return (
        <BottomSheet isOpen={show} onClose={onClose} height="500px">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    // marginBottom: "20px",
                    borderBottom: '1px solid #EFEFEF',
                    padding: '16px 24px 16px 24px'
                }}
            >
                <button
                    onClick={onClose}
                    style={{ border: "none", background: "none", color: "#666", fontSize: "16px" }}
                >
                    Cancel
                </button>
                <span style={{ fontWeight: 600 }}>Color</span>
                <button
                    onClick={onClose}
                    style={{ border: "none", background: "none", color: "#005ECA", fontSize: "16px" }}
                >
                    Apply
                </button>
            </div>
            <div style={{ padding: '24px 24px 60px 24px' }}>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ color: '#747474', fontSize: '13px' }}>Saturation</span>
                    <IonRange aria-label="Range with ticks" ticks={true} snaps={true} min={0} max={200} step={50}
                        value={filters.Saturation}
                        onIonChange={e => handleFilterChange('Saturation', e.detail.value as number)}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#747474' }}>
                        <span style={{ position: 'relative', left: '-6px' }}>0</span>
                        <span style={{ position: 'relative', right: '-6px' }}>100</span>
                        <span >200</span>
                    </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ color: '#747474', fontSize: '13px' }}>Temperature</span>
                    <IonRange aria-label="Range with ticks" ticks={true} snaps={true} min={0} max={200} step={50} value={filters.Temperature} onIonChange={e => handleFilterChange('Temperature', e.detail.value as number)} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#747474' }}>
                        <span style={{ position: 'relative', left: '-6px' }}>0</span>
                        <span style={{ position: 'relative', right: '-6px' }}>100</span>
                        <span >200</span>
                    </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ color: '#747474', fontSize: '13px' }}>Hue Rotation</span>
                    <IonRange aria-label="Range with ticks" ticks={true} snaps={true} min={0} max={200} step={50} value={filters.Hue_Rotation}
                        onIonChange={e => handleFilterChange('Hue_Rotation', e.detail.value as number)} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#747474' }}>
                        <span style={{ position: 'relative', left: '-6px' }}>0</span>
                        <span style={{ position: 'relative', right: '-6px' }}>100</span>
                        <span >200</span>
                    </div>
                </div>


            </div>



        </BottomSheet>
    );
};
