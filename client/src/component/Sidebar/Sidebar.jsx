import React from 'react'
import { NavLink } from 'react-router-dom'
import { LogoIcon, LogoutIcon } from '../../assets/svg/Icon'
import { SidebarLinks, LogoutLink } from "../../lib/consts"
import { useCurrLocation } from '../context/useCurrLocation'

function Sidebar() {
  const { setLoc } = useCurrLocation();
  return (
    <div className='border bg-gray border-stroke flex flex-col items-center gap-3'>
      <div>
        <NavLink to={'/'} className={({ isActive }) => `w-full py-5 flex justify-center items-center ${isActive ? "" : ""}`}>
          <LogoIcon />
        </NavLink>
      </div>
      <div className='flex items-center flex-col'>
        <ul>
          <li>
            {SidebarLinks && SidebarLinks.map((item) => (
              <NavLink to={item.path} key={item.key} className={({ isActive }) => `${isActive ? `bg-primary border-r-2 border-white ${setLoc(item.label)}` : ""} py-4 px-8 flex justify-center items-center`}>

                {item.icon}
              </NavLink>
            ))}
          </li>

        </ul>
        {/* <NavLink to={'/add'} className={({ isActive }) => `w-full py-5 px-3 flex justify-center items-center ${isActive ? "bg-primary border-r-2 border-white" : ""}`}>
          <AddCircleIcon />
        </NavLink>
        <NavLink to={'/'} className={({ isActive }) => `w-full py-5 px-3 flex justify-center items-center ${isActive ? "bg-primary border-r-2 border-white" : ""}`}>
          <HomeIcon />
        </NavLink>

        <NavLink to={'/msg'} className={({ isActive }) => `w-full py-5 px-3 flex justify-center items-center ${isActive ? "bg-primary border-r-2 border-white" : ""}`}>
          <MsgIcon />
        </NavLink>
        <NavLink to={'/money'} className={({ isActive }) => `w-full py-5 px-3 flex justify-center items-center ${isActive ? "bg-primary border-r-2 border-white" : ""}`}>
          <MoneyIcon />
        </NavLink>
        <NavLink to={'/building'} className={({ isActive }) => `w-full py-5 px-3 flex justify-center items-center ${isActive ? "bg-primary border-r-2 border-white" : ""}`}>
          <BuildingIcon />
        </NavLink>
        <NavLink to={'/settings'} className={({ isActive }) => `w-full py-5 px-3 flex justify-center items-center ${isActive ? "bg-primary border-r-2 border-white" : ""}`}>
          <SettingIcon />
        </NavLink> */}
      </div>
      <div className='mt-auto'>
        <ul>
          <li>
            {LogoutLink && LogoutLink.map((item) => (
              <NavLink to={item.path} key={item.key} className={({ isActive }) => `${isActive ? "bg-primary border-r-2 border-white" : ""} mb-5 py-4 px-8 flex justify-center items-center`}>

                {item.icon}
              </NavLink>
            ))}
          </li>

        </ul>
        {/* <NavLink to={'/logout'} className={({ isActive }) => `w-full mb-5 py-5 px-3 flex justify-center items-center ${isActive ? "" : ""}`}>
          <LogoutIcon />
        </NavLink> */}
      </div>
    </div>

  )
}

export default Sidebar
