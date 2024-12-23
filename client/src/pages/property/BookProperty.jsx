import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AddCircleIcon, CalenderIcon, EmailIcon, UserIcon } from '../../assets/svg/Icon';
import Input from '../../component/Input';
import Spinner from '../../component/Spinner';
import Modal from '../../component/Modal/Modal';
import Button from '../../component/Button';
import CheckboxGroup from '../../component/Checkbox/CheckboxGroup';
import { img } from '../../assets/assets';
import SingleProperty from '../../component/property/SingleProperty';

function BookProperty() {
    const { propertyId } = useParams();
    // const { eventId } = useParams();
    const [property, setProperty] = useState();
    const [eventPurpose, setEventPurpose] = useState({});
    // const [owner, setOwner] = useState();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        mobileNumber: "",
        purpose: "",
        checkin: "",
        checkout: "",
        participants: "",
    });
    const purposeCheckboxes = [
        { key: 'business', label: 'Business' },
        { key: 'conference', label: 'Conference' },
        { key: 'parties ', label: 'Parties ' },
        { key: 'exhibition', label: 'Exhibition' },
        { key: 'coaching', label: 'Coaching' },
        { key: 'lectures ', label: 'Lectures ' },
    ];

    const [orderPlaced, setOrderPlaced] = useState(false);


    // const { data, isSuccess } = useGetFullEventQuery(eventId, { skip: !eventId })
    // const { data: userData, isSuccess: isUserDataSuccess } = useGetUserByIdQuery(event?.owner, { skip: !event?.owner })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            purpose: Object.keys(eventPurpose)[0]
        }))
    }, [eventPurpose])

    const handleSubmit = (e) => {
        e.preventDefault();
        setOrderPlaced(true);
    };

    // useEffect(() => {
    //     if (isSuccess) {
    //         setEvent(data.data[0]);
    //     }
    // }, [data])

    // useEffect(() => {
    //     if (isUserDataSuccess) {
    //         setOwner(userData.data)
    //     }
    // }, [userData])
    // if (!property) {
    //     return <div className='h-screen w-screen grid place-items-center'>
    //         <Spinner />
    //     </div>
    // }
    return (
        <div className='overflow-y-scroll overflow-x-hidden h-screen w-full p-5 text-white'>
            <div className={`container-style p-5 border-2 border-[#2B3242] relative text-white`}>
                {!orderPlaced ? (
                    <form onSubmit={handleSubmit} className="space-y-7">

                        <h3 className="text-lg font-semibold mb-3">Enter Your Details</h3>
                        <div className="grid grid-cols-3 gap-4">
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
                            <Input
                                type={'text'}
                                onFocus={(e) => e.target.type = 'date'}
                                onBlur={(e) => e.target.type = 'text'}
                                placeholder="Check In"
                                className={'flex items-center pr-3'}
                                InputClassName={'datepicker-input'}
                                name="checkin"
                                onChange={handleChange}
                            >
                                <CalenderIcon />
                            </Input>
                            <Input
                                type={'text'}
                                onFocus={(e) => e.target.type = 'date'}
                                onBlur={(e) => e.target.type = 'text'}
                                placeholder="Check Out"
                                className={'flex items-center pr-3'}
                                InputClassName={'datepicker-input'}
                                name="checkout"
                                onChange={handleChange}
                            >
                                <CalenderIcon />
                            </Input>
                            <Input
                                type="number"
                                name="participants"
                                placeholder="Number of participant"
                                className="w-full"
                                onChange={handleChange}
                                value={formData.participants}
                            />
                            <div className='space-y-2 col-span-3'>
                                <p>Event Purpose</p>
                                <CheckboxGroup checkboxes={purposeCheckboxes} checkedItems={eventPurpose} setCheckedItems={setEventPurpose} checkBox={false} />
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
                        <div className='border-b border-body-text'></div>
                        <div className='ml-auto w-1/5 gap-2 flex'>

                            <Button
                                type="submit"
                                className="w-1/3 ml-auto py-3"
                                text={"Book"}
                            />
                        </div>
                    </form>
                ) : (
                    <div className="p-5 rounded-lg space-y-5">
                        <SingleProperty
                            // property="Artisan doing woodcutting.."
                            // rating="4.5"
                            // street="41901 Thornridge Cir. Shiloh"
                            // city="Hawaii"
                            // country="Singapor"
                            amenities={["Car parking available", "Swimming Pool", "Free WiFi", "Food available on spot"]}
                            purpose="Parties"
                            // description
                            // amount
                            photo={img.img1}
                            own={false}
                        />
                        <div className={`shadow-custom-black bg-white/[3%] rounded-lg overflow-hidden p-5`}>
                            <h3 className="text-lg font-semibold mb-3">Booking Details</h3>
                            <div className="grid grid-cols-4 gap-5 p-5">
                                <div>
                                    <label className="block text-sm text-body-text mb-2">Check-in</label>
                                    {/* <p>{`${getFullDay(new Date(event.startDate).getDay())}, ${new Date(event.startDate).getDate()} ${getFullMonth(new Date(event.startDate).getMonth() + 1)} ${new Date(event.startDate).getFullYear()}`}</p> */}
                                    <p>15 Nov</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-body-text mb-2">Check-out</label>
                                    {/* <p>{`${getFullDay(new Date(event.startDate).getDay())}, ${new Date(event.startDate).getDate()} ${getFullMonth(new Date(event.startDate).getMonth() + 1)} ${new Date(event.startDate).getFullYear()}`}</p> */}
                                    <p>17 Nov</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-body-text mb-2">Event Purpose</label>
                                    <p>{formData.purpose}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-body-text mb-2">Number of participants</label>
                                    <p>{formData.participants}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-body-text mb-2">Name</label>
                                    <p>{`${formData.name} ${formData.surname}`}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-body-text mb-2">Contact</label>
                                    <p>{formData.mobileNumber}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-body-text mb-2">Email Address</label>
                                    <p>{formData.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`shadow-custom-black bg-white/[3%] rounded-lg overflow-hidden p-5`}>
                            <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
                            <div className="p-5 space-y-5">
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm text-body-text mb-2">$250-5 Days</label>
                                    {/* <p>{`${getFullDay(new Date(event.startDate).getDay())}, ${new Date(event.startDate).getDate()} ${getFullMonth(new Date(event.startDate).getMonth() + 1)} ${new Date(event.startDate).getFullYear()}`}</p> */}
                                    <p>$2500</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm text-body-text mb-2">Cleaning Fees</label>
                                    {/* <p>{`${getFullDay(new Date(event.startDate).getDay())}, ${new Date(event.startDate).getDate()} ${getFullMonth(new Date(event.startDate).getMonth() + 1)} ${new Date(event.startDate).getFullYear()}`}</p> */}
                                    <p>$30</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm text-body-text mb-2">Service Fees</label>
                                    <p>$100</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm text-body-text mb-2">Taxes</label>
                                    <p>$20</p>
                                </div>
                                <div className='border-b border-body-text'></div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm text-body-text mb-2">Total Out Standing</label>
                                    <p>$2650</p>
                                </div>
                            </div>
                        </div>
                        {/* <p className="text-sm">
                            <p>{`Organizer: ${capitalize(owner.name + " " + owner.surname)}`}</p>
                            <p>{`Date: ${getFullDay(new Date(event.startDate).getDay())}, ${new Date(event.startDate).getDate()} ${getFullMonth(new Date(event.startDate).getMonth() + 1)} ${new Date(event.startDate).getFullYear()}`}</p>
                            <p>{`Time: ${getFullTime(event.startTime, event.endTime)}`}</p>
                            <p>{`Location: ${capitalize(event.street + " " + event.city + ",  " + event.country)}`}</p>
                        </p> */}
                        <div className='border-b border-body-text'></div>
                        <div className='ml-auto w-1/5 gap-2 flex'>

                            <Button
                                type="submit"
                                className="w-1/3 ml-auto py-3"
                                // text={`Continue - $${event.economy_price * formData.numberOfSeatsEconomy + event.vip_price * formData.numberOfSeatsVIP}`}
                                text={"Book"}
                            />
                        </div>
                    </div>
                )}
            </div>
            {/* <Modal open={orderPlaced}>
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
            </Modal> */}
            <div className="col-span-1">

            </div>
        </div>
    );
}

export default BookProperty