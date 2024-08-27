import React, { useEffect, useRef, useState } from 'react'
import Button from '../component/Button';
import { AddCircleIcon, CalenderIcon, CrossIcon, CurrectIcon, DownIcon, FileIcon, GalleryIcon, InviteIcon, LinkIcon, PdfIcon, SelectIcon, TimeIcon, VideoIcon } from '../assets/svg/Icon';
import '../index.css'
import Modal from '../component/Modal/Modal';
import Input from '../component/Input';
import { EventCategory, offers } from '../lib/consts';
import { img } from '../assets/assets';

function CreatePriEvent() {
    const [progress, setProgress] = useState(1);
    const [openSelect, setOpenSelect] = useState(false);
    const [openConsent, setOpenConsent] = useState(false);
    const [openCat, setOpenCat] = useState(false);
    const [acceptConcent, setAcceptConcent] = useState(false);
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const imgInputRef = useRef(null);
    const [event, setEvent] = useState({
        title: "",
        subtitle1: "",
        subtitle2: "",
        category: "Select private event category",
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
        description: "",
        videoFile: "",
        pdfFile: [],
        photos: [],
    });

    const [offersToSelect, setOfferToSelect] = useState(offers);

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        console.log(event)
    }, [event])

    const increaseProgress = () => {
        setProgress((prev) => Math.min(prev + 1, 4));
        if (progress === 4) {
            setOpenConsent(true);
        }
    };

    const decreaseProgress = () => {
        setProgress((prev) => Math.max(prev - 1, 1));
        if (acceptConcent) {
            setAcceptConcent(false)
        }
    };
    return (
        <div className='overflow-y-scroll overflow-x-hidden h-screen'>
            <div style={{ boxShadow: "0px 4px 4px 0px #00000040" }} className={`bg-black-light p-5 m-5 rounded-xl border-2 border-stroke relative text-white ${progress > 4 && "hidden"}`}>
                <ProgressBar progress={progress} />
                <div className="p-4 border-b-2 border-body-text">
                    <form className='flex justify-start'>
                        {progress === 1 &&
                            <div className='w-full space-y-5 '>
                                <div className='grid grid-cols-3 gap-5'>
                                    <div className='space-y-2 col-span-1'>
                                        <div className='bg-[#252A30] rounded-lg ring-1 ring-gray flex items-center'>
                                            <input
                                                type='text'
                                                placeholder={event.category}
                                                className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm datepicker-input'
                                                name='category'
                                                readOnly
                                                required
                                            />
                                            <div onClick={() => setOpenCat((prev) => !prev)}>
                                                <DownIcon className={`stroke-white fill-transperent size-5 mr-3 ${openCat ? "rotate-180" : "rotate-0"} transition-all cursor-pointer`} />
                                            </div>
                                        </div>
                                        <div className={`${openCat ? "visible block" : "hidden"} w-full bg-transperent focus:outline-none text-body-text rounded-lg overflow-hidden text-sm transition-all`}>

                                            {EventCategory && EventCategory.map((item, index) => (
                                                <div className='bg-[#252A30] flex items-center pr-3 w-full cursor-pointer transition-all delay-150'
                                                    key={index}
                                                    onClick={() => setEvent((prev) => ({ ...prev, category: item.text }))}>
                                                    <div className={`bg-transperent focus:outline-none w-full py-3 px-5 text-sm ${event.category === item.text ? "text-white" : "text-white/40"}`}>
                                                        <p>{item.text}</p>

                                                    </div>
                                                    <div className='cursor-pointer'>
                                                        {event.category === item.text ? <SelectIcon /> : (
                                                            <div className='w-4 h-4 rounded-full ring-1 ring-white' />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className=''>
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
                                </div> */}
                                <div className='grid grid-cols-3 text-body-text gap-5'>
                                    <Input
                                        type={'text'}
                                        placeholder={'Event Title'}
                                        name={'title'}
                                        onChange={handleChange}
                                        className={'col-span-1'}
                                    />
                                    <Input
                                        type={'text'}
                                        placeholder={'Event Subtitle 1'}
                                        name={'subtitle1'}
                                        onChange={handleChange}
                                        className={'col-span-1'}
                                    />
                                    <Input
                                        type={'text'}
                                        placeholder={'Event Subtitle 2'}
                                        name={'subtitle2'}
                                        onChange={handleChange}
                                        className={'col-span-1'}
                                    />

                                    <Input
                                        type={'text'}
                                        placeholder={'Invitation expires in'}
                                        name={'expiresIn'}
                                        onChange={handleChange}
                                        onFocus={(e) => e.target.type = 'time'}
                                        onBlur={(e) => e.target.type = 'text'}
                                        className={'col-span-1 flex items-center relative'}
                                        InputClassName={'datepicker-input'}
                                    >
                                        <TimeIcon className="mr-3" />
                                    </Input>
                                    <div className='col-span-1 flex gap-5'>
                                        <Input
                                            type={'text'}
                                            placeholder={'Start Date'}
                                            name={'startDate'}
                                            onChange={handleChange}
                                            onFocus={(e) => e.target.type = 'date'}
                                            onBlur={(e) => e.target.type = 'text'}
                                            className={'w-1/2 flex items-center relative'}
                                            InputClassName={'datepicker-input'}
                                        >
                                            <CalenderIcon className="mr-3" />
                                        </Input>
                                        <Input
                                            type={'text'}
                                            placeholder={'End Date'}
                                            name={'endDate'}
                                            onChange={handleChange}
                                            onFocus={(e) => e.target.type = 'date'}
                                            onBlur={(e) => e.target.type = 'text'}
                                            className={'w-1/2 flex items-center relative'}
                                            InputClassName={'datepicker-input'}
                                        >
                                            <CalenderIcon className="mr-3" />
                                        </Input>
                                    </div>
                                    <div className='col-span-1 flex gap-5'>
                                        <Input
                                            type={'text'}
                                            placeholder={'Start Time'}
                                            name={'startTime'}
                                            onChange={handleChange}
                                            onFocus={(e) => e.target.type = 'time'}
                                            onBlur={(e) => e.target.type = 'text'}
                                            className={'w-1/2 flex items-center relative'}
                                            InputClassName={'datepicker-input'}
                                        >
                                            <TimeIcon className="mr-3" />
                                        </Input>
                                        <Input
                                            type={'text'}
                                            placeholder={'End Time'}
                                            name={'endTime'}
                                            onChange={handleChange}
                                            onFocus={(e) => e.target.type = 'time'}
                                            onBlur={(e) => e.target.type = 'text'}
                                            className={'w-1/2 flex items-center relative'}
                                            InputClassName={'datepicker-input'}
                                        >
                                            <TimeIcon className="mr-3" />
                                        </Input>
                                    </div>
                                    <div className='space-y-2'>
                                        <p className='text-white'>Event Offer</p>
                                        <div className='bg-[#252A30] rounded-lg ring-1 col-span-1 ring-gray flex items-center'>

                                            <input
                                                type='text'
                                                placeholder={offersToSelect.filter((check) => check.checked !== true).length === 0 ? "Select Offers" : offersToSelect.filter((check) => check.checked !== true)[0].text}
                                                className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm datepicker-input'
                                                readOnly
                                            />
                                            <div onClick={() => setOpenSelect((prev) => !prev)}>
                                                <AddCircleIcon className={`stroke-white fill-transperent mr-3 ${openSelect ? "rotate-90" : "rotate-0"} transition-all cursor-pointer`} />
                                            </div>
                                        </div>
                                        <div className={`${openSelect ? "visible block" : "hidden"} w-full bg-transperent focus:outline-none text-body-text rounded-lg overflow-hidden text-sm transition-all`}>

                                            {offersToSelect && offersToSelect.map((item, index) => (
                                                <div className='bg-[#252A30] flex items-center pr-3 w-full cursor-pointer transition-all delay-150'
                                                    key={index}
                                                    onClick={() => {
                                                        setOfferToSelect((prev) => (prev.map((pItem, i) => i === index ? { ...pItem, checked: !pItem.checked } : pItem)))
                                                        if (item.checked) {
                                                            setEvent((prev) => ({ ...prev, offers: [...prev.offers].filter((text) => text !== item.text) }));
                                                        } else {
                                                            setEvent((prev) => ({ ...prev, offers: [...prev.offers, item.text] }));
                                                        }
                                                    }} >
                                                    <div className={`bg-transperent focus:outline-none w-full py-3 px-5 text-sm `}>
                                                        <p>{item.text}</p>
                                                    </div>
                                                    <div className='cursor-pointer'>
                                                        {item.checked ? <SelectIcon /> : (
                                                            <div className='size-3 bg-white mr-1' />
                                                        )}
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='col-span-2' />

                                </div>
                                <div className='flex gap-2 flex-wrap'>
                                    {event.offers.map((item, index) => (
                                        <label key={index} className='cursor-pointer relative inline-flex items-center' >
                                            <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center gap-2 items-center bg-dark px-3`}>
                                                <div>
                                                    {offersToSelect
                                                        .filter((offer) => offer.text === item)
                                                        .map((offer) => (
                                                            <div key={offer.text}>
                                                                {offer.icon}
                                                            </div>
                                                        ))}
                                                </div>
                                                <p>{item}</p>
                                                <div
                                                    onClick={() => {
                                                        setEvent((prev) => ({ ...prev, offers: [...prev.offers].filter((i) => i !== item) }))
                                                        setOfferToSelect((prev) => (prev.map((prevItem) => (prevItem.text === item ? { ...prevItem, checked: !prevItem.checked } : prevItem))))
                                                    }}>
                                                    <CrossIcon className="mr-3" />
                                                </div>
                                            </div>
                                        </label>
                                    ))}


                                </div>
                            </div>}
                        {progress === 2 &&
                            <div className='w-full grid grid-cols-6 text-white gap-5 py-5'>
                                <div className='col-span-3 space-y-5'>
                                    <p>Car Parking</p>
                                    <Input
                                        type={'text'}
                                        placeholder={'Parking spaces'}
                                        name={'street'}
                                        onChange={handleChange}
                                        className={'col-span-1'}
                                        readOnly
                                    />
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
                                <Input
                                    type={'text'}
                                    placeholder={'Street name'}
                                    name={'street'}
                                    onChange={handleChange}
                                    className={'col-span-2'}
                                />
                                <Input
                                    type={'text'}
                                    placeholder={'City name'}
                                    name={'city'}
                                    onChange={handleChange}
                                    className={'col-span-2'}
                                />
                                <Input
                                    type={'text'}
                                    placeholder={'Country name'}
                                    name={'country'}
                                    onChange={handleChange}
                                    className={'col-span-2'}
                                />
                            </div>}
                        {progress === 3 &&
                            <div className='w-full grid grid-cols-1 text-white gap-5 py-5'>
                                <div className='bg-[#252A30] flex flex-col items-center space-y-5 p-5 rounded-lg border-dashed border-2 border-primary'>
                                    <div onClick={() => videoInputRef.current.click()}>
                                        <VideoIcon />
                                    </div>
                                    <input
                                        type="file"
                                        name='videoFile'
                                        ref={videoInputRef}
                                        onChange={(e) => {
                                            setEvent({
                                                ...event,
                                                [e.target.name]: e.target.files[0]
                                            })

                                        }}
                                        accept='video/*'
                                        className='hidden'
                                    />
                                    <div className='text-center'>
                                        <p>Choose Video File</p>
                                        <p className='text-body-text'>Maximum video 30 sec video upload</p>
                                    </div>
                                </div>
                                <div className='bg-[#252A30] flex flex-col items-center space-y-5 p-5 rounded-lg border-dashed border-2 border-primary'>
                                    <div onClick={() => fileInputRef.current.click()}>
                                        <FileIcon />
                                    </div>
                                    <input
                                        type="file"
                                        name='pdfFile'
                                        ref={fileInputRef}
                                        onChange={(e) => {
                                            setEvent((prev) => (
                                                { ...prev, pdfFile: [...prev.pdfFile, ...e.target.files] }
                                            ))
                                        }}
                                        accept='application/pdf, application/msword'
                                        className='hidden'
                                        multiple
                                    />
                                    <div className='text-center'>
                                        <p>Choose File</p>
                                        <p className='text-body-text'>Select PDF file to  upload</p>
                                    </div>
                                </div>
                                {
                                    event.pdfFile.length > 0 && (
                                        <>
                                            <div className='grid grid-cols-2 gap-5'>
                                                {event.pdfFile.map((file, index) => (
                                                    <div className='relative flex items-center justify-start gap-5 bg-[#252A30] rounded-lg w-full py-3 px-5' key={index}>
                                                        <PdfIcon />
                                                        <div>
                                                            <p>{file.name}</p>
                                                            {Math.floor(file.size / 1000) > 1024 ? (<p className='text-sm'>{Math.floor(file.size / 1000000)}mb</p>) : <p className='text-sm'>{Math.floor(file.size / 1000)}kb</p>}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => setEvent((prev) => ({ ...prev, pdfFile: prev.pdfFile.filter((_, i) => i !== index) }))}
                                                            className="absolute top-4 right-2 rounded-full bg-stroke/50 size-10 flex items-center justify-center"
                                                        >
                                                            <CrossIcon className="size-5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )
                                }
                                <div className='bg-[#252A30] rounded-lg ring-1 ring-gray'>
                                    <textarea
                                        type="text"
                                        placeholder='Please describe your event in more detail so that you arouse curiosity and your visitors know what to expect at yours. Upload an agenda if you have one. Think of the images you can use too. Maybe also pictures of the location or what you think what could be interesting'
                                        name='description'
                                        onChange={handleChange}
                                        maxLength={200}
                                        style={{ resize: "none" }}
                                        className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                                    />
                                    <div className='float-right text-body-text pr-3'>
                                        <span >{event.description.length}</span>
                                        <span >/ 200</span>
                                    </div>
                                </div>
                                <div className={`bg-[#252A30] flex flex-col items-center space-y-5 p-5 rounded-lg border-dashed border-2 border-primary`}>
                                    <div onClick={() => imgInputRef.current.click()}>
                                        <GalleryIcon />
                                    </div>
                                    <input
                                        type="file"
                                        name='photos'
                                        ref={imgInputRef}
                                        onChange={(e) => {
                                            setEvent((prev) => ({ ...prev, photos: [...e.target.files, ...prev.photos].slice(0, 6) }))

                                        }}
                                        accept='image/*'
                                        className='hidden'
                                        multiple
                                    />
                                    <div className='text-center'>
                                        <p>Upload Photos</p>
                                        <p className='text-body-text'>Maximum 6 photos upload</p>
                                    </div>
                                </div>
                                {event.photos.length > 0 && (
                                    <div className={`bg-[#252A30] flex flex-col items-center space-y-5 p-5 rounded-lg border-dashed border-2 border-primary`}>
                                        <div className='grid grid-cols-3 grid-rows-2 gap-5 transition-all'>
                                            {event.photos.map((img, index) => (
                                                <div className='relative' key={index}>
                                                    <img
                                                        src={URL.createObjectURL(img)}
                                                        alt={`Selected ${index}`}
                                                        className='h-48 w-full object-cover rounded'
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setEvent((prev) => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }))}
                                                        className="absolute top-0 right-1 rounded-full bg-stroke/50 size-10 flex items-center justify-center"
                                                    >
                                                        <CrossIcon className="size-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        }
                        {progress === 4 &&
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
                                    <p className='text-xl'>0.99$</p>
                                    <hr />
                                    <div>
                                        <li>Create a private event to invite  your contacts</li>
                                        <li>Possible with this package</li>
                                        <li>These are events where no promotion or sponsors are needed. Just to send invitations.</li>
                                        <li>In order to create a private event, you must select “Private event - Without promotion”.</li>
                                    </div>
                                </div>
                                {/* <div className='space-y-2'>
                                    <p>Are you looking for sponsors?</p>
                                    <div className='flex items-center gap-3'>
                                        <label htmlFor="confirm1" className='flex gap-2 cursor-pointer'>
                                            <input type="radio" name="confirm" id="confirm1"
                                                className='appearance-none peer' />
                                            <div className='size-4 rounded-full border-2 border-white 
                                            peer-checked:ring-2  peer-checked:ring-primary peer-checked:bg-primary peer-checked:border-dark'/>
                                            Yes
                                        </label>
                                        <label htmlFor="confirm2" className='flex gap-2 cursor-pointer'>
                                            <input type="radio" name="confirm" id="confirm2" className='appearance-none peer' />
                                            <div className='size-4 rounded-full border-2 border-white 
                                            peer-checked:ring-2  peer-checked:ring-primary peer-checked:bg-primary peer-checked:border-dark'/>
                                            No
                                        </label>
                                    </div>
                                </div> */}
                                {/* <div className='grid grid-cols-3 gap-5'>
                                    <div className='col-span-1 space-y-2'>
                                        <p>Time for sponsorship</p>
                                        <Input
                                            type={'text'}
                                            placeholder={'24hr'}
                                            name={'time'}
                                            onChange={handleChange}
                                            className={'flex items-center pr-4'}
                                        >
                                            <DownIcon />
                                        </Input>
                                    </div>
                                    <div className='col-span-1 space-y-2'>
                                        <p>Maximum sponsors</p>
                                        <Input
                                            type={'text'}
                                            placeholder={'No limit'}
                                            name={'sponsors'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='col-span-1 space-y-2'>
                                        <p>Maximum Offer</p>
                                        <Input
                                            type={'text'}
                                            placeholder={'20$'}
                                            name={'sponsors'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div> */}
                            </div>
                        }
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
            <Modal open={openConsent} ModalClassName={'w-1/3'} className={'overflow-y-scroll'}>
                <div className='w-full h-full flex items-center flex-col space-y-2 text-white'>
                    <p>Declaration of consent</p>
                    <div className='h-1 border-b border-body-text w-full' />
                    <div className={`w-full space-y-4 p-2 text-body-text `}>
                        <p>In order for your event to be displayed throughout the eventCrafter for sponsorship purposes, please give us your permission. Only software belonging to eventCrafter. include your event, only with the sole purpose of advertising your event and finding sponsors for your event! You grant us this permission for all countries where eventCrafter. products are used.</p>
                        <p>Images, texts, descriptions can be used by eventCrafter. products without restriction, in the context of the event publication. The creator of the event is solely responsible for the uploaded images, texts and descriptions. Copyrights on images, texts and descriptions may not be violated and the organizer of the event is solely responsible for compliance. In the world of eventCrafter we would like to point out that no images may be copied, used or distributed.</p>

                        <div>
                            <li className='text-white'>Sponsorship fees</li>
                            <p className='pl-5'>12% of the sponsorship amounts will be deducted before being transferred to the organizer</p>
                        </div>
                        <div>
                            <li className='text-white'>VIP Ticket fees</li>
                            <p className='pl-5'>15% of the total amount of VIP tickets sold will be deducted.</p>
                        </div>
                    </div>
                    <div className='w-full space-y-3'>
                        <p className='text-body-text'>You accept this declaration of consent?</p>
                        <Button text={'I Accept'} onEvent={() => { setOpenConsent(false); setAcceptConcent(true); setProgress(5) }} />
                        <Button text={'I Do not accept'} className='bg-dark' onEvent={() => { setOpenConsent(false); setAcceptConcent(false) }} />
                    </div>
                </div>
            </Modal>
            {acceptConcent && (
                <div className='w-full text-white p-5 space-y-5'>
                    <div className='flex gap-5'>
                        <Input
                            placeholder="Invite to event via link"
                            className="col-span-1 w-full flex items-center pr-5"
                        >
                            <LinkIcon />
                        </Input>
                        <Input
                            placeholder="Add Participants"
                            className="col-span-1 w-full flex items-center pr-5"
                        >
                            <InviteIcon />
                        </Input>
                    </div>
                    <div className='flex flex-col gap-5 w-full rounded-lg bg-black-light p-5' >
                        <h1>Participate Members</h1>
                        <div className='flex gap-5 items-center'>
                            <div className='bg-public rounded-md flex items-center gap-2 p-2'>
                                <SelectIcon />
                                <p>{`Accepted(14)`}</p>
                            </div>
                            <div className='bg-red rounded-md flex items-center gap-2 p-2'>
                                <AddCircleIcon className="rotate-45 fill-white stroke-red" />
                                <p>{`Rejected(14)`}</p>
                            </div>
                            <div className='bg-yellow rounded-md flex items-center gap-2 p-2'>
                                <TimeIcon />
                                <p>{`Pending(14)`}</p>
                            </div>
                        </div>
                        <div className='flex flex-col justify-start space-y-5'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-5 w-[70%]'>
                                    <div className='rounded-full size-16 overflow-hidden'>
                                        <img src={img.p3} alt="profile_img" className='h-16 w-24' />
                                    </div>
                                    <div className='flex flex-col w-[80%]'>
                                        <p className='text-white font-medium'>Clara Tolson </p>
                                    </div>
                                </div>
                                <div className='bg-public/10 rounded-md flex items-center gap-2 py-2 px-4 text-public'>
                                    <SelectIcon fill="#25d695" />
                                    <p>{`Accepted`}</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-5 w-[70%]'>
                                    <div className='rounded-full size-16 overflow-hidden'>
                                        <img src={img.p2} alt="profile_img" className='h-16 w-24' />
                                    </div>
                                    <div className='flex flex-col w-[80%]'>
                                        <p className='text-white font-medium'>Clara Tolson </p>
                                    </div>
                                </div>
                                <div className='bg-yellow/10 rounded-md flex items-center gap-2 py-2 px-5 text-yellow'>
                                    <TimeIcon className="stroke-yellow" />
                                    <p>{`Pending`}</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-5 w-[70%]'>
                                    <div className='rounded-full size-16 overflow-hidden'>
                                        <img src={img.p4} alt="profile_img" className='h-16 w-24' />
                                    </div>
                                    <div className='flex flex-col w-[80%]'>
                                        <p className='text-white font-medium'>Clara Tolson </p>
                                    </div>
                                </div>
                                <div className='bg-red/10 rounded-md flex items-center gap-2 py-2 px-5 text-red'>
                                    <AddCircleIcon className="rotate-45 fill-red stroke-black-light" />
                                    <p>{`Rejected`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 ml-auto w-1/5 gap-2 flex">
                        <Button
                            onEvent={decreaseProgress}
                            className="bg-dark"
                        >
                            Cancel
                        </Button>
                        <Button

                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
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
