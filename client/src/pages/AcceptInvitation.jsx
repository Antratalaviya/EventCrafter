import React, { useEffect, useMemo, useState } from 'react'
import { img } from '../assets/assets'
import Button from '../component/Button'
import { CalenderIcon, DropDownIcon, TimeIcon, UserIcon } from '../assets/svg/Icon'
import { useGetAllInvitationsQuery } from '../api/api';
import { capitalize, getDate, getFilterNotification, getFullDay, getFullTime, getTime } from '../utils/customUtility';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function AcceptInvitation() {
    const { data, isSuccess, error } = useGetAllInvitationsQuery();
    const [invitation, setInvitation] = useState();
    const [todayCount, setTodayCount] = useState(0);
    const [yesterDayCount, setYesterDayCount] = useState(0);

    const time = useMemo(() => {
        return data?.data.map(d => d.updatedAt ? getTime(d.updatedAt) : "21:00");

    }, [data]);

    useEffect(() => {
        if (isSuccess) {
            setInvitation(data.data)
            setTodayCount(data.data.filter((not) => getFilterNotification(not.updatedAt) === 0).length)
            setYesterDayCount(data.data.filter((not) => getFilterNotification(not.updatedAt) === 1).length)
        } else {
            toast.error(error)
        }
    }, [data])
    return (
        <div className='text-white p-5 pb-20'>
            <div className='grid xl:grid-cols-2 grid-cols-1 gap-10'>
                {invitation && invitation.length > 0 && invitation.map((item, i) => (
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
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                        <img src={item.avatar} alt="User Avatar" />
                                    </div>
                                    <p>{capitalize(`${item.name} ${item.surname}`)}</p>
                                </div>
                                <div className='flex gap-2 h-8'>
                                    <div className='rounded-md bg-dark text-white px-3 flex items-center justify-center'>
                                        <p>Event</p>
                                    </div>
                                    {item.type === 'private' && (
                                        <div className='rounded-md bg-red-gradient text-white px-4 flex items-center justify-center'>
                                            <p>Private</p>
                                        </div>
                                    )}
                                    {item.type === 'public' && (
                                        <div className='rounded-md bg-public text-white px-5 flex items-center justify-center'>
                                            <p>Public</p>
                                        </div>
                                    )}
                                    {item.type === 'workshop' && (
                                        <div className='rounded-md bg-workshop text-white px-3 flex items-center justify-center'>
                                            <p>Workshop</p>
                                        </div>
                                    )}
                                    {item.type === 'ticket' && (
                                        <div className='rounded-md bg-ticket text-white px-5 flex items-center justify-center'>
                                            <p>Ticket</p>
                                        </div>
                                    )}
                                    {item.type === 'business' && (
                                        <div className='rounded-md bg-yellow text-white px-5 flex items-center justify-center'>
                                            <p>Business</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='pl-12 text-sm font-extralight space-y-2'>
                                <div className='flex items-center gap-1'>
                                    <UserIcon fill='white' className="size-4" />
                                    <p>{item.participants}</p>
                                    <p>Participants</p>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    •
                                    <p>{item.title}</p>
                                    •
                                    <p>{`Invited`}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <div className='flex items-center gap-1'>
                                        <CalenderIcon fill='white' className="size-4" />
                                        <p>{getDate(item.startDate)}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <TimeIcon className="size-4" />
                                        <p>{getFullTime(item.startTime, item.endTime)}</p>
                                    </div>
                                </div>
                            </div>
                            <hr className='text-body-text/30' />
                            <div className='grid grid-cols-5 text-sm'>
                                <div className='flex items-center col-span-3 gap-2'>
                                    <Button
                                        text="Cancel Invitation"
                                        className="bg-black-light hover:bg-black-light/80 h-8 flex items-center border border-dark px-3"
                                    />
                                    <Button
                                        text="Accept"
                                        className="h-8 flex items-center w-32"
                                    />
                                </div>
                                <Link to={`/event/${item.event}?invitation=${item._id}`} className='flex justify-end col-span-2 items-center'>
                                    <DropDownIcon fill="white" />
                                </Link>
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
                        <p className='text-sm font-extralight'>Group Invitation</p>
                    </div>
                    <div className='pl-12 text-sm font-extralight space-y-2'>
                        <div className='flex items-center gap-1'>
                            <UserIcon fill='white' className="size-4" />
                            <p>{`11`}</p>
                            <p>Participants</p>
                        </div>
                        <div className='flex gap-4 items-center'>
                            •
                            <p>{`Group Boys`}</p>
                            •
                            <p>{`Group Member (20)`}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='flex items-center gap-1'>
                                <CalenderIcon fill='white' className="size-4" />
                                <p>{`14.11.2023`}</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <TimeIcon className="size-4" />
                                <p>{`09:00 am`}</p>
                            </div>
                        </div>
                    </div>
                    <hr className='text-body-text/30' />
                    <div className='grid grid-cols-5 text-sm'>
                        <div className='flex items-center col-span-3 gap-2'>
                            <Button
                                text="Leave Group"
                                className="bg-black-light hover:bg-black-light/80 h-8 flex items-center border border-dark px-3"
                            />
                            <Button
                                text="Accept"
                                className="h-8 flex items-center w-32"
                            />
                        </div>
                        <div className='flex justify-end col-span-2 items-center'>
                            <DropDownIcon fill="white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AcceptInvitation