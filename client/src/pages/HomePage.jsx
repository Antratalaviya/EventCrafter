import React from 'react'
import { img } from '../assets/assets'
import { DropDownIcon } from '../assets/svg/Icon'
import EventTypeBox from '../component/events/EventTypeBox'
import ProfilesComponent from '../component/ProfilesComponent'
import MaxHome from '../component/max/MaxHome'
import EventsHome from '../component/events/EventsHome'
import { useMax } from '../component/context/useMax'
import SecurityMode from '../component/events/SecurityMode'

function HomePage() {
  const { active } = useMax();
  return (
    <div className='grid grid-flow-col grid-cols-12 bg-background p-5 gap-5 overflow-y-scroll'>
      <div className='col-span-8 space-y-5'>
        <div style={{ boxShadow: "0px 4px 4px 0px #00000040" }} className='bg-black-light w-full h-auto rounded-lg'>
          <MaxHome />
        </div>
        <div className='bg-black-light w-full h-auto rounded-lg'>
          <div style={{ boxShadow: "0px 4px 4px 0px #00000040" }} className='flex flex-col p-4 space-y-5'>
            <p className='text-white text-base tracking-wider'>Events</p>
            <div className='flex gap-x-2'>
              <button className='focus:bg-red-gradient focus:text-white focus:border-none bg-red-gradient/10 text-red-gradient border border-red-gradient/50 rounded-full px-4 py-1 text-sm'>
                Private
              </button>
              <button className='focus:bg-public focus:text-white focus:border-none bg-public/10 text-public border border-public/50 rounded-full px-4 py-1 text-sm'>
                Public
              </button>
              <button className='focus:bg-workshop focus:text-white focus:border-none bg-workshop/10 text-workshop border border-workshop/50 rounded-full px-4 py-1 text-sm'>
                Workshop
              </button>
              <button className='focus:bg-ticket focus:text-white focus:border-none bg-ticket/10 text-ticket border border-ticket/50 rounded-full px-4 py-1 text-sm'>
                Ticket
              </button>
              <button className='focus:bg-primary focus:text-white focus:border-none bg-primary/10 text-primary border border-primary/50 rounded-full px-4 py-1 text-sm'>
                Business
              </button>
            </div>
            {active ? <SecurityMode /> : <EventsHome />}
          </div>
        </div>

      </div>
      <div className='col-span-4 h-full space-y-10'>
        <div style={{ boxShadow: "0px 4px 4px 0px #00000040" }} className='p-4 w-full flex items-center justify-around bg-black-light rounded-lg'>
          <div>
            <p className='text-white/70 text-base'>EventCrafter Moments</p>
          </div>
          <div className="relative flex items-center">
            <ProfilesComponent />
            <div className="rounded-full overflow-hidden w-8 h-8 border border-icon-bg -translate-x-9 z-10">
              <img src={img.p4} alt="profile2" />
            </div>
            <DropDownIcon fill="white" className="w-4 h-4" />
          </div>

        </div>
        <div className='space-y-4'>
          <EventTypeBox img={img.eventType1} event="Event on Map" />
          <EventTypeBox img={img.eventType3} event="Own Events" />
          <EventTypeBox img={img.eventType3} event="Properties Booking" />
          <EventTypeBox img={img.eventType4} event="News" />
        </div>
      </div>
    </div>
  )
}

export default HomePage
