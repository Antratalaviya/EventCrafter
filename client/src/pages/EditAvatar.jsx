import React, { useEffect, useState } from 'react'
import { useGetAllAvatarsQuery, useUpdateAvatarMutation } from '../api/api'
import { SelectIcon } from '../assets/svg/Icon';
import { toast } from 'react-toastify';
import Button from '../component/Button';

function EditAvatar() {
    const { data, isSuccess } = useGetAllAvatarsQuery();
    const [avatars, setAvatars] = useState([]);
    const [avatarSelected, setAvatarSelected] = useState();
    const [editAvatar] = useUpdateAvatarMutation();

    useEffect(() => {
        if (isSuccess) {
            setAvatars(data?.data)
        }
    }, [data])

    const handleUpdate = async () => {
        try {
            console.log(avatars[avatarSelected % 15].url)
            const result = await editAvatar({ avatar: avatars[avatarSelected % 15].url }).unwrap();
            if (result.success) {
                toast.success(result.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <div className='overflow-y-scroll p-10 h-[91vh]'>
            <div className='grid xl:grid-cols-4 grid-cols-2 gap-10 place-items-center'>
                {avatars && avatars.map((item, i) => (
                    <div key={item._id} className={`col-span-1 rounded-md overflow-hidden cursor-pointer relative`} onClick={() => avatarSelected !== i ? setAvatarSelected(i) : setAvatarSelected(null)}>
                        {avatarSelected === i && (
                            <div className='bg-white/25 absolute h-full w-full top-0 left-0 grid place-items-center'>
                                <SelectIcon />
                            </div>
                        )}
                        <img src={item.url} alt={`avatar_${item._id}`} className='' />
                    </div>
                ))}

                {avatars && avatars.map((item, i) => (
                    <div key={item._id} className={`col-span-1 rounded-md overflow-hidden cursor-pointer relative`} onClick={() => avatarSelected !== i + 15 ? setAvatarSelected(i + 15) : setAvatarSelected(null)}>
                        {avatarSelected === i + 15 && (
                            <div className='bg-white/25 absolute h-full w-full top-0 left-0 grid place-items-center'>
                                <SelectIcon />
                            </div>
                        )}
                        <img src={item.url} alt={`avatar_${item._id}`} className='' />
                    </div>
                ))}
                <div className='fixed bottom-10 mx-auto'>
                    <Button
                        text="Update"
                        className="text-white px-8"
                        onClick={handleUpdate}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditAvatar