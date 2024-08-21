import React from 'react'
import { useCurrLocation } from '../context/useCurrLocation'
import Event from '../component/events/Event'
import { img } from '../assets/assets';

function CreateEventPage() {
    const { loc } = useCurrLocation();


    const events = [
        {
            className: "bg-[#FFE7FF] text-[#48236A] border-[#FA3E97]",
            btnText: "text-[#48236A]",
            btnClr: "bg-yellow",
            title: "Private Event",
            img: img.privateEvent
        },
        {
            className: "bg-[#E7FFFA] text-[#00505B] border-[#00505B]",
            btnText: "text-[#ffffff]",
            btnClr: "bg-[#00505B]",
            title: "Public Event",
            img: img.publicEvent
        },
        {
            className: "bg-[#FFF9E7] text-[#192D50] border-[#192D50]",
            btnText: "text-[#ffffff]",
            btnClr: "bg-[#192D50]",
            title: "Workshop Event",
            img: img.workshopEvent
        },
        {
            className: "bg-[#E7EFFF] text-[#000000] border-[#000000]",
            btnText: "text-[#ffffff]",
            btnClr: "bg-[#000000]",
            title: "Ticket",
            img: img.ticket
        },
        {
            className: "bg-[#E7FDFF] text-[#1CA0AC] border-[#1CA0AC]",
            btnText: "text-[#ffffff]",
            btnClr: "bg-[#1CA0AC]",
            title: "Business Event",
            img: img.businessEvent
        }
    ];

    return (
        <div className='grid grid-cols-2 gap-8 p-8 overflow-y-scroll'>
            {events.map((event, idx) => (
                <Event
                    key={idx}
                    className={event.className}
                    btnText={event.btnText}
                    btnClr={event.btnClr}
                    title={event.title}
                    img={event.img}
                    idx={idx}
                />
            ))}
        </div>
    )
}

export default CreateEventPage

