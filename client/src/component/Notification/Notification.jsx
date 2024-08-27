import React from 'react'
import { img } from '../../assets/assets'
import Button from '../Button'

function Notification({ message = "Clara Tolson Join your Event Gala Music Festival", time = "just now", avatar = 'abc', type = "joinevent", invitationId = "abc", isRead = false }) {
    return (
        <>
            <div className={`flex items-start justify-between`}>
                <div className='flex items-start gap-5 w-[70%]'>
                    <div className='rounded-full size-16 overflow-hidden'>
                        <img src={img.p3} alt="profile_img" className='h-16 w-24' />
                    </div>
                    <div className='flex flex-col justify-center w-[80%]'>
                        <p className='break-words text-body-text font-light text-left'><span className='text-white font-medium'>{message.split(" ")[0]} {message.split(" ")[1]}</span> {message.split(" ").slice(2).join(" ")}</p>
                        {type === 'invitation' && (
                            <div className='flex gap-3 w-full'>
                                <Button className="bg-stroke hover:bg-stroke/80">Reject</Button>
                                <Button>Accept</Button>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    {time}
                </div>
            </div>
            <hr />
        </>
    )
}

export default Notification