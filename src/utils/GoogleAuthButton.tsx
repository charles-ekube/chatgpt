import React from 'react';
import { IonButton, IonIcon, IonImg, IonText } from '@ionic/react';
import { logoGoogle } from 'ionicons/icons';
import { GoogleIcon } from '../assets/images';

interface CustomButtonProps {
    onClick: () => void;
}

const GoogleAuthButton: React.FC<CustomButtonProps> = ({
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className="google-auth-button-class ion-margin-top"
            style={{ background: '#ffffff' }}>
            <img src={GoogleIcon} style={{ width: '20px', height: '20px', }} />
            <p>Google</p>
        </button>
    );
};

export default GoogleAuthButton;
