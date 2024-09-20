import React from 'react'
import Input from '../component/Input'
import { useDispatch, useSelector } from 'react-redux';
import { setEvent } from '../store/EventSlice';

function CreateEventPage2() {

    const event = useSelector((state) => state.event.event);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setEvent({
            ...event,
            [e.target.name]: e.target.value,
        }))
    }
    return (
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
        </div>
    )
}

export default CreateEventPage2