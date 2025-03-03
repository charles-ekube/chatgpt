import React, { useState } from "react";
import { IonToast } from "@ionic/react";

interface ToastProps {
    message: string;
    duration?: number;
    position?: "top" | "middle" | "bottom";
    onClose?: () => void;
    isOpen: boolean;
    icon: string;
}

const CustomToast: React.FC<ToastProps> = ({
    message,
    duration = 2000,
    position = "bottom",
    onClose,
    isOpen = false,
    icon
}) => {
    const [showToast, setShowToast] = useState(false);

    const openToast = () => setShowToast(true);
    const closeToast = () => {
        setShowToast(false);
        if (onClose) onClose();
    };

    return (
        <>
            <IonToast
                isOpen={isOpen}
                message={message}
                duration={duration}
                position={position}
                onDidDismiss={closeToast}
                swipeGesture="vertical"
                color={'primary'}
                icon={icon}
            />
            {/* Button to trigger the toast (Optional) */}
            <button onClick={openToast} style={{ display: "none" }} id="open-toast"></button>
        </>
    );
};

export default CustomToast;
