import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";

interface InputFieldProps {
    type: "text" | "password" | "email";
    placeholder: string;
    label?: string;
    required?: boolean;
    inputValue: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    type: initialType,
    placeholder,
    label,
    required = false,
    inputValue,
    disabled,
    onChange,
    className = "",
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(initialType);

    // Update input type when password visibility toggles
    useEffect(() => {
        if (initialType === "password") {
            setInputType(showPassword ? "text" : "password");
        }
    }, [showPassword, initialType]);

    // Validation logic
    useEffect(() => {
        if (required && !inputValue?.trim()) {
            setErrorMessage("This field is required");
        } else if (initialType === "email" && inputValue?.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setErrorMessage(emailRegex.test(inputValue) ? "" : "Invalid email format");
        } else {
            setErrorMessage("");
        }
    }, [inputValue, required, initialType]);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const getInputClasses = () => {
        return `input-field ${className} ${isFocused || (inputValue && !disabled) ? "filled" : ""
            } ${errorMessage ? "error" : ""}`;
    };

    return (
        <div className="input-container ">
            {label && (
                <label
                    htmlFor={label}
                    className="input-label"
                >
                    {label}
                </label>
            )}
            <div className="input-wrapper">
                <input
                    type={inputType}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required={required}
                    className={getInputClasses()}
                    disabled={disabled}
                    id={label}
                />
                {initialType === "password" && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                        tabIndex={-1}
                    >
                        <IonIcon
                            icon={showPassword ? eyeOffOutline : eyeOutline}
                            className="password-icon"
                        />
                    </button>
                )}
            </div>
            {errorMessage && (
                <p className="error-message">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default InputField;

