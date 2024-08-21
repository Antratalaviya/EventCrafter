import React from 'react'
import { twMerge } from 'tailwind-merge'

function Modal({ children, open, className, ModalClassName }) {
    return (
        <div
            className={twMerge(`${open ? "visible bg-black/70 flex" : "hidden"} delay-500 ease-linear h-screen w-screen absolute justify-center items-center top-0 left-0`, className)}
        >
            <div className={twMerge(`p-5 w-1/4 h-auto rounded-xl transition-all inset-0 bg-new-bg relative ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`, ModalClassName)} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal

