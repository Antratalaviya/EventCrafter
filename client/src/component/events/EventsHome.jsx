import React from 'react'
import SingleEvent from './SingleEvent'
import { img } from '../../assets/assets'

function EventsHome() {
    return (
        <div className='flex flex-col space-y-5'>
            <SingleEvent img={img.eventImg} add="Suite 577 44666 O'Keefe Turnpike, New Marianobury, SC 66348" />
            <SingleEvent img={img.eventImg1} add="01040 Duncan Vista" />
            <SingleEvent img={img.eventImg2} add="01040 Duncan Vista" />
            <SingleEvent img={img.eventImg3} add="01040 Duncan Vista" />
        </div>
    )
}

export default EventsHome
