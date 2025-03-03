import React from 'react';
import { IonButton, isPlatform } from '@ionic/react';

interface CustomButtonProps {
    children: React.ReactNode;
    expand?: 'block' | 'full';
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
    borderColor?: string;
    borderWidth?: string;
    padding?: string;
    height?: string;
    fontSize?: string;
    fontWeight?: string;
    icon?: React.ReactNode;
    iconPosition?: 'start' | 'end';
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    mode?: 'ios' | 'md';
    routerLink?: string;
    routerAnimation?: any;
    routerDirection?: 'forward' | 'back' | 'root';
    routerOptions?: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    expand = 'block',
    backgroundColor = '#ffffff',
    textColor = '#000000',
    borderRadius = '999px',
    borderColor = '#e0e0e0',
    borderWidth = '1px',
    padding = '0 16px',
    height = '48px',
    fontSize = '16px',
    fontWeight = '500',
    icon,
    iconPosition = 'start',
    disabled = false,
    onClick,
    className = '',
    mode,
    routerLink,
    routerAnimation,
    routerDirection,
    routerOptions,
}) => {
    // Force consistent styling
    const buttonStyle = {
        '--background': backgroundColor,
        '--background-hover': backgroundColor,
        '--background-activated': backgroundColor,
        '--background-focused': backgroundColor,
        '--color': textColor,
        '--color-hover': textColor,
        '--color-activated': textColor,
        '--color-focused': textColor,
        '--border-radius': borderRadius,
        '--border-color': borderColor,
        '--border-width': borderWidth,
        '--padding-start': padding,
        '--padding-end': padding,
        '--height': height,
        '--width': '100%',
        '--box-shadow': 'none',
        '--min-height': height,
        '--margin-top': '8px',
        '--margin-bottom': '8px',
        fontSize,
        fontWeight,
        maxHeight: height,
        minHeight: height,
        width: '100%',
        textWrap: 'nowrap',
    } as React.CSSProperties;

    return (
        <IonButton
            expand={expand}
            style={buttonStyle}
            disabled={disabled}
            onClick={onClick}
            className={`custom-button ${className}`}
            fill="solid"
            mode={mode || (isPlatform('ios') ? 'ios' : 'md')}
            routerLink={routerLink}
            routerAnimation={routerAnimation}
            routerDirection={routerDirection}
            routerOptions={routerOptions}
        >
            {icon && iconPosition === 'start' && <span className="button-icon start">{icon}</span>}
            {children}
            {icon && iconPosition === 'end' && <span className="button-icon end">{icon}</span>}
        </IonButton>
    );
};

export default CustomButton;
