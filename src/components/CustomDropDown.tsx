import React, { useState, useRef, useEffect, CSSProperties } from 'react';

interface CustomDropdownProps {
    options: string[];
    defaultValue?: string;
    onChange?: (selectedValue: string) => void;
    placeholder?: string;
    width?: string;
}

interface DropdownStyles {
    container: CSSProperties;
    selector: CSSProperties;
    placeholder: CSSProperties;
    arrow: CSSProperties;
    dropdown: CSSProperties;
    option: CSSProperties;
    optionHover: CSSProperties;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options = [],
    defaultValue = options[0] || '',
    onChange = () => { },
    placeholder = 'Select an option',
    width = '100%',

}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(defaultValue);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Handle clicking outside to close dropdown
        const handleClickOutside = (event: MouseEvent): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option: string): void => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option);
    };

    const dropdownStyles: DropdownStyles = {
        container: {
            position: 'relative',
            width: width
        },
        selector: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            backgroundColor: 'white',
            cursor: 'pointer',
            boxSizing: 'border-box',
            width: '100%'
        },
        placeholder: {
            color: selectedOption ? 'inherit' : '#a0aec0'
        },
        arrow: {
            width: '16px',
            height: '16px',
            transition: 'transform 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)'
        },
        dropdown: {
            position: 'absolute',
            zIndex: 10,
            width: '100%',
            marginTop: '4px',
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            maxHeight: '240px',
            overflowY: 'auto'
        },
        option: {
            padding: '12px',
            cursor: 'pointer'
        },
        optionHover: {
            backgroundColor: '#f7fafc'
        }
    };

    return (
        <div ref={dropdownRef} style={dropdownStyles.container}>
            <div
                style={dropdownStyles.selector}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span style={dropdownStyles.placeholder}>
                    {selectedOption || placeholder}
                </span>
                <svg
                    style={dropdownStyles.arrow}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>

            {isOpen && (
                <div style={dropdownStyles.dropdown}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            style={dropdownStyles.option}
                            onMouseEnter={(e) => {
                                (e.target as HTMLDivElement).style.backgroundColor = '#f7fafc';
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLDivElement).style.backgroundColor = 'transparent';
                            }}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};