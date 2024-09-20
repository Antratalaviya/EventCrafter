import React from 'react'
import { img } from '../assets/assets'
import Button from '../component/Button'
import { TimeIcon } from '../assets/svg/Icon'

function ConnectRequest() {
    return (
        <div className='h-screen overflow-y-scroll text-white'>
            <div className='grid xl:grid-cols-2 grid-cols-1 gap-10'>
                <div className='bg-black-light p-5 rounded-md space-y-2'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                <img src={img.p3} alt="User Avatar" />
                            </div>
                            <p>Dianne Russell</p>
                        </div>
                        <p className='text-sm text-yellow font-extralight'>Connect Request</p>
                    </div>
                    <div className='grid grid-cols-3'>
                        <div className='flex items-center col-span-2 gap-2'>
                            <Button
                                text="Decline"
                                className="bg-dark hover:bg-dark/80"
                            />
                            <Button
                                text="Connect"
                            />
                        </div>
                    </div>
                </div>
                <div className='bg-black-light p-5 rounded-md space-y-2'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                <img src={img.p3} alt="User Avatar" />
                            </div>
                            <p>Dianne Russell</p>
                        </div>
                        <p className='text-sm text-yellow font-extralight'>Connect Request</p>
                    </div>
                    <div className='grid grid-cols-3'>
                        <div className='flex items-center col-span-2 gap-2'>
                            <Button
                                text="Decline"
                                className="bg-dark hover:bg-dark/80"
                            />
                            <Button
                                text="Connect"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectRequest