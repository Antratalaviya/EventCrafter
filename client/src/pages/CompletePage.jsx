import React, { useEffect, useState } from 'react'
import Modal from '../component/Modal/Modal'
import { Link, Navigate } from 'react-router-dom'
import { useCreateOrderMutation, useSessionStatusMutation, useUpdateEventStatusMutation } from '../api/api';
import { img } from '../assets/assets';
import Button from '../component/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getItem } from '../utils/localStorageUtility';
import { setPaymentDone } from '../store/GlobalSlice';

function CompletePage() {
    const eventId = JSON.parse(getItem("eventId"))
    const user = useSelector((state) => state.auth.userData);
    const paymentDone = useSelector((state) => state.global.paymentDone);
    const [session, setSession] = useState(null);
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState(null);
    const [sessionStatus] = useSessionStatusMutation();
    const [updateEventStatus] = useUpdateEventStatusMutation();
    const [createOrder] = useCreateOrderMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        const handlePayment = async () => {
            console.log(eventId)
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const sessionId = urlParams.get('session_id');

            const response = await sessionStatus({ session_id: sessionId }).unwrap()
            if (response.success) {
                setSession(response.data.session);
                setStatus(response.data.status);
                setCustomerEmail(response.data.customer_email);
            }
        }

        handlePayment();

    }, []);

    useEffect(() => {
        (async () => {
            const response = await updateEventStatus({ eventId: eventId, status: "upcoming" }).unwrap();
            if (response.success) {
                toast.success("Your payment has been done successfully");
            }
            if (session && !paymentDone) {
                const res = await createOrder({ session: session, userId: user._id }).unwrap();
                if (res.success) {
                    dispatch(setPaymentDone(true))
                }
            }
        })();
    }, [status])

    if (status === 'open') {
        return (
            <Navigate to="/payment" />
        )
    }

    return (
        <div>
            {status === 'cancelled' ? (
                <Modal open={true}>
                    <div className='text-white text-center flex flex-col items-center'>
                        <img src={img.done} alt="done" className='w-4/5 h-3/5' />
                        <div className='flex flex-col items-center gap-3'>
                            <h1 className='text-3xl'>Sorry !</h1>
                            <p className='text-body-text'>Your payment has been failed .</p>
                            <Link to={`/own-events`} className='w-full'>
                                <Button
                                    text='View Events'
                                    className="h-14"
                                />
                            </Link>
                        </div>
                    </div>
                </Modal>
            ) : (
                <Modal open={true}>
                    <div className='text-white text-center flex flex-col items-center'>
                        <img src={img.done} alt="done" className='w-4/5 h-3/5' />
                        <div className='flex flex-col items-center gap-3'>
                            <h1 className='text-3xl'>Bingo !</h1>
                            <p className='text-body-text'>Your payment has been done successfully .</p>
                            <section id="success" className='text-sm text-left pl-10 pr-2'>
                                <li>
                                    We appreciate your business! A confirmation email will be sent to {customerEmail}. </li>
                                <li>
                                    If you have any questions, please email <Link to={"mailto:antratalaviya@example.com"}>eventcrafter@example.com</Link>.
                                </li>
                            </section>
                            <Link to={`/event/${eventId}`} className='w-full'>
                                <Button
                                    text='View Events'
                                    className="h-14"
                                />
                            </Link>
                        </div>
                    </div>
                </Modal>
            )}


        </div>
    )
}

export default CompletePage