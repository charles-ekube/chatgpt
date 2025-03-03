import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { Icon } from 'ionicons/dist/types/components/icon/icon';

interface CustomButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    icon?: string; // Optional icon name from Ionicons
    bgColor: string;
    className?: string;
    iconColor?: string; // Icon color
    textColor?: string; // Text color
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    onClick,
    disabled = false,
    icon,
    className = '',
    iconColor = 'inherit',
    textColor = 'inherit',
    bgColor
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`custom-button ${className}`}
            style={{ borderRadius: '999px', backgroundColor: bgColor, opacity: disabled ? '0.6' : '' }}
        >
            {icon && <IonIcon slot="start" icon={icon} style={{ color: iconColor, }} />}

            <span style={{ color: textColor }}>{label}</span>
        </button>
    );
};

export default CustomButton;
