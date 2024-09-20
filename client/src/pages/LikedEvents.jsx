import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import SingleEvent from '../component/events/SingleEvent';
import { getMonth } from '../utils/customUtility';
import { useGetLikedEventsQuery } from '../api/api';
import { Spinner } from '@material-tailwind/react';

function LikedEvents() {
    const { data, isSuccess } = useGetLikedEventsQuery();
    const [likedEvents, setLikedEvents] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            setLikedEvents(data?.data)
        }
    }, [data])

    const date = useMemo(() => {
        return likedEvents.map(d => {
            const eventDate = new Date(d.startDate);
            return `${eventDate.getDate()} ${getMonth(eventDate.getMonth())}`;
        });
    }, [likedEvents]);

    if (!likedEvents) {
        return <Spinner />;
    }
    return (
        <div className='h-[77%] overflow-y-scroll p-5'>
            <div className='grid grid-cols-1 gap-5'>
                {likedEvents && likedEvents.map((event, index) => (
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
                        liked={true}
                        saved={event.saved}
                    />
                ))}
            </div>
        </div>
    )
}

export default LikedEvents