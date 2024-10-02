import React from 'react'
import { img } from '../assets/assets'

function ProfilesComponent() {
    return (
        <>
            <div className={`flex -space-x-2 overflow-hidden`}>
                <img src={img.p1} alt="profile1" className='inline-block size-8 rounded-full ring-2 ring-icon-bg' />
                <img src={img.p2} alt="profile2" className='inline-block size-8 rounded-full ring-2 ring-icon-bg' />
                <img src={img.p3} alt="profile3" className='inline-block size-8 rounded-full ring-2 ring-icon-bg' />
            </div>
        </>
    )
}

export default ProfilesComponent
