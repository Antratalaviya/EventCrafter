import React from 'react'
import { img } from '../../assets/assets'
import Button from '../Button'

function SetModal({ onSubmit }) {
    return (
        <div className='w-full h-full flex items-center flex-col space-y-4'>
            <p className='text-white text-xl'>Set Max</p>
            <div className='h-1 border-b border-body-text w-full' />
            <div className='w-full flex flex-col items-center'>
                <img className='w-40 h-40 -m-2' src={img.driving} alt="max" />
                <p className='text-xl tracking-wider leading-3 pb-2'>I Am Driving</p>
                <div className='flex justify-center py-2'>
                    <div className='flex flex-col items-center p-2'>
                        <p>02</p>
                        <p className='text-white/70'>Hours</p>
                    </div>
                    <p>:</p>
                    <div className='flex flex-col items-center p-2'>
                        <p>00</p>
                        <p className='text-white/70'>Minutes</p>
                    </div>
                    <p>:</p>
                    <div className='flex flex-col items-center p-2'>
                        <p>00</p>
                        <p className='text-white/70'>Seconds</p>
                    </div>
                </div>
                <div className='w-full'>
                    <Button onEvent={onSubmit} text={'Done'} />
                </div>
            </div>
        </div >
    )
}

export default SetModal
