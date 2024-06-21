import React, { useEffect, useState } from 'react'
import { activity } from './activity'
import Button from '../Button'
import { SelectIcon } from '../../assets/svg/Icon'

function ActivityModal({ onSelect }) {
    const [select, setSelect] = useState(null)
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        function capitalize(string) {
            return string.split(' ').map((str) => str[0].toUpperCase() + str.slice(1)).join(' ');
        }
        setActivities(activity.map((item) => capitalize(item.text)))

    }, [])

    return (
        <div className='w-full h-full flex items-center flex-col space-y-4'>
            <p className='text-white text-xl'>Set Mex</p>
            <div className='h-1 border-b border-body-text w-full' />
            <div className='w-full space-y-4 p-2'>
                {activities && activities.map((item, index) => (
                    <div className='bg-new-card rounded-lg flex items-center pr-3 ring-1 w-full ring-gray cursor-pointer' key={index} onClick={() => setSelect(item)} >
                        <div className={`bg-transperent focus:outline-none w-full py-3 px-5 text-sm ${select && select === item ? "text-white" : "text-white/40"}`}>
                            <p>{item}</p>
                        </div>
                        <div className='cursor-pointer'>
                            {select && select === item ? <SelectIcon /> : (
                                <div className='w-4 h-4 rounded-full ring-1 ring-white' />
                            )}
                        </div>
                    </div>
                ))}
                <div className='w-full'>
                    <Button onEvent={onSelect} text={'Select'} disabled={select ? false : true} />
                </div>
            </div>


        </div>
    )
}

export default ActivityModal
