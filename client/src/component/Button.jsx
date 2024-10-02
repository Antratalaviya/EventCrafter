import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = React.forwardRef(({ onEvent = () => { }, text, children, className = "", variant = "bg-primary", ...props }, ref) => {
    return (
        <button
            onClick={onEvent}
            className={twMerge(`py-2 rounded-full cursor-pointer text-center w-full hover:bg-primary/80 ${variant}`, className)}
            ref={ref}
            {...props}
        >
            <div className='flex w-full justify-center items-center gap-2'>
                <p>{text}</p>
                {children}
            </div>
        </button>
    );
});

export default Button;
