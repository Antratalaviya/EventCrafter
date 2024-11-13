import React, { useEffect, useState } from 'react'
import { SelectIcon } from '../assets/svg/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { setAcceptConcent, setPayment, setProgress, } from '../store/GlobalSlice';
import { setItem } from '../utils/localStorageUtility';
import { capitalize } from '../utils/customUtility';
import { CONSTS } from '../utils/consts';
import { useGetFullEventQuery } from '../api/api';
import { setEvent, updateEvent } from '../store/EventSlice';

function CreateEventPage4() {
    const event = useSelector((state) => state.event.event);

    const amount = useSelector((state) => state.global.payment.amount);
    const dispatch = useDispatch();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const eventId = urlParams.get('eventId');
    const { data, isSuccess } = useGetFullEventQuery(eventId)

    useEffect(() => {
        const status = urlParams.get('status');
        if (status === 'draft') {
            dispatch(setProgress(4));
            setItem(CONSTS.EVENTID, JSON.stringify(eventId));
        } else {
            dispatch(setProgress(1))
        }
        if (event.type !== 'private') {
            dispatch(setPayment({ amount: 9.95, name: `${capitalize(event.type)} Event Creation Purchase`, description: "Selected Silver Package" }))
        }
        dispatch(setAcceptConcent(false));
    }, [])

    useEffect(() => {
        dispatch(setEvent(data?.data[0]))
        console.log(event)
    }, [data])
    console.log(event)
    return (
        <>
            {event.type === 'private' ? (
                <div className='w-full grid grid-cols-1 text-white space-y-3 gap-5 py-5'>
                    <div className='space-y-3'>
                        <p className='text-xl'>Promotional package</p>
                        <div className='text-body-text'>
                            <li>You can choose one of 3 ways to promote your event</li>
                            <li>Only you determine the reach and success of your event</li>
                            <li>Business expenses are tax deductible.</li>
                            <li>Good advertising is very important for an event</li>
                            <li>We wish you much success</li>
                        </div>
                    </div>

                    <div className='bg-gradient-to-r from-[#444444] to-[#ACACAC] border-2 border-white rounded-2xl p-5 space-y-3 from-30%'>
                        <div className='flex justify-between'>
                            <p>Silver</p>
                            <SelectIcon />
                        </div>
                        <p className='text-xl'>{`${amount}$`}</p>
                        <hr />
                        <div>
                            <li>Create a private event to invite  your contacts</li>
                            <li>Possible with this package</li>
                            <li>These are events where no promotion or sponsors are needed. Just to send invitations.</li>
                            <li>In order to create a private event, you must select “Private event - Without promotion”.</li>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='w-full grid grid-cols-3 text-white space-y-3 gap-5 py-5'>
                    <div className='space-y-3 col-span-3'>
                        <p className='text-xl'>Promotional package</p>
                        <div className='text-body-text'>
                            <li>You can choose one of 3 ways to promote your event</li>
                            <li>Only you determine the reach and success of your event</li>
                            <li>Business expenses are tax deductible.</li>
                            <li>Good advertising is very important for an event</li>
                            <li>We wish you much success</li>
                        </div>
                    </div>

                    <div className='col-span-1 cursor-pointer bg-gradient-to-r from-[#444444] to-[#ACACAC] border-2 border-white rounded-2xl p-5 space-y-3 from-30%' onClick={() => dispatch(setPayment({ amount: 9.95, name: `${capitalize(event.type)} Event Creation Purchase`, description: "Selected Silver Package" }))}>
                        <div className='flex justify-between'>
                            <p>Silver</p>
                            <div className='cursor-pointer'>
                                {amount === 9.95 ? <SelectIcon /> : (
                                    <div className='w-4 h-4 rounded-full ring-1 ring-white' />
                                )}
                            </div>
                        </div>
                        <p className='text-xl'>9.95$ / 7 Days</p>
                        <hr />
                        <div className='font-light text-[14px]'>
                            <li>The event/workshop is shown:</li>
                            <li>Below the carousel. </li>
                            <li>Will be listed in the search results </li>
                            <li>Will be displayed on your profile page </li>
                            <li>Will be displayed on the map</li>
                        </div>
                    </div>
                    <div className='col-span-1 cursor-pointer bg-gradient-to-r from-[#BF8E17] to-[#E6C060] border-2 border-white rounded-2xl p-5 space-y-3 from-30%' onClick={() => dispatch(setPayment({ amount: 19.95, name: `${capitalize(event.type)} Event Creation Purchase`, description: "Selected Gold Package" }))}>
                        <div className='flex justify-between'>
                            <p>Gold</p>
                            <div className='cursor-pointer'>
                                {amount === 19.95 ? <SelectIcon /> : (
                                    <div className='w-4 h-4 rounded-full ring-1 ring-white' />
                                )}
                            </div>
                        </div>
                        <p className='text-xl'>19.95$ / 7 Days</p>
                        <hr />
                        <div className='font-light text-[14px]'>
                            <li>The event/workshop is shown </li>
                            <li>Below the carousel. </li>
                            <li>Will be listed in the search results </li>
                            <li>Will be displayed on your profile page </li>
                            <li>Will be displayed on the map </li>
                            <li>Will be highlighted in color</li>
                            <li>An event icon will appear on your Leylix ID card sothat everyone can see that you have created events</li>
                        </div>
                    </div>
                    <div className='col-span-1 cursor-pointer bg-gradient-to-r from-[#60C5BE] to-[#087B7A] border-2 border-white rounded-2xl p-5 space-y-3 from-30%' onClick={() => dispatch(setPayment({ amount: 39.95, name: `${capitalize(event.type)} Event Creation Purchase`, description: "Selected Premium Package" }))}>
                        <div className='flex justify-between'>
                            <p>Premium</p>
                            <div className='cursor-pointer'>
                                {amount === 39.95 ? <SelectIcon /> : (
                                    <div className='w-4 h-4 rounded-full ring-1 ring-white' />
                                )}
                            </div>
                        </div>
                        <p className='text-xl'>39.95$ / 7 Days</p>
                        <hr />
                        <div className='font-light text-[14px]'>
                            <li>The event/workshop is shown </li>
                            <li>Below the carousel.</li>
                            <li>Will be listed in the search results</li>
                            <li>Will be displayed on your profile page </li>
                            <li>Will be displayed on the map </li>
                            <li>Will be highlighted in color </li>
                            <li>An event icon will appear on your Leylix ID card so that everyone can see that you have created events </li>
                            <li>In contact lists of your contacts and in the group member list </li>
                            <li>If users want to share their location, it will also be shown in the list below. </li>
                            <li>Will be highlighted on the map </li>
                            <li>Will also be highlighted for the sponsors if you have shared them in the sponsors world</li>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateEventPage4