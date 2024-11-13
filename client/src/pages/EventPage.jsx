import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAcceptInvitationsMutation, useCancelEventMutation, useGetFullEventQuery, useRejectInvitationsMutation } from '../api/api';
import { capitalize, getDay, getFullDay, getFullTime, getMonth } from '../utils/customUtility';
import { CalenderIcon, CarIcon, DropDownIcon, LikeIcon, LocationIcon } from '../assets/svg/Icon';
import ProfilesComponent from '../component/ProfilesComponent';
import Spinner from '../component/Spinner';
import { img } from '../assets/assets';
import { offers as EventOffer } from '../lib/consts';
import Button from '../component/Button';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function EventPage() {
    const { eventId } = useParams();
    const [event, setEvent] = useState();

    const { data, isSuccess } = useGetFullEventQuery(eventId);

    const user = useSelector((state) => state.auth.userData);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const invitation = urlParams.get("invitation");

    const [acceptInvitation, { isLoading: acceptLoading }] = useAcceptInvitationsMutation();
    const [rejectedInvitation, { isLoading: rejectLoading }] = useRejectInvitationsMutation();
    const [cancelEvent, { isLoading: cancelEventLoading }] = useCancelEventMutation();

    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            setEvent({ ...data.data[0] })
        }
    }, [data])

    const handleAccept = async () => {
        try {
            const response = await acceptInvitation({ invitationId: invitation }).unwrap();
            if (response.success) {
                toast.success(response.message)
            }
            navigate("/settings/your-friends/invitation/received")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleReject = async () => {
        try {
            const response = await rejectedInvitation({ invitationId: invitation }).unwrap();
            if (response.success) {
                toast.success(response.message)
            }
            navigate("/settings/your-friends/invitation/received")
        } catch (error) {
            toast.error(error.message)
        }
    }
    const handleCancelEvent = async () => {
        try {
            const response = await cancelEvent({ eventId: event._id }).unwrap();
            if (response.success) {
                toast.success(response.message)
            }
            navigate(-1);
        } catch (error) {
            toast.error(error.message)
        }
    }

    if (!event) {
        return <div className='h-screen w-screen grid place-items-center'>
            <Spinner />
        </div>
    }
    return (
        <div className='p-5 w-full h-full text-white overflow-y-scroll'>
            <div className='bg-black-light rounded-md border border-dark p-5 space-y-5 text-[12px]'>
                <div className='w-full h-80 rounded-md overflow-hidden'>
                    <img src={event.photos[0].url} alt="event_img" className='w-full h-full' />
                </div>
                <div className='flex items-center'>
                    <h1 className='text-2xl'>{capitalize(event.title)}</h1>
                    {event.economy_price && (
                        <div className='rounded-md bg-black-light text-white px-4 py-2 col-span-1 flex items-center justify-center ml-5 border gap-2 border-body-text'>
                            <p className="text-xl">VIP</p>
                            <p className='text-public'><span className='text-xl font-semibold'>{`$${event.vip_price}/`}</span>per person</p>

                        </div>
                    )}
                    {event.vip_price && (
                        <div className='rounded-md bg-black-light text-white px-4 py-2 col-span-1 flex items-center justify-center ml-5 border gap-2 border-body-text'>
                            <p className="text-xl">Economy</p>
                            <p className='text-public'><span className='text-xl font-semibold'>{`$${event.economy_price}/`}</span>per person</p>
                        </div>
                    )}
                </div>
                <div className='flex items-center gap-5'>
                    <div className='rounded-md bg-primary text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                        <p>{capitalize(event.category)}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <LikeIcon className="fill-red stroke-red" />
                        <p>{event.likedBy}</p>
                    </div>
                    <div className='relative flex items-center'>
                        <ProfilesComponent />
                        <div className="rounded-full overflow-hidden text-white/75 flex justify-center items-center bg-[#1E232D] p-2 -translate-x-9 z-10">
                            <p className='text-[12px]'>{event.participants}+Going</p>
                        </div>
                    </div>
                    {event.type === 'private' && (
                        <div className='rounded-md bg-orange text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                            <p>Private</p>
                        </div>
                    )}
                    {event.type === 'public' && (
                        <div className='rounded-md bg-public text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                            <p>Public</p>
                        </div>
                    )}
                    {event.type === 'workshop' && (
                        <div className='rounded-md bg-workshop text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                            <p>Workshop</p>
                        </div>
                    )}
                    {event.type === 'ticket' && (
                        <div className='rounded-md bg-ticket text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                            <p>Ticket</p>
                        </div>
                    )}
                    {event.type === 'business' && (
                        <div className='rounded-md bg-red-gradient text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                            <p>Business</p>
                        </div>
                    )}
                </div>
                <div className='flex items-center gap-10'>
                    <Link to={`/organizer/${event.userId}`}>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-full size-10 overflow-hidden'>
                                <img src={event.avatar} alt="profile_img" className='h-10 w-16' />
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-white'>{`${capitalize(event.name)} ${capitalize(event.surname)}`}</p>
                                <p>{`${event.subscriber} Subscribers`}</p>
                            </div>
                            <div className='rounded-md bg-primary text-white px-5 py-2 col-span-1 flex items-center justify-center ml-5'>
                                <p>Subscribe</p>
                            </div>
                        </div>
                    </Link>
                    <div className='flex items-center gap-2'>
                        <div className='rounded-full size-10 overflow-hidden flex items-center justify-center bg-white/20'>
                            <CalenderIcon className="size-5 fill-white" />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-white'>{`${getFullDay(new Date(event.startDate).getDay())} ${new Date(event.startDate).getDate()} ${getMonth(new Date(event.startDate).getMonth())} ${new Date(event.startDate).getFullYear()}`}</p>
                            <p>{`${getFullTime(event.startTime, event.endTime)}`}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='rounded-full size-10 overflow-hidden flex items-center justify-center bg-white/20'>
                            <LocationIcon className="size-5 fill-white" />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-white'>{`${capitalize(event.street)}`}</p>
                            <p>{`${capitalize(event.street)}, ${capitalize(event.city)}, ${capitalize(event.country)}`}</p>
                        </div>
                    </div>
                </div>
                <div className='space-y-5 w-1/3'>
                    <Link to={`/event/participants/${eventId}`}>
                        <div className='shadow-custom-black p-4 flex items-center justify-around bg-new-card/50 rounded-lg'>
                            <div>
                                <p className='text-white/70 text-base'>Event Attendance List</p>
                            </div>
                            <div className="relative flex items-center ">
                                <div className="-space-x-2 flex overflow-hidden">
                                    <ProfilesComponent />
                                    <img src={img.p4} alt="profile1" className='inline-block size-8 rounded-full ring-2 ring-icon-bg' />
                                </div>
                                <DropDownIcon fill="white" className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='p-2'>
                    <h1>About Event</h1>
                    <p className='text-body-text'>{event.description}</p>
                </div>
                <div className='flex flex-col space-y-2 p-2'>
                    <h1>Possibilities</h1>
                    <div className='flex items-center'>
                        {EventOffer.map((offer) =>
                            event.offers.includes(offer.text) && (
                                <div className='flex' key={offer.text}>{offer.icon}
                                    <p className='size-6 border-r border-body-text mr-5'></p>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className='space-y-2 p-2'>
                    <p>Parking spaces</p>
                    <div className='flex items-center gap-2'>
                        <CarIcon />
                        <p className='size-6 border-r border-body-text -ml-4 mr-2'></p>
                        <p>{`${event.carCapacity} + cars parking`}</p>
                    </div>
                </div>
                <hr className='text-body-text' />
                <div className='flex justify-between '>
                    {invitation ? (
                        <Button
                            className="w-2/12 bg-red hover:bg-red/80"
                            text={rejectLoading ? "Loading..." : "Reject"}
                            onClick={handleReject}
                        />
                    ) : (
                        <Button
                            className="w-2/12 bg-dark hover:bg-dark/80"
                            text="Back"
                            onClick={() => navigate(-1)}
                        />
                    )
                    }
                    {invitation ? (
                        <Button
                            onClick={handleAccept}
                            className="w-2/12"
                            text={acceptLoading ? "Loading..." : "Accept"}
                        />
                    ) : event.status === 'draft' ? (
                        <Link to={`/create-event/create-${event.type}-event/4?eventId=${event._id}&status=${event.status}`} className="w-2/12">
                            <Button
                                text="Continue Payment"
                            />
                        </Link>
                    ) : event.userId === user._id && (
                        <Button
                            className="bg-red text-sm hover:bg-red/80 w-2/12"
                            text={cancelEventLoading ? "Loading..." : "Cancel Event"}
                            onClick={handleCancelEvent}
                        />
                    )
                    }
                </div>
            </div>
        </div >
    )
}

export default EventPage