import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AddCircleIcon, BuildingIcon, CalenderIcon, EventIcon, HomeIcon, LogoIcon, LogoutIcon, MoneyIcon, MsgIcon, PropertyIcon, SettingIcon } from '../../assets/svg/Icon'
import { SidebarLinks, LogoutLink } from "../../lib/consts"
import { useCurrLocation } from '../../context/useCurrLocation'
import { useLogoutMutation } from '../../api/api'
import { toast } from 'react-toastify'

function Sidebar() {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const { setPageName, loc, setLoc } = useCurrLocation();
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleChange = (page, location) => {
    setPageName(page)
    setLoc(location)
    setIsOptionsVisible(false);
  }

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  const handleIconClick = () => {
    setLoc("add")
    setIsOptionsVisible(!isOptionsVisible);
  };

  const handleNavigation = (path, pathName) => {
    if (pathName === 'event') {
      setPageName("Create Event")
    } else if (pathName === 'property') {
      setPageName("List Property")
    }
    navigate(path);
    setIsOptionsVisible(false); // Hide options after navigation
  };

  return (
    <div className='border bg-gray border-stroke flex flex-col items-center gap-3'>
      <div>
        <NavLink to={'/'} className={`w-full py-5 flex justify-center items-center`}>
          <LogoIcon />
        </NavLink>
      </div>
      <div className='flex items-center flex-col'>
        <ul>
          <li>
            <div className={`${loc === "add" ? `bg-primary border-r-2 border-white` : ""} py-4 px-8 flex justify-center cursor-pointer items-center relative`}>
              <div onClick={handleIconClick} >
                <AddCircleIcon className={`fill-none ${loc === "add" ? 'stroke-primary fill-white stroke-2' : "stroke-[#96989D]"}`} />
              </div>
              {isOptionsVisible && (
                <div className='absolute left-24 top-1 bg-primary shadow-lg text-body-text rounded-xl z-10'>
                  <button
                    onClick={() => handleNavigation('/create-event', "event")}
                    className="w-full flex items-center gap-2 hover:bg-black/10 hover:text-white p-3 pb-2"
                  >

                    <div className='rounded-full bg-[#4d26a7] size-7 flex items-center justify-center'>
                      <EventIcon />
                    </div>
                    <p className='text-sm text-nowrap'>Create Event</p>
                  </button>
                  <button
                    onClick={() => handleNavigation('/property/listproperty', "property")}
                    className="w-full flex items-center gap-2 hover:bg-black/10 hover:text-white p-3 pt-2"
                  >
                    <div className='rounded-full bg-[#4d26a7] size-7 flex items-center justify-center'>
                      <PropertyIcon />
                    </div>
                    <p className='text-sm text-nowrap'>List Your Property</p>
                  </button>
                </div>
              )}
            </div>
            {SidebarLinks && SidebarLinks.map((item, index) => (
              <NavLink to={item.path} key={index} className={`${loc === item.key ? `bg-primary border-r-2 border-white` : ""} py-4 px-8 flex justify-center items-center fill-yellow`} onClick={() => handleChange(item.label, item.key)}>
                {(() => {
                  switch (item.key) {
                    case "home":
                      return <HomeIcon fill={'white'} className={`${loc === item.key ? 'stroke-transperent fill-white' : "stroke-[#96989D] fill-transperent"}`} />;

                    case "chat":
                      return <MsgIcon stroke={`${loc === item.key ? 'white' : "#96989D"}`} />;

                    case "news":
                      return <MoneyIcon className={`${loc === item.key && 'stroke-white'}`} />;

                    case "property":
                      return <BuildingIcon className={`${loc === item.key && 'stroke-white'}`} />;

                    case "settings":
                      return <SettingIcon className={`${loc === item.key ? 'stroke-white fill-white' : "fill-transperent stroke-[#96989D]"}`} />;
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
              <NavLink to={isLoading ? "/" : item.path} key={item.key} className={({ isActive }) => `${isActive ? "bg-primary border-r-2 border-white" : ""} mb-5 py-4 px-8 flex justify-center items-center`} onClick={handleLogout}>

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
