import React from 'react'
import { ArrowIcon } from '../../assets/svg/Icon'
import { twMerge } from 'tailwind-merge'

function Drawer({ open, onClose, children, className }) {
  return (
    <div
      onClick={onClose}
      className={`${open ? 'visible bg-black/20' : "hidden"} delay-500 ease-linear h-screen w-screen absolute grid grid-cols-12 z-50 top-0 right-0 backdrop-blur-sm`}>
      <div className={twMerge(`p-10 flex flex-col col-span-4 h-full inset-0 bg-[#1C2128] relative ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`, className)} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Drawer

