import React from 'react'
import ProfilesComponent from '../ProfilesComponent'
import { LocationFillIcon, SaveIcon, StarIcon } from '../../assets/svg/Icon'

function SingleEvent({ date = '1 Apr', img, add, title = 'California Art Festival', rating = '4.5' }) {
    return (
        <div style={{ boxShadow: "0px 4px 4px 0px #00000040" }} className='grid grid-cols-12 bg-white/[3%] rounded-lg overflow-hidden '>
            <div className='col-span-3 h-40 relative'>

                <div className='absolute bg-black/85 rounded-md text-white text-[12px] grid place-items-center w-1/2 py-1 top-2 left-2'>
                    {date}
                </div>
                <img className='w-full h-full object-cover' src={img} alt="event_img" />

            </div>
            <div className='col-span-9 flex flex-col justify-evenly px-5'>
                <p className='text-white tracking-wider'>{title}</p>
                <div className='flex gap-x-5 items-center'>
                    <div className='h-7 px-7 grid place-items-center bg-white/10 rounded-full text-white text-[12px]'>16+</div>
                    <div className='relative flex items-center'>
                        <ProfilesComponent />
                        <div className="rounded-full overflow-hidden text-white/75 flex justify-center items-center bg-[#1E232D] p-2 -translate-x-9 z-10">
                            <p className='text-[12px]'>29,378+Going</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-x-3'>
                    <StarIcon />
                    <p className='text-white/75 text-sm text-center mt-1'>{rating}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-2'>
                        <LocationFillIcon />
                        <p className='text-white/75 text-[12px] leading-6 font-normal tracking-wider font-sans'>{add}</p>
                    </div>
                    <div>
                        <SaveIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleEvent
