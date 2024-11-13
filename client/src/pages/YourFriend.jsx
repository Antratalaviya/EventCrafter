import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function YourFriend() {
    return (
        <div className='p-5 h-screen text-white flex flex-col'>
            <div className='p-5 text-center font-semibold text-xl'>
                <p>Your Friend</p>
            </div>
            <div className='flex gap-5 my-5'>
                <Link to={'/settings/your-friends/request'}>
                    <button className='focus:bg-public focus:text-white focus:border-none bg-public/10 text-public border border-public/50 rounded-full px-4 py-2'>
                        Request
                    </button>
                </Link>
                <Link to={'/settings/your-friends/invitation/sent'}>
                    <button className='focus:bg-workshop focus:text-white focus:border-none bg-workshop/10 text-workshop border border-workshop/50 rounded-full px-4 py-2'>
                        Invitation
                    </button>
                </Link>
                <Link to={'/settings/your-friends/myfriends'}>
                    <button className='focus:bg-ticket focus:text-white focus:border-none bg-ticket/10 text-ticket border border-ticket/50 rounded-full px-4 py-2'>
                        My friends
                    </button>
                </Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default YourFriend