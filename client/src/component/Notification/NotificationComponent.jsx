import React, { useState } from 'react'
import { BellIcon, LogoIcon } from '../../assets/svg/Icon'
import Drawer from '../Drawer/Drawer'
import Notification from './Notification'
import Button from '../Button'
import { img } from '../../assets/assets'
import { getFilterNotification } from '../../utils/customUtility'

function NotificationComponent({ notifications, setNotifications, isNewMsg, isLoading, time, setIsNewMsg, handleReadNotification }) {
    const [todayCount, setTodayCount] = useState(0);
    const [yesterDayCount, setYesterDayCount] = useState(0);
    const [notiDrawer, setNotiDrawer] = useState(false);


    const handleOpen = () => {
        setNotiDrawer(true)
        setNotifications((prev) => prev.map((p) => ({ ...p, isRead: true })))
        setIsNewMsg(false)
        setTodayCount(notifications.filter((not) => getFilterNotification(not.createdAt) === 0).length)
        setYesterDayCount(notifications.filter((not) => getFilterNotification(not.createdAt) === 1).length)
    }
    return (
        <>
            <div onClick={() => {
                handleOpen();
                handleReadNotification();
            }
            } className='relative'>
                <BellIcon className="pr-3 w-10 cursor-pointer" />
                {isNewMsg && (
                    <div className='size-2 rounded-full bg-red absolute top-0 right-3' />
                )}
            </div >
            <Drawer open={notiDrawer} onClose={() => setNotiDrawer(false)} className="ml-[60rem] col-span-12 overflow-y-scroll">
                <div className='text-white'>
                    <p className='-pt-5 text-center text-black text-2xl font-bold tracking-wider sticky left-16 top-0 bg-white py-5 rounded-full mb-5'>Notification</p>
                    <div className='py-4 space-y-3'>
                        {!isLoading && notifications.length > 0 && notifications?.map((n, i) => (
                            <React.Fragment key={n._id}>
                                {i === 0 && todayCount > 0 && <h1 className='text-xl py-3'>Today</h1>}
                                {i === todayCount && yesterDayCount > 0 && <h1 className='text-xl py-3'>YesterDay</h1>}
                                {i === (todayCount + yesterDayCount) && <h1 className='text-xl py-3'>Few days ago</h1>}
                                <Notification
                                    message={n.message}
                                    time={time[i]}
                                    isRead={n.isRead}
                                />
                            </React.Fragment>
                        ))}
                        <div className='flex items-start justify-between'>
                            <div className='flex items-start gap-5 w-[70%]'>
                                <div className='rounded-full size-16 overflow-hidden'>
                                    <img src={img.p2} alt="profile_img" className='h-16 w-24' />
                                </div>
                                <div className='flex flex-col items-center w-[80%]'>
                                    <p className='break-words text-body-text font-light'><span className='text-white font-medium'>David Silbia </span> Invite Jo Malone London's Mother's Event</p>
                                    <div className='flex gap-3 w-full'>
                                        <Button className="bg-stroke hover:bg-stroke/80">Reject</Button>
                                        <Button>Accept</Button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                5 min ago
                            </div>
                        </div>
                        <hr />
                        <div className='flex items-start justify-between'>
                            <div className='flex items-start gap-5 w-[70%]'>
                                <div className='rounded-full size-16 overflow-hidden'>
                                    <img src={img.p3} alt="profile_img" className='h-16 w-24' />
                                </div>
                                <div className='flex flex-col items-center w-[80%]'>
                                    <p className='break-words text-body-text font-light'><span className='text-white font-medium'>Clara Tolson </span>  Join your Event Gala Music Festival</p>
                                </div>
                            </div>
                            <div>
                                1 hr ago
                            </div>
                        </div>
                        <hr />
                        {notifications.length === 0 && (
                            <div className='grid place-items-center mt-80 gap-3'>
                                <LogoIcon />
                                <p>No New Notification !!!</p>
                            </div>
                        )}
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default NotificationComponent