import React from 'react'
import { SelectIcon } from '../../assets/svg/Icon'
import { ProgressBar } from '../../pages/CreatePriEvent'

function Payment({ progress }) {
    return (
        <div className='overflow-y-scroll overflow-x-hidden h-screen'>
            <div className={`bg-black-light p-5 m-5 rounded-xl border-2 border-stroke relative text-white shadow-custom-black ${progress > 4 && "hidden"}`}>
                <ProgressBar progress={progress} />
                <div className="p-4 border-b-2 border-body-text">
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment