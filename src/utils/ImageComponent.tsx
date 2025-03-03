import React from 'react';
import { IonImg } from '@ionic/react';

interface ImageComponentProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    onClick?: () => void;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, width, height, onClick }) => {
    return (
        <IonImg src={src} alt={alt} style={{ width: width, height: height, }} onClick={onClick} />
    );
};

export default ImageComponent;