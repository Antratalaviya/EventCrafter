import React, { useEffect, useMemo, useState } from 'react'
import SingleEvent from '../component/events/SingleEvent';
import { img } from '../assets/assets';
import { capitalize, getMonth } from '../utils/customUtility';
import { useDebounce } from '../context/useDebounce';
import { useGetAllOwnEventsQuery } from '../api/api';
import Search from '../component/Search/Search';
import { CrossIcon, FoodIcon } from '../assets/svg/Icon';
import Spinner from '../component/Spinner';

function OwnEvents() {
    const [search, setSearch] = useState(true);
    const [events, setEvents] = useState([]);
    const [filterEvents, setFilterEvents] = useState([])
    const [filter, setFilter] = useState({
        type: "",
        sortby: "",
        status: "",
        page: 1,
        limit: 10,
    });

    useEffect(() => {
        if (events) {
            setFilterEvents(events)
        }
    }, [events, setEvents])

    const filterEvent = (key) => {
        setFilterEvents(events.filter((e) => (e.status === key)))
    }

    const date = useMemo(() => {
        return events.map(d => {
            const eventDate = new Date(d.startDate);
            return `${eventDate.getDate()} ${getMonth(eventDate.getMonth())}`;
        });
    }, [events]);

    if (!events) {
        return <Spinner />;
    }
    return (
        <div className='p-5 flex flex-col overflow-y-scroll'>
            <Search
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
                events={events}
                setEvents={setEvents}
            />

            <div className='flex gap-5 my-5'>
                <button className='focus:bg-public focus:text-white focus:border-none bg-public/10 text-public border border-public/50 rounded-full px-4 py-2' onClick={() => filterEvent('upcoming')}>
                    Upcoming
                </button>
                <button className='focus:bg-workshop focus:text-white focus:border-none bg-workshop/10 text-workshop border border-workshop/50 rounded-full px-4 py-2' onClick={() => filterEvent('completed')}>
                    Campleted
                </button>
                <button className='focus:bg-ticket focus:text-white focus:border-none bg-ticket/10 text-ticket border border-ticket/50 rounded-full px-4 py-2' onClick={() => filterEvent('cancelled')}>
                    Cancelled
                </button>
                <button className='focus:bg-red-gradient focus:text-white focus:border-none bg-red-gradient/10 text-red-gradient border border-red-gradient/50 rounded-full px-4 py-2' onClick={() => filterEvent('draft')}>
                    Draft
                </button>
            </div>

            <div className='grid grid-cols-2 gap-5'>
                {filterEvents && filterEvents.length > 0 && filterEvents.map((event, index) => (
                    <SingleEvent
                        key={index}
                        eventId={event._id}
                        date={date[index]}
                        img={event.photos.url}
                        add={`${event.street}, ${event.city}, ${event.country}`}
                        title={event.title}
                        rating={event.likedBy}
                        participants={event.participants}
                        likedBy={event.likedBy}
                        type={event.type}
                        participating={event.participating}
                        status={event.status}
                        liked={event.liked}
                        saved={event.saved}
                        own={true}
                    />
                ))}
                <SingleEvent eventId='66c87da83c2e7bb657c929bn' img={img.eventImg} add="Suite 577 44666 O'Keefe Turnpike, New Marianobury, SC 66348" />
                <SingleEvent eventId='66c87da83c2e7bb657c929bn' img={img.eventImg1} add="01040 Duncan Vista" />
                <SingleEvent eventId='66c87da83c2e7bb657c929bn' img={img.eventImg2} add="01040 Duncan Vista" />
                <SingleEvent eventId='66c87da83c2e7bb657c929bn' img={img.eventImg3} add="01040 Duncan Vista" />
            </div>
        </div >
    )
}

export default OwnEvents