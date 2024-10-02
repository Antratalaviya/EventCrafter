import React, { useEffect, useState } from 'react'
import { img } from '../../assets/assets'
import { Max } from '../max'
import Button from '../Button'
import { useCurrLocation } from "../../context/useCurrLocation"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetAllNotificationQuery, useGetUserQuery, useReadNotificationMutation } from '../../api/api'
import { useMemo } from 'react'
import { getTime } from '../../utils/customUtility'
import NotificationComponent from '../Notification/NotificationComponent'
import Location from '../Location/Location'
import { toast } from 'react-toastify'

function Header() {
  const [notifications, setNotifications] = useState([]);
  const [isNewMsg, setIsNewMsg] = useState(false);
  const { pageName } = useCurrLocation();
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();
  const { data, isError: userProfileIsError, error: userProfileError } = useGetUserQuery();
  const { data: notification, isSuccess, isLoading } = useGetAllNotificationQuery();
  const [readNotification] = useReadNotificationMutation();

  const time = useMemo(() => {
    return notification?.data.map(d => getTime(d.createdAt));
  }, [notification]);

  useEffect(() => {
    if (isSuccess && notification) {
      setNotifications(notification?.data);
      const isReadLeft = notifications.filter((i) => i.isRead === false)
      if (isReadLeft.length > 0) {
        setIsNewMsg(true)
      }
    }
  }, [isSuccess, notification, data]);

  const handleReadNotification = async () => {
    try {
      const response = await readNotification().unwrap();
      if (response.success) {
        setIsNewMsg(false);
      }
    } catch (error) {
      toast.error(error)
    }
  }

  if (userProfileIsError) {
    toast.error(userProfileError.message);
    location.replace('/sign-in')
  }

  return (
    <div className='bg-black-light grid grid-cols-12 text-white py-4 px-3 border-b border-body-text'>
      <div className='flex col-span-5 items-center gap-5 pl-5'>
        <p className='text-xl'>
          {pageName}
        </p>
        <Location />
      </div>
      <div className='flex col-span-7 justify-end items-center pr-5'>
        <NotificationComponent
          notifications={notifications}
          setNotifications={setNotifications}
          isNewMsg={isNewMsg}
          isLoading={isLoading}
          time={time}
          setIsNewMsg={setIsNewMsg}
          handleReadNotification={handleReadNotification}
        />
        <Max />

        {authStatus ? (
          <div className='grid grid-flow-col gap-2 px-3 py-1 bg-new-card border border-stroke rounded-md'>
            <div className='w-10 h-10 rounded-full overflow-hidden object-contain ring-1 ring-white'>
              <img src={data?.data.avatar} alt="profile" />
            </div>
            <div className='flex flex-col'>
              <p className='text-white text-sm'>{data?.data?.name + " " + data?.data?.surname}</p>
              <p className='text-body-text text-sm'>{data?.data?.email}</p>
            </div>
          </div>
        ) : (
          <Button
            text={'Sign in'}
            onClick={() => navigate('/sign-in')}
            className={`w-32 h-full -translate-y-1`}
          />
        )}
      </div>
    </div>
  )
}

export default Header
