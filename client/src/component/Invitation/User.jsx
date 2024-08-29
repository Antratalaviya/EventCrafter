import React, { useEffect, useState } from 'react'
import { img } from '../../assets/assets'
import { SelectIcon } from '../../assets/svg/Icon'
import { capitalize } from "../../utils/customUtility"
import { useSendInvitationMutation } from '../../api/api';
import Spinner from '../Spinner';

function User({ avatar = "abc", name = "name", surname = "surname", id, eventId, sendParticipants }) {
    const [sent, setSent] = useState(false);
    const [sendInvitation, { isLoading, isSuccess }] = useSendInvitationMutation();
    const [isSend, setIsSend] = useState(false)


    const handleSend = async () => {
        try {
            const response = await sendInvitation({ eventId, userId: id })
            if (response.success) {
                setSent((prev) => !prev)
            }
        } catch (error) {
            console.log("send Invitation failer !! ", error)
        }
    }

    useEffect(() => {
        const sendSet = new Set(sendParticipants.map((s) => s._id));
        setIsSend(sendSet.has(id));
    }, [sendParticipants, id]);
    if (!eventId) {
        return <Spinner />
    }
    return (
        <div className='flex items-center justify-between shadow-custom-black'>
            <div className='flex items-center gap-5 w-[70%]'>
                <div className='rounded-full size-16 overflow-hidden'>
                    <img src={img.p4} alt="profile_img" className='h-16 w-24' />
                </div>
                <div className='flex flex-col w-[80%]'>
                    <p className='text-white font-medium'>{`${capitalize(name)} ${capitalize(surname)}`}</p>
                </div>
            </div>

            {isSend ? (
                <div className={`bg-white/10 rounded-md flex items-center gap-2 py-2 px-4`}>
                    <SelectIcon />
                    <p>{`Sent`}</p>
                </div>
            ) : (
                <div className={`bg-white/10 rounded-md flex items-center gap-2 py-2 px-4`} onClick={handleSend}>
                    <div className='w-4 h-4 rounded-full ring-1 ring-white' />
                    <p>{isLoading ? "Loading..." : `Send`}</p>
                </div>
            )}
        </div >
    )
}

export default User