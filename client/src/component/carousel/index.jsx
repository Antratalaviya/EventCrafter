import React from 'react'
import Carousel from './Carousel'

function CarouselHome() {
    return (
        <>
            <div className='flex justify-between px-4 py-2'>
                <p className='text-white text-base tracking-wider'>Sponsored Events</p>
                <p className='text-white/55 text-sm'>See All</p>
            </div>
            <div className='w-full h-96'>
                <Carousel />
            </div>
        </>

    )
}

export default CarouselHome
