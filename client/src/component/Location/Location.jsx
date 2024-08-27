import React, { useState } from 'react'
import { ArrowIcon, GPSIcon, LocationIcon } from '../../assets/svg/Icon'
import Button from '../Button'
import Drawer from '../Drawer/Drawer'

function Location() {
    const add = 'Caleta de Fuste, Fuerteventura ESP'
    const [locDrawer, setLocDrawer] = useState(false);

    return (
        <>
            <button onClick={() => setLocDrawer(true)}>
                <div className='flex items-center gap-x-1 rounded-full text-sm text-white bg-new-card ring-1 ring-stroke py-2 px-4'>
                    <LocationIcon className="w-5 h-5" />
                    <p className="pr-4">{add}</p>
                </div>
            </button>
            <Drawer open={locDrawer} onClose={() => setLocDrawer(false)} >
                <div onClick={() => setLocDrawer(false)} className='size-5 cursor-pointer sticky left-15 top-15'>
                    <ArrowIcon />
                </div>
                <div className='text-white'>
                    <p className='py-4'>Select Location</p>
                    <div className='py-4 space-y-3'>
                        <div className='bg-[#252A30] rounded-lg ring-1 ring-gray'>
                            <input
                                type="text"
                                placeholder='Search For  area, Street name...'
                                className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                                readOnly
                            />
                        </div>
                        <div className='flex bg-[#252A30] rounded-lg ring-1 ring-gray p-3 gap-2'>
                            <GPSIcon />
                            <div className='flex flex-col'>
                                <p className='py-1'>Get Current location</p>
                                <input
                                    type="text"
                                    placeholder='Using GPS'
                                    className='bg-transperent focus:outline-none w-full text-body-text py-3 text-sm'
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <Button text={'Done'} onEvent={() => setLocDrawer(false)} />
                </div>
            </Drawer>
        </>
    )
}

export default Location