import React from 'react'
import { DropDownIcon } from '../assets/svg/Icon'

function SettingsItem({ icon, title, badge, toggle }) {
    return (
        <div className='shadow-custom-black p-4 w-full flex items-start justify-between bg-black-light rounded-lg'>
            <div className="flex items-center gap-5">{icon}
                <p>{title}</p>
            </div>
            {badge && <span className="badge">{badge}</span>}
            {toggle && (
                <div className="toggle-switch">
                    <input type="checkbox" id={title} />
                    <label htmlFor={title}></label>
                </div>
            )}
            <DropDownIcon fill="white" />
        </div>
    )
}

export default SettingsItem