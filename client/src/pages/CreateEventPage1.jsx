import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { EventCategory, offers } from '../lib/consts';
import { AddCircleIcon, CalenderIcon, CrossIcon, DownIcon, SelectIcon, TimeIcon } from '../assets/svg/Icon';
import { setEvent } from '../store/EventSlice';
import Input from '../component/Input';
import { capitalize } from '../utils/customUtility';

function CreateEventPage1() {
    const [openCat, setOpenCat] = useState(false);
    const [offersToSelect, setOfferToSelect] = useState(offers);
    const [openSelect, setOpenSelect] = useState(false);

    const event = useSelector((state) => state.event.event);
    const dispatch = useDispatch();

    useEffect(() => {
        event.offers.map((offer) => (
            setOfferToSelect((prev) => (prev.map((p) => capitalize(p.text) === capitalize(offer) ? { ...p, checked: true } : p)))
        ))
    }, [])
    const handleChange = (e) => {
        dispatch(setEvent({
            ...event,
            [e.target.name]: e.target.value,
        }))
    }
    return (
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
                                onClick={() => dispatch(setEvent({ category: item.text }))}>
                                <div className={`bg-transperent focus:outline-none w-full py-3 px-5 text-sm ${event.category === item.text ? "text-white" : "text-white/40"}`}>
                                    <p>{item.text}</p>

                                </div>
                                <div className='cursor-pointer'>
                                    {capitalize(event.category) === capitalize(item.text) ? <SelectIcon /> : (
                                        <div className='w-4 h-4 rounded-full ring-1 ring-white' />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 text-body-text gap-5'>
                <Input
                    type={'text'}
                    placeholder={'Event Title'}
                    name={'title'}
                    onChange={handleChange}
                    className={'col-span-1'}
                    value={event.title}
                />
                <Input
                    type={'text'}
                    placeholder={'Event Subtitle 1'}
                    name={'subtitle1'}
                    onChange={handleChange}
                    className={'col-span-1'}
                    value={event.subtitle1}
                />
                <Input
                    type={'text'}
                    placeholder={'Event Subtitle 2'}
                    name={'subtitle2'}
                    onChange={handleChange}
                    className={'col-span-1'}
                    value={event.subtitle2}
                />
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
                        value={`${new Date(event.startDate).getFullYear()}-${new Date(event.startDate).getMonth() + 1}-${new Date(event.startDate).getDate()}`}
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
                        value={`${new Date(event.endDate).getFullYear()}-${new Date(event.endDate).getMonth() + 1}-${new Date(event.endDate).getDate()}`}
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
                        value={event.startTime}
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
                        value={event.endTime}
                    >
                        <TimeIcon className="mr-3" />
                    </Input>
                </div>
                {event.type !== "private" && (
                    <>
                        <div className='col-span-1' />
                        <div className='space-y-5 col-span-1 mt-2'>
                            <p className='text-white'>Ticket / invitation quantity</p>
                            <Input
                                type={'text'}
                                placeholder={'VIP Ticket'}
                                name={'vip'}
                                onChange={handleChange}
                                className={'col-span-1'}
                                value={event.vip}
                            />
                            <Input
                                type={'text'}
                                placeholder={'Economy Ticket'}
                                name={'economy'}
                                onChange={handleChange}
                                className={'col-span-1'}
                                value={event.economy}
                            />
                        </div>
                        <div className='space-y-5 col-span-1 mt-2'>
                            <p className='text-white'>Ticket Price</p>
                            <Input
                                type={'text'}
                                placeholder={'VIP Ticket Price'}
                                name={'vip_price'}
                                onChange={handleChange}
                                className={'col-span-1'}
                                value={event.vip_price}
                            />
                            <Input
                                type={'text'}
                                placeholder={'Economy Ticket Price'}
                                name={'economy_price'}
                                onChange={handleChange}
                                className={'col-span-1'}
                                value={event.economy_price}
                            />
                        </div>
                    </>
                )}
                <div className='col-span-1' />
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
                                        dispatch(setEvent({
                                            offers: event.offers.filter((text) => text !== item.text)
                                        }));
                                    } else {
                                        dispatch(setEvent({
                                            offers: [...event.offers, item.text]
                                        }));
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
                        <div className={`py-2 rounded-full cursor-pointer mt-2 w-full row-center gap-2 bg-dark px-3`}>
                            <div>
                                {offersToSelect
                                    .filter((offer) => offer.text === capitalize(item))
                                    .map((offer) => (
                                        <div key={offer.text}>
                                            {offer.icon}
                                        </div>
                                    ))}
                            </div>
                            <p>{capitalize(item)}</p>
                            <div
                                onClick={() => {
                                    dispatch(setEvent({ offers: event.offers.filter((i) => i !== item) }))
                                    setOfferToSelect((prev) => (prev.map((prevItem) => (prevItem.text === item ? { ...prevItem, checked: !prevItem.checked } : prevItem))))
                                }}>
                                <CrossIcon className="mr-3" />
                            </div>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default CreateEventPage1