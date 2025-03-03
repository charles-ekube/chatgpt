import React from 'react';
import { EditButtonConfig } from '../../types/GeneralTypes';

interface EditButtonsContainerProps {
    buttons: EditButtonConfig[];
    activeButtonId?: string;
    onButtonClick: (buttonId: string) => void;
}

export const EditButtonsContainer: React.FC<EditButtonsContainerProps> = ({
    buttons,
    activeButtonId,
    onButtonClick,
}) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: 'center',
                padding: "16px 24px",
                gap: "12px",
                overflow: 'auto',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
            }}
        >
            {buttons.map((button) => {
                const isActive = activeButtonId === button.id;
                const iconColor = isActive ? button.activeColor : "#6C6C6C"; // Change icon color based on active state

                return (
                    <div key={button.id} style={{ width: 'auto', padding: '0 10px' }}>
                        <div
                            onClick={() => {
                                onButtonClick(button.id);
                                button.action();
                            }}
                            style={{
                                backgroundColor: isActive ? "#E1EFFF" : "inherit",
                                borderColor: isActive ? "#E1EFFF" : "#E4E4E4",
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                height: '60px',
                                color: isActive ? "#313131" : "#6C6C6C",
                                borderRadius: '6px',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                textWrap: 'nowrap',
                                cursor: 'pointer',
                                padding: '0 10px'
                            }}
                        >
                            {button.icon(iconColor)}
                            <span>
                                {button.title}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
