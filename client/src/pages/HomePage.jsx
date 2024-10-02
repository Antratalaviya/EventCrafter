import React, { useEffect, useState } from 'react'
import { img } from '../assets/assets'
import { DropDownIcon } from '../assets/svg/Icon'
import EventTypeBox from '../component/events/EventTypeBox'
import ProfilesComponent from '../component/ProfilesComponent'
import MaxHome from '../component/max/MaxHome'
import EventsHome from '../component/events/EventsHome'
import { useMax } from '../context/useMax'
import SecurityMode from '../component/events/SecurityMode'
import { Link } from 'react-router-dom'
import { useCurrLocation } from '../context/useCurrLocation'
import { useGetAllEventsQuery } from '../api/api'

function HomePage() {
  const { active } = useMax();
  const { data, isSuccess } = useGetAllEventsQuery("");
  const { setPageName } = useCurrLocation();
  const [filterEvents, setFilterEvents] = useState([])
  useEffect(() => {
    if (isSuccess) {
      setFilterEvents(data?.data)
    }
  }, [data])

  const filterEvent = (key) => {
    if (!key) {
      setFilterEvents(data?.data)
    } else {
      setFilterEvents(data?.data.filter((e) => (e.type === key)))
    }
  }

  return (
    <div className='grid grid-flow-col grid-cols-12 p-5 gap-5 overflow-y-scroll'>
      <div className='col-span-8 space-y-5'>
        <div className='container-style'>
          <MaxHome />
        </div>
        <div className='container-style relative flex flex-col p-4 space-y-5'>
          <p className='text-white text-base tracking-wider'>Events </p>
          <div className='flex gap-x-2'>
            <button className='focus:bg-public focus:text-white focus:border-none bg-public/10 text-public border border-public/50 rounded-full px-4 py-1 text-sm' onClick={() => filterEvent('public')}>
              Publics
            </button>
            <button className='focus:bg-workshop focus:text-white focus:border-none bg-workshop/10 text-workshop border border-workshop/50 rounded-full px-4 py-1 text-sm' onClick={() => filterEvent('workshop')}>
              Workshop
            </button>
            <button className='focus:bg-ticket focus:text-white focus:border-none bg-ticket/10 text-ticket border border-ticket/50 rounded-full px-4 py-1 text-sm' onClick={() => filterEvent('ticket')}>
              Ticket
            </button>
            <button className='focus:bg-red-gradient focus:text-white focus:border-none bg-red-gradient/10 text-red-gradient border border-red-gradient/50 rounded-full px-4 py-1 text-sm' onClick={() => filterEvent('business')}>
              Business
            </button>
            <button className='focus:bg-primary focus:text-white focus:border-none bg-primary/10 text-primary border border-primary/50 rounded-full px-4 py-1 text-sm' onClick={() => filterEvent('')}>
              All
            </button>
          </div>
          {active ? <SecurityMode /> : <EventsHome events={filterEvents} />}
        </div>

      </div>
      <div className='col-span-4 h-full space-y-10'>
        <div className='container-style p-4 flex items-center justify-around'>
          <div>
            <p className='text-white/70 text-base'>EventCrafter Moments</p>
          </div>
          <div className="relative flex items-center ">
            <div className="-space-x-2 flex overflow-hidden">
              <ProfilesComponent />
              <img src={img.p4} alt="profile1" className='inline-block size-8 rounded-full ring-2 ring-icon-bg' />
            </div>
            <DropDownIcon fill="white" className="w-4 h-4" />
          </div>

        </div>
        <div className='flex flex-col space-y-4'>
          <Link to={'/'}  >
            <EventTypeBox img={img.eventType1} event="Event on Map" />
          </Link>
          <Link to={'/own-events'} onClick={() => setPageName('Own Events')} >
            <EventTypeBox img={img.eventType3} event="Own Events" />
          </Link>
          <Link to={'/'}>
            <EventTypeBox img={img.eventType3} event="Properties Booking" />
          </Link>
          <Link to={'/'}>
            <EventTypeBox img={img.eventType4} event="News" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
