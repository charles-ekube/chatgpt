// import React, { useState } from 'react';
// import { IonInput, IonInputPasswordToggle } from '@ionic/react';

// interface CustomInputProps {
//     type?: 'text' | 'password' | 'number' | 'email';
//     label?: string;
//     value?: string;
//     onChange?: (value: string) => void;
// }

// const CustomInput: React.FC<CustomInputProps> = ({
//     type = 'text',
//     label,
//     value,
//     onChange,
// }) => {
//     const [inputValue, setInputValue] = useState(value || '');
//     const [showPassword, setShowPassword] = useState(false);

//     const handleInputChange = (event: any) => {
//         setInputValue(event.target.value);
//         if (onChange) {
//             onChange(event.target.value);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <IonInput
//             type={type === 'password' && !showPassword ? 'password' : 'text'}
//             label={label}
//             value={inputValue}
//             onIonChange={handleInputChange}
//         >
//             {type === 'password' && (
//                 <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
//             )}
//         </IonInput>
//     );
// };

// export default CustomInput;


// import React, { useState, useRef } from 'react';
// import { IonInput, IonInputPasswordToggle } from '@ionic/react';

// interface CustomInputProps {
//     type?: 'text' | 'password' | 'number' | 'email';
//     label?: string;
//     value?: string;
//     onChange?: (value: string) => void;
//     error?: boolean; // Added error prop
// }

// const CustomInput: React.FC<CustomInputProps> = ({
//     type = 'text',
//     label,
//     value,
//     onChange,
//     error, // Added error prop
// }) => {
//     const [inputValue, setInputValue] = useState(value || '');
//     const [showPassword, setShowPassword] = useState(false);
//     const inputRef = useRef<HTMLInputElement>(null);

//     const handleInputChange = (event: any) => {
//         setInputValue(event.target.value);
//         if (onChange) {
//             onChange(event.target.value);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleFocus = () => {
//         if (inputRef.current) {
//             inputRef.current.style.borderColor = '#9FCBFD'; // Set border color on focus
//         }
//     };

//     const handleBlur = () => {
//         if (inputRef.current) {
//             if (error) {
//                 inputRef.current.style.borderColor = '#EBD9D9'; // Set border color on error
//             } else if (inputValue) {
//                 inputRef.current.style.borderColor = '#9FCBFD'; // Set border color for filled input
//             } else {
//                 inputRef.current.style.borderColor = '#C6C6C6'; // Set default border color
//             }
//         }
//     };

//     return (
//         <IonInput
//             ref={inputRef}
//             type={type === 'password' && !showPassword ? 'password' : 'text'}
//             label={label}
//             value={inputValue}
//             onIonChange={handleInputChange}
//             onFocus={handleFocus}
//             onBlur={handleBlur}
//         >
//             {type === 'password' && (
//                 <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
//             )}
//         </IonInput>
//     );
// };

// export default CustomInput;


// import React, { useState, useRef } from 'react';
// import { IonInput, IonInputPasswordToggle } from '@ionic/react';

// interface CustomInputProps {
//     type?: 'text' | 'password' | 'number' | 'email';
//     label?: string;
//     value?: string;
//     onChange?: (value: string) => void;
//     error?: boolean; // Added error prop
// }

// const CustomInput: React.FC<CustomInputProps> = ({
//     type = 'text',
//     label,
//     value,
//     onChange,
//     error, // Added error prop
// }) => {
//     const [inputValue, setInputValue] = useState(value || '');
//     const [showPassword, setShowPassword] = useState(false);
//     const inputRef = useRef<HTMLIonInputElement>(null);

//     const handleInputChange = (event: CustomEvent) => {
//         const newValue = (event.target as HTMLIonInputElement).value || '';
//         setInputValue(newValue);
//         if (onChange) {
//             onChange(newValue);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleFocus = () => {
//         if (inputRef.current) {
//             inputRef.current.style.setProperty('border-color', '#9FCBFD'); // Set border color on focus
//         }
//     };

//     const handleBlur = () => {
//         if (inputRef.current) {
//             if (error) {
//                 inputRef.current.style.setProperty('border-color', '#EBD9D9'); // Set border color on error
//             } else if (inputValue) {
//                 inputRef.current.style.setProperty('border-color', '#9FCBFD'); // Set border color for filled input
//             } else {
//                 inputRef.current.style.setProperty('border-color', '#C6C6C6'); // Set default border color
//             }
//         }
//     };

//     return (
//         <IonInput
//             ref={inputRef}
//             type={type === 'password' && !showPassword ? 'password' : 'text'}
//             label={label}
//             value={inputValue}
//             onIonChange={handleInputChange}
//             onFocus={handleFocus}
//             onBlur={handleBlur}
//         >
//             {type === 'password' && (
//                 <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
//             )}
//         </IonInput>
//     );
// };

// export default CustomInput;


// import React, { useState, useRef } from 'react';
// import { IonInput, IonInputPasswordToggle } from '@ionic/react';

// interface CustomInputProps {
//     type?: 'text' | 'password' | 'number' | 'email';
//     label?: string;
//     value?: string;
//     onChange?: (value: string) => void;
//     error?: boolean;
// }

// const CustomInput: React.FC<CustomInputProps> = ({
//     type = 'text',
//     label,
//     value,
//     onChange,
//     error,
// }) => {
//     const [inputValue, setInputValue] = useState(value || '');
//     const [showPassword, setShowPassword] = useState(false);
//     const inputRef = useRef<HTMLIonInputElement>(null);

//     const handleInputChange = (event: CustomEvent) => {
//         const newValue = (event.target as HTMLIonInputElement).value || '';
//         setInputValue(newValue);
//         if (onChange) {
//             onChange(newValue);
//         }
//     };


//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleFocus = () => {
//         if (inputRef.current) {
//             inputRef.current.style.setProperty('--highlight-border', '#9FCBFD');
//         }
//     };

//     const handleBlur = () => {
//         if (inputRef.current) {
//             if (error) {
//                 inputRef.current.style.setProperty('--highlight-border', '#EBD9D9');
//             } else if (inputValue) {
//                 inputRef.current.style.setProperty('--highlight-border', '#9FCBFD');
//             } else {
//                 inputRef.current.style.setProperty('--highlight-border', '#C6C6C6');
//             }
//         }
//     };

//     return (
//         <IonInput
//             ref={inputRef}
//             type={type === 'password' && !showPassword ? 'password' : 'text'}
//             label={label}
//             value={inputValue}
//             onIonChange={handleInputChange}
//             onFocus={handleFocus}
//             onBlur={handleBlur}
//             fill="outline"
//             style={{
//                 '--highlight-border': '#C6C6C6', // Default border color
//                 '--background': 'transparent',
//                 '--border-color': 'var(--highlight-border)',
//                 '--border-width': '1px',
//                 '--border-style': 'solid',
//                 '--border-radius': '4px',
//                 padding: '8px',
//             }}
//         >
//             {type === 'password' && (
//                 <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
//             )}
//         </IonInput>
//     );
// };

// export default CustomInput;


import React, { useState, useRef } from 'react';
import { IonInput, IonInputPasswordToggle } from '@ionic/react';

interface CustomInputProps {
    type?: 'text' | 'password' | 'number' | 'email';
    label?: string;
    value?: string | number; // Allow number values
    onChange?: (value: string | number) => void; // Update here
    error?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
    type = 'text',
    label,
    value,
    onChange,
    error,
}) => {
    const [inputValue, setInputValue] = useState<string | number>(value ?? '');
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLIonInputElement>(null);

    const handleInputChange = (event: CustomEvent) => {
        const newValue = (event.target as HTMLIonInputElement).value ?? '';
        setInputValue(newValue);
        onChange?.(newValue); // Call onChange if provided
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFocus = () => {
        inputRef.current?.style.setProperty('--highlight-border', '#9FCBFD');
    };

    const handleBlur = () => {
        if (inputRef.current) {
            if (error) {
                inputRef.current.style.setProperty('--highlight-border', '#EBD9D9');
            } else if (inputValue) {
                inputRef.current.style.setProperty('--highlight-border', '#9FCBFD');
            } else {
                inputRef.current.style.setProperty('--highlight-border', '#C6C6C6');
            }
        }
    };

    return (
        <IonInput
            ref={inputRef}
            type={type === 'password' && !showPassword ? 'password' : type}
            label={label}
            value={inputValue}
            onIonChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            fill="outline"
            style={{
                '--highlight-border': '#C6C6C6', // Default border color
                '--background': 'transparent',
                '--border-color': 'var(--highlight-border)',
                '--border-width': '1px',
                '--border-style': 'solid',
                '--border-radius': '4px',
                padding: '8px',
            }}
        >
            {type === 'password' && (
                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            )}
        </IonInput>
    );
};

export default CustomInput;
