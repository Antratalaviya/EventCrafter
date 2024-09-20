import React from 'react'
import { useCurrLocation } from '../../context/useCurrLocation';
import Button from '../Button';
import { ArrowIconR } from '../../assets/svg/Icon';
import { NavLink } from 'react-router-dom';
import { EventsLinks } from '../../lib/consts';

function Event({ className, btnText, btnClr, title, img, idx, des = "Et eum ut laboriosam fugiat. Rerum aut incidunt iure facilis ipsum eveniet labore ut." }) {
    const { loc, setPageName } = useCurrLocation();
    return (
        <div className={`col-span-1 flex justify-around items-center p-5 border-2 rounded-xl ${className}`}>
            <div className='space-y-3 w-2/3'>
                <p className='text-xl font-semibold'>{title}</p>
                <p>{des}</p>

                <NavLink to={`${EventsLinks[idx].path}/1`}>
                    <div className='w-2/5 py-3'>
                        <Button
                            text='Create Now'
                            className={`font-semibold ${btnText} ${btnClr}`}
                            onEvent={() => setPageName(() => `Create ` + title)}
                        >
                            <ArrowIconR />
                        </Button>
                    </div>
                </NavLink>
            </div>
            <div>
                <img src={img} alt={img.privateEvent} />
            </div>
        </div>
    )
}

export default Event
