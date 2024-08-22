import React from 'react'
import { NavLink } from 'react-router-dom'
import { AddCircleIcon, BuildingIcon, HomeIcon, LogoIcon, LogoutIcon, MoneyIcon, MsgIcon, SettingIcon } from '../../assets/svg/Icon'
import { SidebarLinks, LogoutLink } from "../../lib/consts"
import { useCurrLocation } from '../../context/useCurrLocation'

function Sidebar() {
  const { setLoc, loc } = useCurrLocation();
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
            {SidebarLinks && SidebarLinks.map((item, index) => (
              <NavLink to={item.path} key={item.key} className={({ isActive }) => `${isActive ? `bg-primary border-r-2 border-white` : ""} py-4 px-8 flex justify-center items-center fill-yellow`} onClick={() => setLoc(item.label)}>
                {(() => {
                  switch (item.key) {
                    case "add":
                      return <AddCircleIcon className={`fill-none ${loc === item.label ? 'stroke-primary fill-white stroke-2' : "stroke-[#96989D]"}`} />;

                    case "home":
                      return <HomeIcon fill={'white'} className={`${loc === item.label ? 'stroke-transperent fill-white' : "stroke-[#96989D] fill-transperent"}`} />;

                    case "message":
                      return <MsgIcon className={`${loc === item.label && 'stroke-white'}`} />;

                    case "money":
                      return <MoneyIcon className={`${loc === item.label && 'stroke-white'}`} />;

                    case "building":
                      return <BuildingIcon className={`${loc === item.label && 'stroke-white'}`} />;

                    case "settings":
                      return <SettingIcon className={`${loc === item.label && 'stroke-white'}`} />;
                  }
                })()}
              </NavLink>
            ))}
          </li>

        </ul>
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
      </div>
    </div>

  )
}

export default Sidebar
