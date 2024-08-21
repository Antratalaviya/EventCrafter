import React from 'react'

function EventTypeBox({ img, event }) {
    return (
        <div style={{ boxShadow: "0px 4px 4px 0px #00000040" }} className='w-full p-3 flex items-center gap-x-4 bg-black-light rounded-lg'>
            <div className='w-16 h-16 flex items-center'>
                <img className='w-full h-full' src={img} alt="eventType1" />
            </div>
            <p className='text-white/90'>{event}</p>
        </div>
    )
}

export default EventTypeBox
