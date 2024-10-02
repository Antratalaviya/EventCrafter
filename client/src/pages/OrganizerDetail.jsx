import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../component/Button';
import { useSelector } from 'react-redux';
import { capitalize, getMonth } from '../utils/customUtility';
import { CalenderIcon, TimeIcon, UserIcon } from '../assets/svg/Icon';
import SingleEvent from '../component/events/SingleEvent';
import { useGetConnectionExistQuery, useGetOwnPublicEventsQuery, useGetUserByIdQuery, useGetUserQuery, useSendConnectionRequestMutation } from '../api/api';
import { toast } from 'react-toastify';

function OrganizerDetail() {
    const { userId } = useParams();
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        page: 1,
        limit: 10,
    });
    const [events, setEvents] = useState([]);
    const [connection, setConnection] = useState();

    const memoizedFilter = useMemo(() => filter, [filter]);

    const [sendRequest] = useSendConnectionRequestMutation();
    const { data: userObj, isSuccess: userSuccess } = useGetUserByIdQuery(userId);
    const { data, isSuccess } = useGetOwnPublicEventsQuery({ filter: memoizedFilter, userId });
    const { data: connectionObject, isSuccess: connectionSuccess } = useGetConnectionExistQuery(userId);

    const handleSendRequest = async () => {
        try {
            const response = await sendRequest({ recipientId: userId })
            if (response.success) {
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const date = useMemo(() => {
        return events.map(d => {
            const eventDate = new Date(d.startDate);
            return `${eventDate.getDate()} ${getMonth(eventDate.getMonth())}`;
        });
    }, [events]);

    useEffect(() => {
        if (connectionSuccess) {
            setConnection(connectionObject.data[0])
        }
    }, [connectionObject])

    useEffect(() => {
        if (userSuccess) {
            setUser(userObj.data)
        }
        console.log(userObj)
    }, [userObj])

    useEffect(() => {
        if (isSuccess) {
            setEvents(data.data)
        }
    }, [data])
    return (
        <div className='text-white p-5 overflow-y-scroll'>
            <div className='p-5 rounded-md space-y-2 grid grid-cols-4 bg-black-light gap-3'>
                <p className='col-span-4 text-xl'>Organizer Details</p>
                {user && (
                    <>
                        <div className='flex justify-around items-center col-span-1'>
                            <div className='rounded-full overflow-hidden ring-4 ring-black-light size-20'>
                                <img src={user.avatar} alt="User Avatar" />
                            </div>
                            <div className='space-y-2'>
                                <p>{capitalize(`${user.name} ${user.surname}`)}</p>
                                <p className='text-sm text-body-text'>{`${user.subscriber} Subscribers`}</p>
                                <div className='flex gap-2 h-8'>

                                    {user.orgType === 'personal' && (
                                        <div className='rounded-md bg-red-gradient text-white px-4 flex items-center justify-center'>
                                            <p>Personal Account</p>
                                        </div>
                                    )}
                                    {user.orgType === 'institute' && (
                                        <div className='rounded-md bg-public text-white px-5 flex items-center justify-center'>
                                            <p>Institute Account</p>
                                        </div>
                                    )}
                                    {user.orgType === 'company' && (
                                        <div className='rounded-md bg-workshop text-white px-3 flex items-center justify-center'>
                                            <p>Company Account</p>
                                        </div>
                                    )}
                                    {user.orgType === 'school' && (
                                        <div className='rounded-md bg-primary text-white px-5 flex items-center justify-center'>
                                            <p>School Account</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                        <div className='flex items-center col-span-2 gap-8'>
                            <div className='col-center space-y-2'>
                                <p className='text-body-text'>Events</p>
                                <p>{user.events}</p>
                            </div>
                            <div className='h-16 border-r border-body-text' />
                            <div className='col-center space-y-2'>
                                <p className='text-body-text'>Joint Events</p>
                                <p>{user.joinedEvent}</p>
                            </div>
                            <div className='h-16 border-r border-body-text' />
                            <div className='col-center space-y-2'>
                                <p className='text-body-text'>Sunscribing</p>
                                <p>{user.subscribing}</p>
                            </div>
                            {!connection && (
                                <Button
                                    className='rounded-md bg-primary text-white py-2 w-36 row-center '
                                    text="Send Request"
                                    onClick={handleSendRequest}
                                />
                            )}
                            {connection && (
                                <>
                                    {connection.isAccepted || connection.pending ? (
                                        <div className='flex items-center justify-end'>
                                            {connection.pending ? (
                                                <Button
                                                    className='rounded-md bg-primary text-white py-2 w-36 row-center '
                                                    text="Request Sent"
                                                />
                                            ) : (
                                                <p className='text-sm text-green'>{"Accepted"}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <Button
                                            className='rounded-md bg-primary text-white py-2 w-36 row-center '
                                            text="Send Request"
                                            onClick={handleSendRequest}
                                        />
                                    )}
                                </>
                            )}
                        </div>

                    </>
                )}
            </div>
            <hr className='text-body-text/30 my-5' />
            <div className='grid grid-cols-2 gap-5 rounded-md bg-black-light p-5'>
                {events && events.length > 0 && events.map((event, index) => (
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
            </div>
            <div className='mt-4 ml-auto w-1/5 gap-2 flex px-2'>
                <Button
                    onEvent={() => navigate(-1)}
                >
                    Back
                </Button>
            </div>
        </div>
    )
}

export default OrganizerDetail