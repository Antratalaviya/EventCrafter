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
            <div className="overflow-hidden text-white bg-black-light p-5 col-span-1 ">
                <div className="flex p-5 gap-3 flex-col items-center">
                    <div className='rounded-full overflow-hidden ring-2 ring-white size-20'>
                        <img src={img.p3} alt="User Avatar" className="avatar" />
                    </div>
                    <div className='flex flex-col items-center'>
                        <p>{`${user.name} ${user.surname}`}</p>
                        <p>{user.email}</p>
                    </div>
                </div>


                <div className="flex flex-col space-y-4">
                    <Link to={'/settings/edit/avatar'}>
                        <SettingsItem icon={<UserIcon />} title="Avatar" />
                    </Link>
                    <SettingsItem icon={<SaveIcon />} title="Save Events" />
                    <SettingsItem icon={<LikeIcon />} title="Liked Events" />
                    <SettingsItem icon={<CalenderIcon />} title="Joined Events" />
                    <SettingsItem icon={<BellIcon />} title="Notification" />
                </div>
            </div>
            <div className='col-span-3'>
                <Outlet />
            </div>
        </div>
    )
}

export default SettingPage