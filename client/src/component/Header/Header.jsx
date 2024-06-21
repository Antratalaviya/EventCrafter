import React, { useState } from 'react'
import { img } from '../../assets/assets'
import { BellIcon, GPSIcon, LocationIcon, SearchIcon } from '../../assets/svg/Icon'
import Drawer from '../Drawer/Drawer'
import { Max } from '../max'
import Button from '../Button'
import { useCurrLocation } from '../context/useCurrLocation'

function Header() {
  const add = 'Caleta de Fuste, Fuerteventura ESP'
  const [locDrawer, setLocDrawer] = useState(false);
  const { loc } = useCurrLocation();

  return (
    <div className='bg-black-light grid grid-cols-12 text-white py-4 px-3 border-b border-body-text'>
      <div className='flex col-span-5 items-center gap-5 pl-5'>
        <p className='text-xl'>
          {loc}
        </p>
        <button onClick={() => setLocDrawer(true)}>
          <div className='flex items-center gap-x-1 rounded-full text-sm text-white bg-new-card ring-1 ring-stroke py-2 px-4'>
            <LocationIcon className="w-5 h-5" />
            <p className="pr-4">{add}</p>
          </div>
        </button>
        <Drawer open={locDrawer} onClose={() => setLocDrawer(false)} >
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

      </div>
      <div className='flex col-span-7 justify-end items-center px-2'>
        <SearchIcon className="pr-3 w-10" />
        <BellIcon className="pr-3 w-10" />
        {/* <div className='w-12 h-12 rounded-md mr-2 bg-new-card border border-stroke'>
          <img className='w-full h-full' src={img.happy} alt="happy" />
        </div> */}
        <Max />
        <div className='grid grid-flow-col gap-2 px-3 py-1 bg-new-card border border-stroke rounded-md'>
          <div className='w-10 h-10 rounded-full overflow-hidden object-contain'>
            <img src={img.profile} alt="profile" />
          </div>
          <div className='flex flex-col'>
            <p className='text-white text-sm'>Violet Fahey</p>
            <p className='text-body-text text-sm'>Johndoe@gmai.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
