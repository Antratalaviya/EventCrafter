import React, { useState } from 'react'
import { SelectIcon } from '../../assets/svg/Icon'
import { time } from './activity'
import Button from '../Button'

function TimeModal({ onSelect }) {
    const [select, setSelect] = useState("")

    return (
        <div className='w-full h-full flex items-center flex-col space-y-4'>
            <p className='text-white text-xl'>Set Timeing</p>
            <div className='h-1 border-b border-body-text w-full' />
            <div className='w-full space-y-4 p-2'>
                {time && time.map((item) => (
                    <div className='bg-new-card rounded-lg flex items-center pr-3 ring-1 w-full ring-gray cursor-pointer' key={item.id} onClick={() => setSelect(item.text)} >
                        <div className={`bg-transperent focus:outline-none w-full py-3 px-5 text-sm ${select && select === item.text ? "text-white" : "text-white/40"}`}>
                            <p>{item.text}</p>
                        </div>
                        <div className='cursor-pointer'>
                            {select && select === item.text ? <SelectIcon /> : (
                                <div className='w-4 h-4 rounded-full ring-1 ring-white' />
                            )}
                        </div>

                    </div>

                ))}
                <div className='w-full'>
                    <Button onEvent={onSelect} text={'Select'} disabled={select ? false : true} />
                </div>
            </div>
        </div >
    )
}

export default TimeModal
