import React from 'react'
import { img } from '../assets/assets'
import { twMerge } from 'tailwind-merge'

function Spinner({ className }) {
    return (
        <div className={twMerge(`flex flex-col items-center justify-center text-white`, className)}>
            <img src={img.loading} alt="" className='size-14' />
            <h1>Loading....</h1>
        </div>
    )
}

export default Spinner