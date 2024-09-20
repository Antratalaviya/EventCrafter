import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom';


function InvitationPage() {
    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-evenly border-b-2 border-body-text/30'>
                <NavLink to={'/settings/your-friends/invitation/sent'} className={({ isActive }) => `py-2 ${isActive && "border-b-2 border-white"}`}>
                    <p>Sent Invitation</p>
                </NavLink>
                <NavLink to={'/settings/your-friends/invitation/accept-or-reject'} className={({ isActive }) => `py-2 ${isActive && "border-b-2 border-white"}`}>
                    <p>Accepted/Rejected</p>
                </NavLink>
                <NavLink to={'/settings/your-friends/invitation/received'} className={({ isActive }) => `py-2 ${isActive && "border-b-2 border-white"}`}>
                    <p>Received Invitation</p>
                </NavLink>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default InvitationPage