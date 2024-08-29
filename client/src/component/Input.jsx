import React from 'react'
import { twMerge } from 'tailwind-merge'
import "../index.css"

const Input = ({ className, children, type, InputClassName, onClick, ...props }, ref) => {
    return (
        <div className={twMerge(`bg-[#252A30] rounded-lg ring-1 ring-gray`, className)} onClick={onClick}>
            <input
                type={type}
                ref={ref}
                className={twMerge('bg-transperent focus:outline-none w-full text-body-text p-3 text-sm', InputClassName)}
                required
                {...props}

            />
            {children}
        </div>
    )
}

export default React.forwardRef(Input)
