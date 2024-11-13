import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import SingleEvent from '../component/events/SingleEvent';
import { getMonth } from '../utils/customUtility';
import { useGetLikedEventsQuery } from '../api/api';
import { ArrowIcon, SecurityModeIcon } from '../assets/svg/Icon';
import Spinner from '../component/Spinner';

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
        return <div className='h-screen w-screen grid place-items-center'>
            <Spinner />
        </div>
    }
    return (
        <div className='flex flex-col flex-grow p-5'>
            <Link to={'/settings'} className='pb-2'>
                <ArrowIcon />
            </Link>
            <div className='flex flex-col space-y-5'>
                {likedEvents && likedEvents.length > 0 && likedEvents.map((event, index) => (
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
                {likedEvents.length === 0 && (
                    <div className='col-center text-white space-y-3 min-h-[70vh]'>
                        <SecurityModeIcon />
                        <h1>No Liked Events !!!</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LikedEvents