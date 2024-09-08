import React, { useEffect, useState } from 'react'
import { useGetAllAvatarsQuery } from '../api/api'

function EditAvatar() {
    const { data, isSuccess } = useGetAllAvatarsQuery();
    const [avatars, setAvatars] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            setAvatars(data?.data)
        }
    }, [data])
    return (
        <div className='h-screen overflow-y-scroll'>
            <div className='grid grid-cols-3 gap-10 p-10 place-items-center'>
                {avatars && avatars.map((item) => (
                    <div key={item._id} className='col-span-1 rounded-md overflow-hidden'>
                        <img src={item.url} alt={`avatar_${item._id}`} className='' />
                    </div>
                ))}
                {avatars && avatars.map((item) => (
                    <div key={`${item._id}`} className='col-span-1 rounded-md overflow-hidden'>
                        <img src={item.url} alt={`avatar_${item._id}`} className='' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EditAvatar