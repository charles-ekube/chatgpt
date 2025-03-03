import React, { useMemo } from 'react';
import { RE_DIGIT } from '../Helpers';

interface OtpInputProps {
    value: string;
    valueLength: number;
    onChange: (newValue: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, valueLength, onChange }) => {
    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items: string[] = [];

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];

            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }

        return items;
    }, [value, valueLength]);

    const focusToNextInput = (target: HTMLInputElement) => {
        const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;
        if (nextElementSibling) {
            nextElementSibling.focus();
        }
    };

    const focusToPrevInput = (target: HTMLInputElement) => {
        const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;
        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };

    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const target = e.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') return;

        const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

        // Prevent deleting digit if next input element has a value
        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') return;

        targetValue = isTargetValueDigit ? targetValue : ' ';
        const targetValueLength = targetValue.length;

        if (targetValueLength === 1) {
            const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);
            onChange(newValue);

            if (!isTargetValueDigit) return;

            focusToNextInput(target);
        } else if (targetValueLength === valueLength) {
            onChange(targetValue);
            target.blur();
        }
    };

    const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        const { key } = e;

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        target.setSelectionRange(0, target.value.length);

        if (key !== 'Backspace' || target.value !== '') return;

        focusToPrevInput(target);
    };

    const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const target = e.target;
        const prevInputEl = target.previousElementSibling as HTMLInputElement | null;

        if (prevInputEl && prevInputEl.value === '') {
            return prevInputEl.focus();
        }

        target.setSelectionRange(0, target.value.length);
    };

    return (
        <div className="otp-group">
            {valueItems.map((digit, idx) => (
                <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{1}"
                    maxLength={1} // Ensures only one digit per input
                    className="otp-input"
                    value={digit}
                    onChange={(e) => inputOnChange(e, idx)}
                    onKeyDown={inputOnKeyDown}
                    onFocus={inputOnFocus}
                />
            ))}
        </div>
    );
};

export default OtpInput;
