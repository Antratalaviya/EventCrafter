import React from 'react'
import { img } from '../../assets/assets'
import Button from '../Button'

function DeactiveModal({ onSubmit, onCancel }) {
    return (
        <div className='w-full h-full flex items-center flex-col space-y-4 space-x-2'>
            <p className='text-white text-xl'>Deactivating Mex</p>
            <div className='h-1 border-b border-body-text w-full' />
            <div className='w-full flex flex-col items-center'>
                <img className='w-44 h-40 m-2' src={img.driving} alt="max" />
                <div className='flex flex-col items-center justify-center py-2 space-y-2'>
                    <p className='text-xl tracking-wider leading-3 pb-2'>Do you want to de activate Mex ?</p>
                    <p className='text-white/70'>Mex will stop responding and action in this case.</p>
                </div>
                <div className='w-full flex gap-2'>
                    <Button onEvent={onCancel} text={'No'} varient='bg-stroke'/>
                    <Button onEvent={onSubmit} text={'Yes'} />
                </div>
            </div>
        </div >
    )
}

export default DeactiveModal
