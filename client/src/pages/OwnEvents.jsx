import React, { useEffect, useMemo, useState } from 'react'
import SingleEvent from '../component/events/SingleEvent';
import { img } from '../assets/assets';
import { capitalize, getMonth } from '../utils/customUtility';
import { useDebounce } from '../context/useDebounce';
import { useGetAllOwnEventsQuery } from '../api/api';
import Search from '../component/Search/Search';
import { CrossIcon, FoodIcon } from '../assets/svg/Icon';

function OwnEvents() {
    const [search, setSearch] = useState(true);
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState({
        type: "private",
        sortby: "desc",
        status: "upcoming"
    });

    const date = useMemo(() => {
        return events.map(d => {
            const eventDate = new Date(d.startDate);
            return `${eventDate.getDate()} ${getMonth(eventDate.getMonth())}`;
        });
    }, [events]);
    if (!events) {
        return <div>Loading...</div>;
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
            <div className='flex gap-2 flex-wrap my-5'>
                {Object.keys(filter).map((key) => (
                    <label key={key} className='cursor-pointer relative inline-flex items-center' >
                        <div className={`py-2 rounded-md cursor-pointer mt-2 w-full flex justify-center gap-2 items-center bg-primary px-3 text-white`}>
                            <h1>{capitalize(filter[key])}</h1>
                            {/* <div
                                onClick={() => {
                                    setEvent((prev) => ({ ...prev, offers: [...prev.offers].filter((i) => i !== item) }))
                                    setOfferToSelect((prev) => (prev.map((prevItem) => (prevItem.text === item ? { ...prevItem, checked: !prevItem.checked } : prevItem))))
                                }}> */}
                            <CrossIcon className="mr-3" />
                            {/* </div> */}
                        </div>
                    </label>

                ))}
            </div>
            <div className='grid grid-cols-2 gap-5'>
                {events && events.length > 0 && events.map((event, index) => (
                    <SingleEvent
                        key={index}
                        eventId='66c87da83c2e7bb657c929ba'
                        date={date[index]}
                        img={img.eventImg3}
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