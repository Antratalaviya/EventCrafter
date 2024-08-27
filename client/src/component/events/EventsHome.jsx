import React, { useMemo } from 'react'
import SingleEvent from './SingleEvent'
import { img } from '../../assets/assets'
import { getMonth } from '../../utils/customUtility';

function EventsHome({ events }) {

    const date = useMemo(() => {
        return events.map(d => {
            const eventDate = new Date(d.startDate);
            return `${eventDate.getDate()} ${getMonth(eventDate.getMonth())}`;
        });
    }, [events]);

    if (!events) {
        return <div>No data....</div>;
    }

    return (
        <div className='flex flex-col space-y-5'>
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
    )
}

export default EventsHome
