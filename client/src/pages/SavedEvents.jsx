import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import SingleEvent from '../component/events/SingleEvent';
import { getMonth } from '../utils/customUtility';
import { useGetSavedEventsQuery } from '../api/api';
import { Spinner } from '@material-tailwind/react';
import { SecurityModeIcon } from '../assets/svg/Icon';

function SavedEvents() {
    const { data, isSuccess } = useGetSavedEventsQuery();
    const [savedEvents, setSavedEvents] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            setSavedEvents(data?.data)
        }
    }, [data])

    const date = useMemo(() => {
        return savedEvents.map(d => {
            const eventDate = new Date(d.startDate);
            return `${eventDate.getDate()} ${getMonth(eventDate.getMonth())}`;
        });
    }, [savedEvents]);

    if (!savedEvents) {
        return <Spinner />;
    }
    return (
        <div className='h-[77%] p-5 overflow-y-scroll'>
            <div className='grid grid-cols-1 gap-5 h-full'>
                {savedEvents && savedEvents.length > 0 && savedEvents.map((event, index) => (
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
                        saved={true}
                    />
                ))}
                {savedEvents.length === 0 && (
                    <div className='col-center text-white space-y-3'>
                        <SecurityModeIcon />
                        <h1>No Saved Events !!!</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SavedEvents