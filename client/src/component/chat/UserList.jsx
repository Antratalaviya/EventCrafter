import React from 'react'
import { useGetRecipient } from '../../context/useGetRecipient'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentRecipient } from '../../store/ChatSlice';
import { capitalize, getMessageTime } from '../../utils/customUtility';

function UserList({ chat }) {
    const onlineUsers = useSelector((state) => state.chat.onlineUsers)
    const user = useSelector((state) => state.auth.userData);
    const recipient = useGetRecipient(chat, user);
    const dispatch = useDispatch();

    return (
        <>
            {recipient && (
                <div className='flex items-center gap-2 relative cursor-pointer hover:bg-white/5 p-2 rounded' onClick={() => dispatch(setCurrentRecipient(recipient))}>
                    {/* <div className='rounded-full h-10 w-11 overflow-hidden relative border border-black-light'>
                        <img src={recipient.avatar} alt="profile_img" className='h-full w-full' />
                    </div> */}
                    <div className='rounded-full h-10 w-11 overflow-hidden relative flex items-center justify-center'>
                        {recipient?.avatar && recipient?.avatar?.includes("https") ? (
                            <img src={recipient.avatar} alt="profile_img" className='h-full w-full' />
                        ) : (
                            <div className='flex items-center justify-center border border-body-text rounded-full size-10'>
                                <p>{capitalize(recipient.name[0]) + capitalize(recipient.surname[0])}</p>
                            </div>
                        )}
                    </div>
                    {
                        onlineUsers.includes(recipient._id.toString()) && (
                            <div className='size-2 ring-4 ring-black-light rounded-full absolute bottom-3 left-8 bg-[#45D700]'>
                            </div>
                        )
                    }
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex flex-col space-y-1'>
                            <h2 className='font-semibold'>{`${recipient.name} ${recipient.surname}`}</h2>
                            <p className='text-body-text text-sm text-ellipsis line-clamp-1'>{`${chat.lastMessage ? chat.lastMessage.sender === user._id ? `You: ${chat.lastMessage.text}` : chat.lastMessage.text : ""}`}</p>
                        </div>
                        <div className='text-xs text-body-text col-center space-y-1'>
                            <p>{`${chat.lastMessage ? getMessageTime(chat.lastMessage.createdAt) : ""}`}</p>
                            {chat.unseen > 0 && (
                                <div className='rounded-full bg-[#45D700] size-4 row-center text-white'>
                                    <p>{chat.unseen}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserList