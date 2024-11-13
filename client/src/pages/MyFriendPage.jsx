import React, { useEffect, useState } from 'react'
import { useGetAllFriendsQuery } from '../api/api'
import { toast } from 'react-toastify';
import { img } from '../assets/assets';

function MyFriendPage() {
    const { data, isSuccess, error } = useGetAllFriendsQuery();
    const [friends, setFriends] = useState();

    useEffect(() => {
        if (isSuccess) {
            setFriends(data.data)
        } else {
            toast.error(error)
        }
    }, [data])
    return (
        <>
            <div className='h-screen text-white'>
                <div className='grid xl:grid-cols-2 grid-cols-1 gap-10'>
                    {friends && friends.map((item, i) => (
                        <div className='bg-black-light p-5 rounded-md space-y-2' key={item._id}>
                            <div className='flex items-center gap-2'>
                                <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                    <img src={img.p3} alt="User Avatar" />
                                </div>
                                <p>{`${item.name} ${item.surname}`}</p>
                            </div>
                        </div>
                    ))}
                    <div className='bg-black-light p-5 rounded-md space-y-2'>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                <img src={img.p3} alt="User Avatar" />
                            </div>
                            <p>Dianne Russell</p>
                        </div>
                    </div>
                    <div className='bg-black-light p-5 rounded-md space-y-2'>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                <img src={img.p3} alt="User Avatar" />
                            </div>
                            <p>Dianne Russell</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MyFriendPage