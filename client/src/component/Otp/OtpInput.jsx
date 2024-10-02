import React, { useState } from 'react'
import Input from '../Input';

function OtpInput({ onOtpChange }) {
    const [otp, setOtp] = useState(Array(4).fill(''));

    const handleChange = (element, index) => {
        const value = element.value.replace(/[^0-9]/g, ''); // Only allow numbers
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        onOtpChange(newOtp.join(''));

        // Move focus to the next input
        if (value && element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        const { key } = e;

        // Handle backspace
        if (key === 'Backspace') {
            e.preventDefault(); // Prevent default backspace behavior
            const newOtp = [...otp];
            newOtp[index] = ''; // Clear the current input
            setOtp(newOtp);
            onOtpChange(newOtp.join(''));

            // Move focus to the previous input
            if (e.target.previousSibling) {
                e.target.previousSibling.focus();
            }
        }
    };

    return (
        <div className="flex justify-center space-x-2 text-black">
            {otp.map((_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 border border-gray-300 text-center text-lg font-bold rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={otp[index]}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
        </div>
    );
}

export default OtpInput