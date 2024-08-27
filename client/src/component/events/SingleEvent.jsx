import React, { useState } from 'react'
import ProfilesComponent from '../ProfilesComponent'
import { LikeIcon, LocationFillIcon, SaveIcon, StarIcon } from '../../assets/svg/Icon'
import { capitalize } from '../../utils/customUtility'
import { useLikeEventMutation, useSaveEventMutation } from '../../api/api'

function SingleEvent({ date = '1 Apr', likedBy = "0", img, eventId, add, title = 'California Art Festival', rating = '4.5', participants = "29,378", type = 'public', participating = false, status = "draft", liked = false, saved = false }) {
    const [likeEvent] = useLikeEventMutation();
    const [saveEvent] = useSaveEventMutation();
    const [likedEvent, setLikedEvent] = useState(liked);
    const [savedEvent, setSavedEvent] = useState(saved);

    const handleLike = async (eventId) => {
        try {
            const response = await likeEvent(eventId).unwrap();
            if (response.success) {
                setLikedEvent((prev) => !prev)
            }
        } catch (error) {
            console.error('Failed to like event:', error);
        }
    }

    const handleSave = async (eventId) => {
        try {
            const response = await saveEvent(eventId).unwrap();
            if (response.success) {
                setSavedEvent((prev) => !prev)
            }
        } catch (error) {
            console.error('Failed to save event:', error);
        }
    }

    return (

        <div style={{ boxShadow: "0px 4px 4px 0px #00000040" }} className={`grid grid-cols-12 bg-white/[3%] rounded-lg overflow-hidden relative`}>
            {status === "draft" && (
                <div className='w-full h-full bg-white/20 absolute flex justify-center items-center z-20 backdrop-blur-sm'>
                    <div className='rounded-full px-8 py-2 bg-white/25 text-white'>
                        Draft
                    </div>
                </div>
            )}
            <div className='col-span-3 h-60 relative'>

                <div className='absolute bg-black/85 rounded-md text-white text-[12px] grid place-items-center w-1/2 py-1 top-2 left-2'>
                    {date}
                </div>
                <img className='w-full h-full object-cover' src={img} alt="event_img" />

            </div>
            <div className='col-span-9 flex flex-col justify-evenly px-5'>
                <div className='flex justify-between items-center py-3 '>
                    <div className='flex gap-3 items-center text-white'>
                        {type === 'private' && (
                            <div className='rounded-md bg-orange text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                                <p>Private</p>
                            </div>
                        )}
                        {type === 'public' && (
                            <div className='rounded-md bg-public text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                                <p>Public</p>
                            </div>
                        )}
                        {type === 'workshop' && (
                            <div className='rounded-md bg-workshop text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                                <p>Workshop</p>
                            </div>
                        )}
                        {type === 'ticket' && (
                            <div className='rounded-md bg-ticket text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                                <p>Ticket</p>
                            </div>
                        )}
                        {type === 'business' && (
                            <div className='rounded-md bg-red-gradient text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                                <p>Business</p>
                            </div>
                        )}
                        <div className='rounded-md bg-primary text-white px-5 py-2 col-span-1 flex items-center justify-center'>
                            <p>{status}</p>
                        </div>
                    </div>
                    <div className='flex float-right gap-5 cursor-pointer'>
                        <div onClick={() => handleLike(eventId)}>
                            {likedEvent ? (<LikeIcon className="fill-red stroke-red" />) : (<LikeIcon className="stroke-white" />)}
                        </div>
                        <div onClick={() => handleSave(eventId)}>
                            {savedEvent ? (<SaveIcon className=" stroke-white fill-white" />) : (<SaveIcon className=" stroke-white" />)}
                        </div>
                    </div>
                </div>
                <p className='text-white tracking-wider'>{capitalize(title)}</p>
                <div className='flex gap-x-5 items-center'>
                    <div className='h-7 px-7 grid place-items-center bg-white/10 rounded-full text-white text-[12px]'>{likedBy}+Likes
                    </div>


                    <div className='relative flex items-center'>
                        <ProfilesComponent />
                        <div className="rounded-full overflow-hidden text-white/75 flex justify-center items-center bg-[#1E232D] p-2 -translate-x-9 z-10">
                            <p className='text-[12px]'>{participants}+Going</p>
                        </div>
                    </div>
                </div>
                {/* <div className='flex items-center gap-x-3'>
                    <StarIcon />
                    <p className='text-white/75 text-sm text-center mt-1'>{rating}</p>
                </div> */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-2'>
                        <LocationFillIcon />
                        <p className='text-white/75 leading-6 font-normal tracking-wider font-sans'>{add}</p>
                    </div>
                </div>
                {participating && (
                    <div className='rounded-full bg-red text-white px-5 py-1 w-2/4 flex items-center justify-center'>
                        <p>participating</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SingleEvent
