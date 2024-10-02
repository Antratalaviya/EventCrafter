import React, { useEffect, useState } from 'react'
import Button from '../component/Button';
import { CurrectIcon } from '../assets/svg/Icon';
import '../index.css'
import Modal from '../component/Modal/Modal';
import { uploadImg } from '../Firebase/upload';
import { useCreateEventMutation } from '../api/api';
import Spinner from "../component/Spinner"
import { img } from '../assets/assets';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setEvent } from '../store/EventSlice';
import { setAcceptConcent, setProgress } from '../store/GlobalSlice';
import { getItem } from '../utils/localStorageUtility';

function CreateWorkShopEvent() {
    const [openConsent, setOpenConsent] = useState(false);

    const [eventCreated, setEventCreated] = useState();
    const [create, setCreate] = useState(false);

    const navigate = useNavigate();

    const acceptConcent = useSelector((state) => state.global.acceptConcent);
    const progress = useSelector((state) => state.global.progress);
    const eventId = JSON.parse(getItem("eventId"))
    const event = useSelector((state) => state.event.event);
    const dispatch = useDispatch();

    const [createEvent, { isLoading }] = useCreateEventMutation()

    useEffect(() => {
        dispatch(setEvent({ type: "workshop" }))
    }, [])

    const handleCreateEvent = async () => {
        try {
            const urlPhotos = await Promise.all(event.photos.map(uploadImg));

            if (urlPhotos.every((url) => url !== undefined)) {
                const updatedEvent = {
                    ...event,
                    photos: urlPhotos.map((url) => ({ url }))
                };
                setEvent(updatedEvent);
                if (urlPhotos.every((url) => url && typeof url === 'string')) {
                    const result = await createEvent({ ...updatedEvent, type: "workshop" }).unwrap();
                    setEventCreated(result?.data[0]);

                    if (result.success) {
                        return 1;
                    }
                }
            }
        } catch (error) {
            toast.error("All Fields are required")
        }
        return 0;
    };

    useEffect(() => {
        if (progress > 0 && progress < 4) {
            navigate(`/create-event/create-workshop-event/${progress}`);
        } else if (progress === 4) {
            navigate(`/create-event/create-workshop-event/${progress}?eventId=${eventCreated ? eventCreated._id : eventId}`);
        }
    }, [progress]);

    useEffect(() => {
        if (acceptConcent) {
            navigate('/payment');
        }
    }, [acceptConcent, navigate]);

    const increaseProgress = async () => {
        console.log(event);

        if (progress === 4) {
            setOpenConsent(true);
        } else if (progress === 3) {
            setCreate(true);

            try {
                const res = await handleCreateEvent();
                if (res === 1) {
                    toast("Event created successfully");
                    setCreate(false);
                    dispatch(setProgress(Math.min(progress + 1, 4)));
                    dispatch(setEvent(null));

                } else {
                    toast("Event creation failed");
                    dispatch(setProgress(1));
                }
            } catch (error) {
                toast("Something went wrong. Please try again.");
                setCreate(false);
            }

        } else {
            dispatch(setProgress(Math.min(progress + 1, 4)));
        }
    };


    const decreaseProgress = () => {
        dispatch(setProgress(Math.max(progress - 1, 1)));
        if (acceptConcent) {
            dispatch(setAcceptConcent(false));
        }
        if (progress === 3) {
            setCreate(false)
        }
    };

    return (
        <div className='overflow-y-scroll overflow-x-hidden h-screen w-full p-5'>
            <div className={`container-style p-5 space-y-5 border-2 border-stroke relative text-white ${progress > 4 && "hidden"}`}>
                <ProgressBar progress={progress} />
                <div className="p-4 border-b-2 border-body-text">
                    {
                        create ?
                            <Spinner className="absolute top-0 left-0 h-full w-full backdrop-blur-sm" />
                            :
                            <Outlet />
                    }
                </div>
                <div className="mt-4 ml-auto w-1/5 gap-2 flex">
                    <Button
                        onEvent={decreaseProgress}
                        className="bg-dark"
                    >
                        Cancel
                    </Button>
                    <Button
                        onEvent={increaseProgress}
                        text={isLoading ? "Loading..." : (progress === 4 ? "Continue" : "Next")}
                    />
                </div>
            </div>
            <Modal open={openConsent} ModalClassName={'w-1/3'} className={'overflow-y-scroll'}>
                <div className='w-full h-full col-center space-y-2 text-white'>
                    <p>Declaration of consent</p>
                    <div className='h-1 border-b border-body-text w-full' />
                    <div className={`w-full space-y-4 p-2 text-body-text `}>
                        <p>In order for your event to be displayed throughout the eventCrafter for sponsorship purposes, please give us your permission. Only software belonging to eventCrafter. include your event, only with the sole purpose of advertising your event and finding sponsors for your event! You grant us this permission for all countries where eventCrafter. products are used.</p>
                        <p>Images, texts, descriptions can be used by eventCrafter. products without restriction, in the context of the event publication. The creator of the event is solely responsible for the uploaded images, texts and descriptions. Copyrights on images, texts and descriptions may not be violated and the organizer of the event is solely responsible for compliance. In the world of eventCrafter we would like to point out that no images may be copied, used or distributed.</p>

                        <div>
                            <li className='text-white'>Sponsorship fees</li>
                            <p className='pl-5'>12% of the sponsorship amounts will be deducted before being transferred to the organizer</p>
                        </div>
                    </div>
                    <div className='w-full space-y-3'>
                        <p className='text-body-text'>You accept this declaration of consent?</p>
                        <Button
                            text={'I Accept'}
                            onEvent={() => {
                                setOpenConsent(false);
                                dispatch(setAcceptConcent(true));
                            }}
                        />
                        <Button
                            text={'I Do not accept'}
                            className='bg-dark'
                            onEvent={() => {
                                setOpenConsent(false);
                                dispatch(setAcceptConcent(false));
                                navigate('/');
                            }}
                        />
                    </div>
                </div>
            </Modal>
            {eventCreated && (
                <Modal open={acceptConcent}>
                    <div className='text-white col-center'>
                        <img src={img.done} alt="done" className='w-4/5 h-3/5' />
                        <div className='col-center gap-3'>
                            <h1 className='text-3xl'>Bingo !</h1>
                            <p className='text-body-text'>Your event has been created successfully .</p>
                            <Link to={`/event/${eventCreated._id}`} className='w-full'>
                                <Button
                                    text='View Event'
                                    className="h-14"
                                    onClick={() => setAcceptConcent(false)}
                                />
                            </Link>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default CreateWorkShopEvent

const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full rounded-full h-2 overflow-hidden bg-dark mt-5">
            <div
                className="bg-gradient-to-r from-green h-full rounded-full "
                style={{ width: `${progress * 20}%` }}
            >
                <div className='flex justify-evenly items-center '>
                    <div className={`${progress >= 1 ? (progress > 1 ? "bg-green" : "bg-primary border-2 border-green size-12") : "text-body-text bg-dark"} grid place-items-center rounded-full p-4 absolute size-10 left-[20%]`}>
                        {progress > 1 ? <CurrectIcon className="size-5 -translate-x-1.5 -translate-y-1.5" /> : <p className=' -translate-y-1'>1</p>}
                    </div>
                    <div className={`${progress >= 2 ? (progress > 2 ? "bg-green" : "bg-primary border-2 border-green size-12") : "text-body-text bg-dark"} grid place-items-center rounded-full p-4 absolute size-10 left-[40%]`}>
                        {progress > 2 ? <CurrectIcon className="size-5 -translate-x-1.5 -translate-y-1.5" /> : <p className=' -translate-y-1'>2</p>}
                    </div>
                    <div className={`${progress >= 3 ? (progress > 3 ? "bg-green" : "bg-primary border-2 border-green size-12") : "text-body-text bg-dark"} grid place-items-center rounded-full p-4 absolute size-10 left-[60%]`}>
                        {progress > 3 ? <CurrectIcon className="size-5 -translate-x-1.5 -translate-y-1.5" /> : <p className=' -translate-y-1'>3</p>}
                    </div>
                    <div className={`${progress >= 4 ? (progress > 4 ? "bg-green" : "bg-primary border-2 border-green size-12") : "text-body-text bg-dark"} grid place-items-center rounded-full p-4 absolute size-10 left-[80%]`}>
                        {progress > 4 ? <CurrectIcon className="size-5 -translate-x-1.5 -translate-y-1.5" /> : <p className=' -translate-y-1'>4</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};