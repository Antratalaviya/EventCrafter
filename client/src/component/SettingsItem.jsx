import React from 'react'
import { DropDownIcon } from '../assets/svg/Icon'

function SettingsItem({ icon, title, children }) {
    return (
        <div className='container-style p-4 w-full flex items-start justify-between'>
            <div className="flex items-center gap-5">{icon}
                <p>{title}</p>
            </div>
            <div className='row-center'>
                {children}
                <DropDownIcon fill="white" />
            </div>
        </div>
    )
}

export default SettingsItem