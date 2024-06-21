import React, { useEffect, useState } from 'react'
import Button from '../component/Button';
import { AddCircleIcon, CalenderIcon, CrossIcon, CurrectIcon, FoodIcon, TimeIcon } from '../assets/svg/Icon';
import '../index.css'

function CreatePriEvent() {
    const [progress, setProgress] = useState(1);
    const [offer, setOffer] = useState([]);
    const [event, setEvent] = useState({
        title: "",
        subtitle1: "",
        subtitle2: "",
        category: "Adventure",
        createDate: "",
        expiresIn: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        offers: [],
        carCapacity: "10",
        street: "",
        city: "",
        country: "",
    });

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value,
        })

    }

    useEffect(() => {
        // handleChange()
        console.log(event)
    }, [event])

    const increaseProgress = () => {
        setProgress((prev) => Math.min(prev + 1, 4));
    };

    const decreaseProgress = () => {
        setProgress((prev) => Math.max(prev - 1, 1));
    };
    // return (
    //     <div className="p-4 max-w-3xl mx-auto ">
    //         <div className="mb-4">
    //             <div className="flex justify-between bg-gradient-to-r from-green">
    //                 {steps.map((step, index) => (
    //                     <div key={index} className={`flex-1 w-full ${index <= currentStep ? "":""}`}>
    //                         <div className={`p-2 rounded ${index <= currentStep ? ' text-white ' : 'bg-gray-300 text-gray-600'}`}>
    //                             {step}
    //                         </div>
    //                         {index < steps.length - 1 && <div className={`h-1 ${index < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}></div>}
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>

    //         <div className="mt-4 flex justify-between">
    //             <button
    //                 onClick={handlePrevious}
    //                 className="bg-gray-300 text-gray-700 p-2 rounded"
    //                 disabled={currentStep === 0}
    //             >
    //                 Previous
    //             </button>
    //             <button
    //                 onClick={handleNext}
    //                 className="bg-blue-500 text-white p-2 rounded"
    //                 disabled={currentStep === steps.length - 1}
    //             >
    //                 Next
    //             </button>
    //         </div>
    //     </div>
    // )
    return (
        <div style={{ boxShadow: "0px 4px 4px 0px #00000040" }} className="bg-black-light p-5 m-5 rounded-xl border-2 border-stroke relative text-white">
            <ProgressBar progress={progress} />
            <div className="p-4 border-b-2 border-body-text">
                <form className='flex justify-start'>
                    {progress === 1 &&
                        <div className='w-full space-y-5'>
                            <div className=''>
                                <p>Event Category</p>
                                <div className='flex justify-start items-center gap-3'>
                                    <label htmlFor="eventCat1" className='cursor-pointer relative inline-flex items-center' >
                                        <input type="radio" name="category" id="eventCat1" value='Adventure' onChange={handleChange} className='sr-only peer h-full w-full' checked={event.category === 'Adventure'} />
                                        <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                            <p>Adventure</p>
                                        </div>
                                    </label>
                                    <label htmlFor="eventCat2" className='cursor-pointer relative inline-flex items-center' >
                                        <input type="radio" name="category" id="eventCat2" value='Webinar' onChange={handleChange} className='sr-only peer h-full w-full' />
                                        <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                            <p>Webinar</p>
                                        </div>
                                    </label>
                                    <label htmlFor="eventCat3" className='cursor-pointer relative inline-flex items-center' >
                                        <input type="radio" name="category" id="eventCat3" value='Festival' onChange={handleChange} className='sr-only peer h-full w-full' />
                                        <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                            <p>Festival</p>
                                        </div>
                                    </label>
                                    <label htmlFor="eventCat4" className='cursor-pointer relative inline-flex items-center' >
                                        <input type="radio" name="category" id="eventCat4" value='Music' onChange={handleChange} className='sr-only peer h-full w-full' />
                                        <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                            <p>Music</p>
                                        </div>
                                    </label>
                                    <label htmlFor="eventCat5" className='cursor-pointer relative inline-flex items-center' >
                                        <input type="radio" name="category" id="eventCat5" value='Movie' onChange={handleChange} className='sr-only peer h-full w-full' />
                                        <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                            <p>Movie</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className='grid grid-cols-3 text-body-text gap-5'>
                                <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-1'>
                                    <input
                                        type="text"
                                        placeholder='Event Title'
                                        name='title'
                                        onChange={handleChange}
                                        className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                                    />
                                </div>
                                <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-1'>
                                    <input
                                        type="text"
                                        placeholder='Event Subtitle 1'
                                        name='subtitle1'
                                        onChange={handleChange}
                                        className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                                    />
                                </div>
                                <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-1'>
                                    <input
                                        type="text"
                                        placeholder='Event Subtitle 2'
                                        name='subtitle2'
                                        onChange={handleChange}
                                        className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                                    />
                                </div>
                                <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-1 flex items-center relative'>
                                    <input
                                        type='text'
                                        placeholder='Event Create Date'
                                        name='createDate'
                                        onChange={handleChange}
                                        onFocus={(e) => e.target.type = 'date'}
                                        onBlur={(e) => e.target.type = 'text'}

                                        className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm datepicker-input'

                                    />
                                    <CalenderIcon className="mr-3" />
                                </div>
                                <div className='col-span-2' />
                                <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-1 flex items-center relative'>
                                    <input
                                        type='text'
                                        placeholder='Invitation expires in'
                                        name='expiresIn'
                                        onChange={handleChange}
                                        onFocus={(e) => e.target.type = 'time'}
                                        onBlur={(e) => e.target.type = 'text'}

                                        className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm datepicker-input'
                                    />
                                    <TimeIcon className="mr-3" />
                                </div>
                                <div className='col-span-1 flex gap-5'>
                                    <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-1 flex items-center relative'>
                                        <input
                                            type='text'
                                            placeholder='Start Date'
                                            name='startDate'
                                            onChange={handleChange}
                                            onFocus={(e) => e.target.type = 'date'}
                                            onBlur={(e) => e.target.type = 'text'}

                                            className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm datepicker-input'

                                        />
                                        <CalenderIcon className="mr-3" />
                                    </div>
                                    <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-1 flex items-center relative'>
                                        <input
                                            type='text'
                                            placeholder='End Date'
                                            name='endDate'
                                            onChange={handleChange}
                                            onFocus={(e) => e.target.type = 'date'}
                                            onBlur={(e) => e.target.type = 'text'}

                                            className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm datepicker-input'

                                        />
                                        <CalenderIcon className="mr-3" />
                                    </div>
                                </div>
                                <div className='col-span-1 flex gap-5'>
                                    <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-1 flex items-center relative'>
                                        <input
                                            type='text'
                                            placeholder='Start Time'
                                            name='startTime'
                                            onChange={handleChange}
                                            onFocus={(e) => e.target.type = 'time'}
                                            onBlur={(e) => e.target.type = 'text'}

                                            className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm datepicker-input'
                                        />
                                        <TimeIcon className="mr-3" />
                                    </div>
                                    <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-1 flex items-center relative'>
                                        <input
                                            type='text'
                                            placeholder='End Time'
                                            name='endTime'
                                            onChange={handleChange}
                                            onFocus={(e) => e.target.type = 'time'}
                                            onBlur={(e) => e.target.type = 'text'}

                                            className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm datepicker-input'
                                        />
                                        <TimeIcon className="mr-3" />
                                    </div>

                                </div>
                                <div className='space-y-2'>
                                    <p className='text-white'>Event Offer</p>
                                    <div className='bg-[#252A30] rounded-lg ring-1 col-span-1 ring-gray flex items-center'>
                                        <input
                                            type='text'
                                            name={offer}
                                            onChange={(e) => setOffer(e.target.value)}
                                            placeholder='Paramedic'
                                            className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                                        />
                                        <div
                                            onClick={() => {
                                                setEvent((prev) => ({ ...prev, offers: [...prev.offers, offer] }))
                                            }}>
                                            <AddCircleIcon className="mr-3 stroke-white fill-none" />
                                        </div>

                                    </div>
                                </div>
                                <div className='col-span-2' />

                            </div>
                            <div className='flex gap-2'>
                                {event.offers.map((item, index) => (
                                    <label key={index} className='cursor-pointer relative inline-flex items-center' >
                                        <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center gap-2 items-center bg-dark px-3`}>
                                            <FoodIcon />
                                            <p>{item}</p>
                                            <div
                                                onClick={() => {
                                                    setEvent((prev) => ({ ...prev, offers: [...prev.offers].filter((prevOffer) => prevOffer !== item) }))
                                                }}>
                                                <CrossIcon className="mr-3" />
                                            </div>
                                        </div>
                                    </label>
                                ))}


                            </div>
                        </div>}
                    {progress === 2 &&
                        <div className='w-full grid grid-cols-6 text-white gap-5 '>
                            <div className='col-span-3 space-y-5'>
                                <p>Car Parking</p>
                                <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-1'>
                                    <input
                                        type="text"
                                        placeholder='Parking spaces'
                                        className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                                        readOnly
                                    />
                                </div>
                                <div className='flex justify-start items-center gap-3'>
                                    <label htmlFor="capacity1" className='cursor-pointer relative inline-flex items-center' >
                                        <input type="radio" name="carCapacity" id="capacity1" value='10' onChange={handleChange} className='sr-only peer h-full w-full' checked={event.carCapacity === '10'} />
                                        <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                            <p>10 Cars</p>
                                        </div>
                                    </label>
                                    <label htmlFor="capacity2" className='cursor-pointer relative inline-flex items-center' >
                                        <input type="radio" name="carCapacity" id="capacity2" value='20' onChange={handleChange} className='sr-only peer h-full w-full' />
                                        <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                            <p>20 Cars</p>
                                        </div>
                                    </label>
                                    <label htmlFor="capacity3" className='cursor-pointer relative inline-flex items-center' >
                                        <input type="radio" name="carCapacity" id="capacity3" value='30' onChange={handleChange} className='sr-only peer h-full w-full' />
                                        <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                            <p>30 Cars</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className='col-span-3' />
                            <p className='col-span-6 mt-5'>Location Details</p>
                            <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-2'>
                                <input
                                    type="text"
                                    placeholder='Street name'
                                    name='street'
                                    onChange={handleChange}
                                    className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                                />
                            </div>
                            <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-2'>
                                <input
                                    type="text"
                                    placeholder='City name'
                                    name='city'
                                    onChange={handleChange}
                                    className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                                />
                            </div>
                            <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-2'>
                                <input
                                    type="text"
                                    placeholder='Country name'
                                    name='country'
                                    onChange={handleChange}
                                    className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                                />
                            </div>

                            <div className='bg-[#252A30] rounded-lg ring-1 ring-gray col-span-2'>
                                <input
                                    type="text"
                                    placeholder='City name'
                                    name='city'
                                    onChange={handleChange}
                                    className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                                />
                            </div>

                        </div>}
                    {progress === 3 && <div>Step 3: Sponsors</div>}
                    {progress === 4 && <div>Step 4: Review</div>}
                </form>

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
                >
                    Next
                </Button>
            </div>
        </div>
    );
}


export default CreatePriEvent

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
