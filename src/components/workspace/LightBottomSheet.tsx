

import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonRange, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { BottomSheet } from './BottomSheet';
import CustomRange from './CustomRange';


interface CropOptionsModalProps {
    show: boolean;
    onClose: () => void;

}

interface ImageFilters {
    exposure: number;
    brightness: number;
    contrast: number;
    highlights: number;
    shadow: number;
}

export const LightRangeModal: React.FC<CropOptionsModalProps> = ({
    show,
    onClose,
}) => {


    const [filters, setFilters] = useState<ImageFilters>({
        exposure: 100,
        brightness: 100,
        contrast: 100,
        highlights: 100,
        shadow: 100,
    });

    const [activeTab, setActiveTab] = useState<string>('light');
    const [editedImageStyle, setEditedImageStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        updateImageStyle();
    }, [filters]);


    const updateImageStyle = () => {
        // Convert filter values to CSS filters
        const brightness = filters.brightness / 100;
        const contrast = filters.contrast / 100;
        const exposure = filters.exposure / 100;

        // Apply CSS filters based on our adjustments
        setEditedImageStyle({
            filter: `
        brightness(${brightness * exposure})
        contrast(${contrast})
        saturate(1)
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
            exposure: 100,
            brightness: 100,
            contrast: 100,
            highlights: 100,
            shadow: 100,
        });
    };

    const applyChanges = () => {
        // In a real implementation, this would apply the changes to the image
        // and possibly save the result
        onClose();
    };
    return (
        <BottomSheet isOpen={show} onClose={onClose} height="660px">
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
                <span style={{ fontWeight: 600 }}>Crop</span>
                <button
                    onClick={onClose}
                    style={{ border: "none", background: "none", color: "#005ECA", fontSize: "16px" }}
                >
                    Apply
                </button>
            </div>
            <div style={{ padding: '24px 24px 60px 24px' }}>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ color: '#747474', fontSize: '13px' }}>Exposure</span>
                    <IonRange aria-label="Range with ticks" ticks={true} snaps={true} min={0} max={200} step={50}
                        value={filters.exposure}
                        onIonChange={e => handleFilterChange('exposure', e.detail.value as number)}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#747474' }}>
                        <span style={{ position: 'relative', left: '-6px' }}>0</span>
                        <span style={{ position: 'relative', right: '-6px' }}>100</span>
                        <span >200</span>
                    </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ color: '#747474', fontSize: '13px' }}>Brightness</span>
                    <IonRange aria-label="Range with ticks" ticks={true} snaps={true} min={0} max={200} step={50} value={filters.brightness} onIonChange={e => handleFilterChange('brightness', e.detail.value as number)} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#747474' }}>
                        <span style={{ position: 'relative', left: '-6px' }}>0</span>
                        <span style={{ position: 'relative', right: '-6px' }}>100</span>
                        <span >200</span>
                    </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ color: '#747474', fontSize: '13px' }}>Contrast</span>
                    <IonRange aria-label="Range with ticks" ticks={true} snaps={true} min={0} max={200} step={50} value={filters.contrast}
                        onIonChange={e => handleFilterChange('contrast', e.detail.value as number)} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#747474' }}>
                        <span style={{ position: 'relative', left: '-6px' }}>0</span>
                        <span style={{ position: 'relative', right: '-6px' }}>100</span>
                        <span >200</span>
                    </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ color: '#747474', fontSize: '13px' }}>Highlights</span>
                    <IonRange aria-label="Range with ticks" ticks={true} snaps={true} min={0} max={200} step={50} value={filters.highlights}
                        onIonChange={e => handleFilterChange('highlights', e.detail.value as number)} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#747474' }}>
                        <span style={{ position: 'relative', left: '-6px' }}>0</span>
                        <span style={{ position: 'relative', right: '-6px' }}>100</span>
                        <span >200</span>
                    </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ color: '#747474', fontSize: '13px' }}>Shadow</span>
                    <IonRange aria-label="Range with ticks" ticks={true} snaps={true} min={0} max={200} step={50} value={filters.shadow}
                        onIonChange={e => handleFilterChange('shadow', e.detail.value as number)} />
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
