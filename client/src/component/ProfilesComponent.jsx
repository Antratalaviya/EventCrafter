import React from 'react'
import { img } from '../assets/assets'

function ProfilesComponent() {
    return (
        <>
            <div className={`rounded-full overflow-hidden w-8 h-8 border border-icon-bg`}>
                <img src={img.p1} alt="profile1" />
            </div>
            <div className="rounded-full overflow-hidden w-8 h-8 border border-icon-bg -translate-x-3 z-10">
                <img src={img.p2} alt="profile2" />
            </div>
            <div className="rounded-full overflow-hidden w-8 h-8 border border-icon-bg -translate-x-6 z-10">
                <img src={img.p3} alt="profile3" />
            </div>
        </>
    )
}

export default ProfilesComponent
