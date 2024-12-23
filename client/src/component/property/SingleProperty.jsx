import React, { useState } from 'react'
import { capitalize } from '../../utils/customUtility';
import { DeleteIcon, EditIcon, LocationFillIcon, SingleTickIcon, StarIcon } from '../../assets/svg/Icon';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import Button from '../Button';

function SingleProperty({ propertyId = "66c87da83c2e7bb657c929ba", property = "Artisan doing woodcutting..", rating = "4.5", street = "41901 Thornridge Cir. Shiloh", city = "Hawaii", country = "Singapor", amenities = ["Food"], purpose, description = "", amount = 250, photo, own = false, setDeleteModal }) {

    return (
        <div className={`shadow-custom-black bg-white/[3%] rounded-lg overflow-hidden relative`}>
            <Link to={`/property/${propertyId}`}>
                <div className='h-40 relative'>
                    <img className='w-full h-full object-cover' src={photo} alt="event_img" />
                </div>
            </Link>
            <div className='flex flex-col justify-evenly p-5 space-y-5'>
                {/* <div className='flex justify-between items-center py-3'>
                    <div className='flex float-right gap-5 cursor-pointer'>
                        <div className='flex gap-3 items-center text-white'>
                            {purpose === 'private' && (
                                <div className='rounded-md bg-orange text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                                    <p>Private</p>
                                </div>
                            )}
                            {purpose === 'public' && (
                                <div className='rounded-md bg-public text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                                    <p>Public</p>
                                </div>
                            )}
                            {purpose === 'workshop' && (
                                <div className='rounded-md bg-workshop text-white px-3 py-2 col-span-1 flex items-center justify-center'>
                                    <p>Workshop</p>
                                </div>
                            )}
                            {purpose === 'ticket' && (
                                <div className='rounded-md bg-yellow text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                                    <p>Ticket</p>
                                </div>
                            )}
                            {purpose === 'business' && (
                                <div className='rounded-md bg-red-gradient text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                                    <p>Business</p>
                                </div>
                            )}
                            <div className='rounded-md bg-primary text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                                <p>{status}</p>
                            </div>
                        </div>
                        <Link to={`/event/${eventId}`}>
                            <DropDownIcon fill="white" className="size-5" />
                        </Link>
                    </div>
                </div> */}
                <div className='flex items-center justify-between'>
                    <p className='text-white tracking-wider text-ellipsis line-clamp-1 w-3/5'>{capitalize(property)}</p>
                    <div className='rounded-xl bg-[#8ECE00]/10 text-white px-4 py-2 col-span-1 flex items-center justify-center ml-5 gap-2'>
                        <p className='text-[#8ECE00] text-xs font-extralight'><span className='text-base font-semibold'>{`$${amount} `}</span>Per Day</p>

                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-5 text-body-text text-sm font-extralight'>
                        <div className='flex items-center gap-x-2'>
                            <StarIcon />
                            <p className='text-white/75 text-sm text-center'>{rating}</p>
                        </div>
                        <div className='flex items-center gap-x-2 w-4/5'>
                            <LocationFillIcon />
                            <p className='leading-6 tracking-wider text-ellipsis line-clamp-1'>{`${capitalize(street + ", " + city + ", " + country + " ")}`}</p>
                        </div>
                    </div>
                    {own && (
                        <div className='flex items-center text-white gap-5 cursor-pointer'>
                            <Link to={'/'} className='flex items-center gap-2'>
                                <EditIcon />
                                <p className='text-body-text font-light'>Edit</p>
                            </Link>
                            <p className='text-body-text font-light'>|</p>
                            <div className='flex items-center gap-2' onClick={() => setDeleteModal(true)}>
                                <DeleteIcon />
                                <p className='text-body-text font-light'>Delete</p>
                            </div>
                        </div>
                    )}
                </div>
                {amenities.length > 0 && (
                    <div className='flex items-center flex-wrap gap-5 text-body-text font-extralight text-sm'>
                        {!own && amenities.map((item) => (
                            <div className='flex items-center gap-1' key={item}>
                                <SingleTickIcon />
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* {deleteModal && ( */}

            {/* )} */}
        </div>
    )
}

export default SingleProperty