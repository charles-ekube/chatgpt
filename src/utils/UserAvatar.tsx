import React from 'react';
import { IonAvatar, IonBadge } from '@ionic/react';


interface AvatarProps {
    name: string;
}

const Avatar: React.FC<AvatarProps> = ({ name }) => {
    const firstLetter = name?.charAt(0).toUpperCase(); // Get first letter of name

    return (
        <div className="avatar-container">
            <IonAvatar className="avatar">
                <span className="avatar-text">{firstLetter}</span>
            </IonAvatar>
            <div className="online-dot" color={'danger'}></div>
        </div>
    );
};

export default Avatar;
