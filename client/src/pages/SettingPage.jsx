import React from 'react'
import SettingsItem from '../component/SettingsItem'
import { img } from '../assets/assets'
import { useSelector } from 'react-redux'
import { BellIcon, CalenderIcon, LikeIcon, SaveIcon, UserIcon } from '../assets/svg/Icon'
import { Link, Outlet } from 'react-router-dom'

function SettingPage() {
    const user = useSelector(state => state.auth.userData)
    return (
        <div className='grid grid-cols-4 h-screen'>
            <div className="overflow-hidden text-white bg-black-light p-5 col-span-1">
                <div className="flex p-5 gap-3 items-center justify-around">
                    <Link to={'/settings/profile'}>
                        <div className='rounded-full overflow-hidden ring-2 ring-white size-16 cursor-pointer'>
                            <img src={img.p3} alt="User Avatar" className="avatar" />
                        </div>
                    </Link>
                    <div className='flex flex-col items-end'>
                        <p>{`${user.name} ${user.surname}`}</p>
                        <p className='text-body-text'>{user.email}</p>
                    </div>
                </div>


                <div className="flex flex-col space-y-4">
                    <Link to={'/settings/edit/avatar'}>
                        <SettingsItem icon={<UserIcon fill="#ffffff" />} title="Avatar" />
                    </Link>
                    <Link to={'/settings/saved/events'}>
                        <SettingsItem icon={<SaveIcon />} title="Save Events" />
                    </Link>
                    <Link to={'/settings/liked/events'}>
                        <SettingsItem icon={<LikeIcon />} title="Liked Events" />
                    </Link>
                    <Link to={'/settings/your-friends/request'}>
                        <SettingsItem icon={<UserIcon fill="#ffffff" />} title="Your Friends" />
                    </Link>
                    <Link to={'/settings/your-friends'}>
                        <SettingsItem icon={<UserIcon fill="#ffffff" />} title="My Booking" />
                    </Link>
                    <Link to={'/settings/your-friends'}>
                        <SettingsItem icon={<UserIcon fill="#ffffff" />} title="Delete My Account" />
                    </Link>
                </div>
            </div>
            <div className='col-span-3'>
                <Outlet />
            </div>
        </div>
    )
}

export default SettingPage