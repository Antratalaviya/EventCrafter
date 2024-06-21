import React from 'react'
import { twMerge } from 'tailwind-merge'

function Button({ onEvent = () => { }, text, children, className = "", disabled = false, varient = "bg-primary" }) {
    return (
        <div className={twMerge(`py-2 rounded-full cursor-pointer text-center mt-2 w-full ${varient}`,className)}>
            <button
                className='w-full'
                onClick={onEvent}
                disabled={disabled}
            >
                <div className='flex w-full justify-center items-center gap-2'>
                    <p>{text}</p>
                    {children}
                </div>

            </button>
        </div>
    )
}

export default Button
