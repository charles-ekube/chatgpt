import React, { CSSProperties, useState } from 'react';
import { BottomSheet } from './BottomSheet';
import { RatioOption } from '../../types/GeneralTypes';
import { IonRange } from '@ionic/react';
import { CustomDropdown } from '../CustomDropDown';

interface CropOptionsModalProps {
    show: boolean;
    onClose: () => void;
    // selectedRatio: RatioOption | null;
    // onRatioSelect: (ratio: RatioOption) => void;
    // onShowCustomRatio: () => void;
    // ratioOptions: RatioOption[];
}
interface ParentComponentProps {
    initialStyle?: string;
}


interface ParentWithDropdownProps extends CropOptionsModalProps {
    initialStyle?: string;
    styleOptions?: string[];
    onStyleChange?: (style: string) => void;
}

export const TextToSpeechSettingsModal: React.FC<ParentWithDropdownProps> = ({
    show,
    onClose,
    // selectedRatio,
    initialStyle,
    styleOptions,
    onStyleChange
    // onRatioSelect,
    // onShowCustomRatio,
    // ratioOptions,
}) => {



    const [selectedValue, setSelectedValue] = useState<string>(initialStyle ?? '');
    const emotionalStyles: string[] = ['Happy', 'Sad', 'Angry'];

    const handleChange = (value: string): void => {
        setSelectedValue(value);
        console.log("Selected value:", value);
        // Do something with the selected value
    };

    const containerStyle: CSSProperties = {
        // padding: '16px',
        // maxWidth: '400px',
        margin: '0 auto'
    };

    const titleStyle: CSSProperties = {
        fontSize: '20px',
        marginBottom: '16px',
        color: '#4a5568'
    };

    const resultStyle: CSSProperties = {
        marginTop: '16px'
    };


    return (
        <BottomSheet isOpen={show} onClose={onClose} height="470px">
            <div >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                        borderBottom: '1px solid #EFEFEF',
                        padding: '10px 16px 16px 16px'
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


                <div style={{
                    padding: '0 24px'
                }}>

                    <div style={{ margin: ' 30px 0' }}>
                        <span style={{ color: '#747474', fontSize: '13px' }}>Speaking Pace</span>
                        <IonRange aria-label="Range with ticks" ticks={true} snaps={true} min={0} max={200} step={100} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#747474' }}>
                            <span style={{ position: 'relative', left: '-6px' }}>Slow</span>
                            <span style={{ position: 'relative', right: '-6px' }}>Normal</span>
                            <span >Fast</span>
                        </div>



                    </div>

                    <div style={containerStyle}>
                        <h2 style={{ color: '#747474', fontSize: '14px', paddingBottom: '16px' }} >Emotional style</h2>
                        <CustomDropdown
                            options={emotionalStyles}
                            onChange={handleChange}
                            defaultValue={initialStyle}
                        />

                    </div>


                </div>


            </div>
        </BottomSheet>
    );
};