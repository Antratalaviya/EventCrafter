import React from 'react'
import SettingsItem from '../component/SettingsItem'
import { img } from '../assets/assets'
import { useSelector } from 'react-redux'
import { BellIcon, CalenderIcon, DropDownIcon, LikeIcon, SaveIcon, UserIcon } from '../assets/svg/Icon'
import { Link, Outlet } from 'react-router-dom'
import ProfilesComponent from '../component/ProfilesComponent'
import { capitalize } from '../utils/customUtility'

function SettingPage() {
    const user = useSelector(state => state.auth.userData)
    return (
            <div className='grid grid-cols-4 h-screen overflow-y-auto'>
                <div className="overflow-hidden text-white bg-black-light lg:p-5 h-full lg:col-span-1 md:col-span-4 overflow-y-scroll">
                    <div className="flex p-5 gap-1 items-center justify-around flex-wrap">
                        <Link to={'/settings/profile'}>
                            <div className='rounded-full overflow-hidden ring-2 ring-white size-16 cursor-pointer'>
                                <img src={user.avatar ? user.avatar : img.userProfileImg} alt="User Avatar" className="avatar" />
                            </div>
                        </Link>
                        <div className='flex flex-col items-center'>
                            <p>{capitalize(`${user.name} ${user.surname}`)}</p>
                            <p className='text-body-text'>{user.email}</p>
                        </div>
                        <div>
                            {user.orgType === 'personal' && (
                                <div className='rounded-md bg-red-gradient text-white px-4 flex items-center justify-center'>
                                    <p>Personal</p>
                                </div>
                            )}
                            {user.orgType === 'institute' && (
                                <div className='rounded-md bg-public text-white px-5 flex items-center justify-center'>
                                    <p>Institute</p>
                                </div>
                            )}
                            {user.orgType === 'company' && (
                                <div className='rounded-md bg-workshop text-white px-3 flex items-center justify-center'>
                                    <p>Company</p>
                                </div>
                            )}
                            {user.orgType === 'school' && (
                                <div className='rounded-md bg-primary text-white px-5 flex items-center justify-center'>
                                    <p>School</p>
                                </div>
                            )}
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
                            <SettingsItem icon={<UserIcon fill="#ffffff" />} title="Your Friends">
                                <div className="relative flex items-center ">
                                    <div className="-space-x-2 flex overflow-hidden">
                                        <ProfilesComponent />
                                        <img src={img.p4} alt="profile1" className='inline-block size-8 rounded-full ring-2 ring-icon-bg' />
                                    </div>
                                </div>
                            </SettingsItem>
                        </Link>
                        <Link to={'/settings/your-friends'}>
                            <SettingsItem icon={<UserIcon fill="#ffffff" />} title="My Booking" />
                        </Link>
                        <Link to={'/settings/your-friends'}>
                            <SettingsItem icon={<UserIcon fill="#ffffff" />} title="Delete My Account" />
                        </Link>
                    </div>
                </div>
                <div className='lg:col-span-3 col-span-4 overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
    )
}

export default SettingPage