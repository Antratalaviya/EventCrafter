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
        <div className='h-[65%] overflow-y-scroll p-10'>
            <div className='grid xl:grid-cols-3 grid-cols-2 gap-10 place-items-center'>
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