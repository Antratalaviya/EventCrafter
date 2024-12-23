import React, { useEffect, useState } from "react";
import Input from "../component/Input";
import { useParams } from "react-router-dom";
import { useGetFullEventQuery, useGetUserByIdQuery } from "../api/api";
import { capitalize, getFullDay, getFullMonth, getFullTime } from "../utils/customUtility";
import Spinner from "../component/Spinner";
import Button from "../component/Button";
import { AddCircleIcon, CalenderIcon, EmailIcon, UserIcon } from "../assets/svg/Icon";
import Modal from "../component/Modal/Modal";

const EventBooking = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState();
    const [owner, setOwner] = useState();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        gender: "",
        email: "",
        mobileNumber: "",
        numberOfSeatsEconomy: 0,
        numberOfSeatsVIP: 0,
    });

    const [orderPlaced, setOrderPlaced] = useState(false);


    const { data, isSuccess } = useGetFullEventQuery(eventId, { skip: !eventId })
    const { data: userData, isSuccess: isUserDataSuccess } = useGetUserByIdQuery(event?.owner, { skip: !event?.owner })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOrderPlaced(true);
    };

    useEffect(() => {
        if (isSuccess) {
            setEvent(data.data[0]);
        }
    }, [data])

    useEffect(() => {
        if (isUserDataSuccess) {
            setOwner(userData.data)
        }
    }, [userData])
    if (!event && !owner) {
        return <div className='h-screen w-screen grid place-items-center'>
            <Spinner />
        </div>
    }
    return (
        <div className="mx-auto p-5 text-white overflow-y-scroll h-screen w-full">
            <div className="">
                {!orderPlaced && owner ? (
                    <form onSubmit={handleSubmit} className="grid grid-cols-2">
                        <div className="col-span-1">
                            {/* User Information */}
                            <div className="p-4 rounded-lg mb-4 shadow-md space-y-5">
                                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='space-y-2'>
                                        <label className="block text-sm">Your Name</label>
                                        <div className='relative w-full'>
                                            <UserIcon className="absolute top-3 left-2 transform" />
                                            <Input
                                                type="text"
                                                name="name"
                                                placeholder="Your Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={'pl-8'}
                                            />
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        <label className="block text-sm">Your Surname</label>
                                        <div className='relative w-full'>
                                            <UserIcon className="absolute top-3 left-2" />
                                            <Input
                                                type="text"
                                                name="surname"
                                                placeholder="Your Surname"
                                                value={formData.surname}
                                                onChange={handleChange}
                                                className={'pl-8'}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm">Gender</label>
                                        <div className='w-full bg-[#252A30] rounded-lg ring-1 ring-gray relative'>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className='border-transperent bg-transperent cursor-pointer focus:outline-none w-[97%] text-body-text rounded-md p-3 text-sm'
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm">Date of Birth</label>
                                        <div className='relative w-full'>
                                            <CalenderIcon className="absolute top-3 left-2" />
                                            <Input
                                                type={'text'}
                                                onFocus={(e) => e.target.type = 'date'}
                                                onBlur={(e) => e.target.type = 'text'}
                                                placeholder="Date Of Birthday"
                                                className={'pl-8 flex items-center pr-3'}
                                                InputClassName={'datepicker-input'}
                                                name="dob"
                                                onChange={handleChange}
                                            >
                                                <CalenderIcon />
                                            </Input>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className='space-y-2'>
                                        <label className="block text-sm">Email Address</label>
                                        <div className='relative w-full'>
                                            <EmailIcon className="absolute top-3 left-2" />
                                            <Input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Your Email Address"
                                                className={'pl-8'}
                                            />
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        <label className="block text-sm">Mobile Number</label>
                                        <div className='relative w-full'>
                                            <AddCircleIcon className="absolute top-3 left-2 fill-transperent stroke-white" />
                                            <Input
                                                type="tel"
                                                name="mobileNumber"
                                                value={formData.mobileNumber}
                                                onChange={handleChange}
                                                placeholder="Enter Your Number"
                                                className={'pl-8'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ticket Information */}
                            <div className="p-4 rounded-lg mb-4 shadow-md">
                                <h3 className="text-lg font-semibold mb-3">Ticket Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm">Ticket Type</label>
                                        <Input
                                            placeholder="Economy"
                                            readOnly
                                        />
                                        <Input
                                            placeholder="VIP"
                                            readOnly
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm">Number of Seats</label>
                                        <Input
                                            type="number"
                                            name="numberOfSeatsEconomy"
                                            value={formData.numberOfSeatsEconomy}
                                            onChange={handleChange}
                                            className="w-full"
                                        />
                                        <Input
                                            type="number"
                                            name="numberOfSeatsVIP"
                                            value={formData.numberOfSeatsVIP}
                                            onChange={handleChange}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    required
                                    className="w-4 h-4"
                                />
                                <label className="text-sm">
                                    I accept the <a href="#" className="text-blue-600">Terms of Service</a> and <a href="#" className="text-blue-600">Privacy Policy</a>.
                                </label>
                            </div>
                        </div>

                        <div className="col-span-1">
                            <div className="p-5 rounded-lg mb-4">
                                <div className='w-full h-60 rounded-md overflow-hidden'>
                                    <img src={event.photos[0].url} alt="event_img" className='w-full h-full' />
                                </div>
                                <div className="grid grid-cols-2 gap-5 p-5">
                                    <h2 className="text-xl font-bold col-span-2">{capitalize(event.title)}</h2>
                                    <div>
                                        <label className="block text-sm text-body-text mb-2">Ticket Type</label>
                                        <div className="flex gap-4 items-center">
                                            {formData.numberOfSeatsEconomy > 0 && <p>{`Economy - ${formData.numberOfSeatsEconomy}`}</p>}
                                            {formData.numberOfSeatsVIP > 0 && <p>{`VIP - ${formData.numberOfSeatsVIP}`}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-body-text mb-2">Event Organizer</label>
                                        {owner.orgName ? (
                                            <p>{owner.orgName}</p>
                                        ) : (
                                            <p>{`${capitalize(owner.name + " " + owner.surname)}`}</p>
                                        )}


                                    </div>
                                    <div>
                                        <label className="block text-sm text-body-text mb-2">Date</label>
                                        <p>{`${getFullDay(new Date(event.startDate).getDay())}, ${new Date(event.startDate).getDate()} ${getFullMonth(new Date(event.startDate).getMonth() + 1)} ${new Date(event.startDate).getFullYear()}`}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-body-text mb-2">Time</label>
                                        <p>{`${getFullTime(event.startTime, event.endTime)}`}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-body-text mb-2">Name</label>
                                        <p>{`${formData.name} ${formData.surname}`}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-body-text mb-2">Email Address</label>
                                        <p>{formData.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-body-text mb-2">Gender</label>
                                        <p>{formData.gender}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-body-text mb-2">Mobile Number</label>
                                        <p>{formData.mobileNumber}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-body-text mb-2">Location</label>
                                        <p>{`${capitalize(event.street + " " + event.city + " " + event.country)}`}</p>
                                    </div>
                                </div>
                                {/* <p className="text-sm">
                                    <p>{`Organizer: ${capitalize(owner.name + " " + owner.surname)}`}</p>
                                    <p>{`Date: ${getFullDay(new Date(event.startDate).getDay())}, ${new Date(event.startDate).getDate()} ${getFullMonth(new Date(event.startDate).getMonth() + 1)} ${new Date(event.startDate).getFullYear()}`}</p>
                                    <p>{`Time: ${getFullTime(event.startTime, event.endTime)}`}</p>
                                    <p>{`Location: ${capitalize(event.street + " " + event.city + ",  " + event.country)}`}</p>
                                </p> */}
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-4"
                                text={`Continue - $${event.economy_price * formData.numberOfSeatsEconomy + event.vip_price * formData.numberOfSeatsVIP}`}
                            />
                        </div>
                    </form>
                ) : (
                    // Success Message
                    <Modal open={orderPlaced}>
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-semibold mb-4">Success</h3>
                            <p className="font-extralight text-body-text">
                                You have successfully placed an order for the <span className="font-semibold text-white">{event.title}</span>. Enjoy the event!
                            </p>
                            <p className="mt-4 font-bold">John Doe</p>
                            <p className="text-sm">johndoe25@gmail.in</p>
                            <Button
                                className=""
                                onClick={() => { setOrderPlaced(false); window.location.reload() }}
                            >
                                View Ticket
                            </Button>
                        </div>
                    </Modal>
                )}
            </div>
            <div className="col-span-1">

            </div>
        </div>
    );
};

export default EventBooking;
