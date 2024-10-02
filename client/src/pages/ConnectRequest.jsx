import React, { useEffect, useMemo, useState } from 'react'
import { img } from '../assets/assets'
import Button from '../component/Button'
import { TimeIcon } from '../assets/svg/Icon'
import { useGetAllConnectionRequestQuery } from '../api/api';
import { toast } from 'react-toastify';
import { getFilterNotification, getFullDay, getTime } from "../utils/customUtility"

function ConnectRequest() {
    const { data, isSuccess, error } = useGetAllConnectionRequestQuery();
    const [requests, setRequests] = useState();
    const [todayCount, setTodayCount] = useState(0);
    const [yesterDayCount, setYesterDayCount] = useState(0);

    const time = useMemo(() => {
        return data?.data.map(d => getTime(d.updatedAt));
    }, [data]);

    useEffect(() => {
        if (isSuccess) {
            setRequests(data.data)
            setTodayCount(data.data.filter((not) => getFilterNotification(not.updatedAt) === 0).length)
            setYesterDayCount(data.data.filter((not) => getFilterNotification(not.updatedAt) === 1).length)
        } else {
            toast.error(error)
        }
    }, [data])


    return (
        <div className='h-screen overflow-y-scroll text-white'>
            <div className='grid xl:grid-cols-2 grid-cols-1 gap-5'>
                {requests && requests.map((item, i) => (
                    <React.Fragment key={item._id}>
                        {i === 0 && todayCount > 0 &&
                            <div className='flex justify-between items-center xl:col-span-2'>
                                <h1 className='text-xl'>Today</h1>
                                <p>{time[i]}</p>
                            </div>
                        }
                        {i === todayCount && yesterDayCount > 0 &&
                            <div className='flex justify-between items-center xl:col-span-2'>
                                <h1 className='text-xl py-3'>YesterDay</h1>
                                <p>{time[i]}</p>
                            </div>
                        }
                        {i === (todayCount + yesterDayCount) &&
                            <div className='flex justify-between items-center xl:col-span-2'>
                                {/* <h1 className='text-xl py-3'>{getFullDay(new Date(item.updatedAt).getDay())}</h1> */}
                                <h1 className='text-xl py-3'>Tuesday</h1>
                                <p>{time[i]}</p>
                            </div>
                        }
                        <div className='bg-black-light p-5 rounded-md space-y-2'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                        <img src={img.p3} alt="User Avatar" />
                                    </div>
                                    <p>{`${item.name} ${item.surname}`}</p>
                                </div>
                                <p className='text-sm text-yellow font-extralight'>Connect Request</p>
                            </div>
                            <div className='grid grid-cols-3'>
                                <div className='flex items-center col-span-2 gap-2'>
                                    <Button
                                        text="Decline"
                                        className="bg-dark hover:bg-dark/80"
                                    />
                                    <Button
                                        text="Connect"
                                    />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
                <div className='bg-black-light p-5 rounded-md space-y-2'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                <img src={img.p3} alt="User Avatar" />
                            </div>
                            <p>Dianne Russell</p>
                        </div>
                        <p className='text-sm text-yellow font-extralight'>Connect Request</p>
                    </div>
                    <div className='grid grid-cols-3'>
                        <div className='flex items-center col-span-2 gap-2'>
                            <Button
                                text="Decline"
                                className="bg-dark hover:bg-dark/80"
                            />
                            <Button
                                text="Connect"
                            />
                        </div>
                    </div>
                </div>
                <div className='bg-black-light p-5 rounded-md space-y-2'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                <img src={img.p3} alt="User Avatar" />
                            </div>
                            <p>Dianne Russell</p>
                        </div>
                        <p className='text-sm text-yellow font-extralight'>Connect Request</p>
                    </div>
                    <div className='grid grid-cols-3'>
                        <div className='flex items-center col-span-2 gap-2'>
                            <Button
                                text="Decline"
                                className="bg-dark hover:bg-dark/80"
                            />
                            <Button
                                text="Connect"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectRequest