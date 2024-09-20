import React from 'react'
import { NavLink } from 'react-router-dom'
import { AddCircleIcon, BuildingIcon, HomeIcon, LogoIcon, LogoutIcon, MoneyIcon, MsgIcon, SettingIcon } from '../../assets/svg/Icon'
import { SidebarLinks, LogoutLink } from "../../lib/consts"
import { useCurrLocation } from '../../context/useCurrLocation'
import { useLogoutMutation } from '../../api/api'
import { toast } from 'react-toastify'

function Sidebar() {
  const { setPageName, loc, setLoc } = useCurrLocation();
  const [logout, { isLoading }] = useLogoutMutation();
  const handleChange = (page, location) => {
    setPageName(page)
    setLoc(location)
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
            {SidebarLinks && SidebarLinks.map((item, index) => (
              <NavLink to={item.path} key={index} className={`${loc === item.key ? `bg-primary border-r-2 border-white` : ""} py-4 px-8 flex justify-center items-center fill-yellow`} onClick={() => handleChange(item.label, item.key)}>
                {(() => {
                  switch (item.key) {
                    case "add":
                      return <AddCircleIcon className={`fill-none ${loc === item.key ? 'stroke-primary fill-white stroke-2' : "stroke-[#96989D]"}`} />;

                    case "home":
                      return <HomeIcon fill={'white'} className={`${loc === item.key ? 'stroke-transperent fill-white' : "stroke-[#96989D] fill-transperent"}`} />;

                    case "message":
                      return <MsgIcon className={`${loc === item.key && 'stroke-white'}`} />;

                    case "money":
                      return <MoneyIcon className={`${loc === item.key && 'stroke-white'}`} />;

                    case "building":
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
