import React, { useEffect, useState } from 'react'
import Input from '../../component/Input';
import CheckboxGroup from '../../component/Checkbox/CheckboxGroup'
import { CrossIcon, GalleryIcon, VideoIcon } from '../../assets/svg/Icon';
import Button from '../../component/Button';
import { deleteImg } from '../../Firebase/delete';
import { img } from '../../assets/assets';
import Modal from '../../component/Modal/Modal';

function ListProperty() {
    const [amenities, setAmenities] = useState({});
    const [eventPurpose, setEventPurpose] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [formData, setFormData] = useState({
        property: "",
        street: "",
        city: "",
        country: "",
        amenities: [],
        purpose: [],
        description: "",
        amount: 250,
        videoFile: "",
        photos: "",
    });
    const checkboxes = [
        { key: 'wifi', label: 'Free WiFi' },
        { key: 'parking', label: 'Car parking available' },
        { key: 'pool', label: 'Swimming Pool' },
        { key: 'gym', label: 'Gym Access' },
        { key: 'dining', label: 'Dining services' },
        { key: 'evparking', label: 'EV vehicle parking' },
    ];
    const purposeCheckboxes = [
        { key: 'business', label: 'Business' },
        { key: 'conference', label: 'Conference' },
        { key: 'parties ', label: 'Parties ' },
        { key: 'exhibition', label: 'Exhibition' },
        { key: 'coaching', label: 'Coaching' },
        { key: 'lectures ', label: 'Lectures ' },
    ];

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
        setFormData({
            ...formData,
            amenities: checkboxes.reduce((acc, item) => {
                if (amenities[item.key] || false) {
                    acc.push(item.label)
                }
                return acc
            }, [])
        })
        // Object.keys(amenities).includes(item.key)
    }, [amenities])

    useEffect(() => {
        setFormData({
            ...formData,
            purpose: purposeCheckboxes.reduce((acc, item) => {
                if (eventPurpose[item.key] || false) {
                    acc = item.label
                }
                return acc
            }, "")
        })
    }, [eventPurpose])

    useEffect(() => {
        console.log(formData)
    }, [formData])
    return (
        <div className='overflow-y-scroll overflow-x-hidden h-screen w-full p-5'>
            {!orderPlaced ? (
                <form onSubmit={handleSubmit} >
                    <div className={`container-style p-5 space-y-7 border-2 border-[#2B3242] relative text-white`}>

                        <div className='grid grid-cols-3 gap-5'>
                            <Input
                                type={'text'}
                                placeholder={'Property Name'}
                                name={'property'}
                                onChange={handleChange}
                                className={'col-span-1'}
                                value={formData.property}
                            />
                        </div>
                        <div className='space-y-2'>
                            <p className='col-span-3'>Location Detail</p>
                            <div className='grid grid-cols-3 gap-5'>
                                <Input
                                    type={'text'}
                                    placeholder={'Street Name'}
                                    name={'street'}
                                    onChange={handleChange}
                                    value={formData.street}
                                />
                                <Input
                                    type={'text'}
                                    placeholder={'City'}
                                    name={'city'}
                                    onChange={handleChange}
                                    value={formData.city}
                                />
                                <Input
                                    type={'text'}
                                    placeholder={'Country'}
                                    name={'country'}
                                    onChange={handleChange}
                                    value={formData.country}
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <p>Select Amenities</p>
                            <CheckboxGroup checkboxes={checkboxes} checkedItems={amenities} setCheckedItems={setAmenities} />
                        </div>
                        <div className='space-y-2'>
                            <p>Event Purpose</p>
                            <CheckboxGroup checkboxes={purposeCheckboxes} checkedItems={eventPurpose} setCheckedItems={setEventPurpose} checkBox={false} />
                        </div>
                        <div className='space-y-2'>
                            <p>Description</p>
                            <div className='bg-[#1F252C] rounded-lg ring-1 ring-gray'>
                                <textarea
                                    type="text"
                                    placeholder='Rules, conditions, plans, notes, documents etc'
                                    name='description'
                                    onChange={handleChange}
                                    maxLength={200}
                                    style={{ resize: "none" }}
                                    value={formData.description}
                                    className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                                >

                                </textarea>
                                <div className='text-right text-body-text pr-3'>
                                    {/* <span >{event.description.length}</span> */}
                                    <p className='text-xs'>/ 200</p>
                                </div>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <p>Amount</p>
                            <div className='grid grid-cols-3 gap-5'>
                                <Input
                                    type="number"
                                    placeholder={"per Day"}
                                    name='amount'
                                    className="flex items-center pr-5"
                                    onChange={handleChange}
                                    value={formData.amount}
                                >
                                    <p>{`$${formData.amount}`}</p>
                                </Input>
                            </div>
                        </div>
                        <div className='bg-[#1F252C] col-center space-y-5 p-5 rounded-lg border-dashed border-2 border-primary'>
                            <label htmlFor='videoFile'>
                                <VideoIcon />
                            </label>
                            <input
                                type="file"
                                name='videoFile'
                                id='videoFile'
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
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
                        <div className={`bg-[#1F252C] col-center space-y-5 p-5 rounded-lg border-dashed border-2 border-primary`}>
                            <label htmlFor='photos'>
                                <GalleryIcon />
                            </label>
                            <input
                                type="file"
                                name='photos'
                                id='photos'
                                onChange={(e) => {
                                    const files = Array.from(e.target.files);
                                    setFormData({ ...formData, photos: [...files, ...formData.photos].slice(0, 6) })
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
                        {formData.photos.length > 0 && (
                            <div className={`bg-[#1F252C] col-center space-y-5 p-5 rounded-lg border-dashed border-2 border-primary`}>
                                <div className='grid grid-cols-6 gap-5 transition-all'>
                                    {formData.photos.map((img, index) => (
                                        <div className='relative rounded-xl overflow-hidden' key={index}>
                                            {img?.url ? (
                                                <img
                                                    src={img.url}
                                                    alt={`Selected ${index}`}
                                                    className='h-48 w-full object-cover rounded'
                                                />
                                            ) : (
                                                <img
                                                    src={URL.createObjectURL(img)}
                                                    alt={`Selected ${index}`}
                                                    className='h-48 w-full object-cover rounded'
                                                />
                                            )}
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    if (img?.url) {
                                                        await deleteImg(img);
                                                    }
                                                    setFormData({ ...formData, photos: formData.photos.filter((_, i) => i !== index) });
                                                }}
                                                className="absolute top-0 right-1 rounded-full bg-stroke/50 size-10 row-center"
                                            >
                                                <CrossIcon className="size-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className='border-b border-body-text'></div>
                        <div className='ml-auto w-1/5 gap-2 flex'>
                            <Button
                                text={"Cancel"}
                                className="bg-dark hover:bg-dark/50"
                            />
                            <Button
                                type="submit"
                                text={"List Property"}
                                onClick={() => setIsSuccess(true)}
                            />
                        </div>
                    </div>
                </form>
            ) : (
                <Modal open={orderPlaced}>
                    <div className='text-white col-center text-center'>
                        <img src={img.admin} alt="done" className='w-4/5 h-3/5' />
                        <div className='col-center gap-3'>
                            <h1 className='text-3xl'>Admin Approval</h1>
                            <p className='text-body-text'>Your property listing will be listed after admin acceptance</p>
                            {/* <Link to={`/event/${eventCreated._id}`} className='w-full'> */}
                            <Button
                                text='Done'
                                className="h-14"
                                onClick={() => setOrderPlaced(false)}
                            />
                            {/* </Link> */}
                        </div>
                    </div>
                </Modal>
            )}


            {/* {isSuccess && (
                
            )} */}

        </div>
    )
}

export default ListProperty