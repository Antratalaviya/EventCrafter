import React, { useEffect, useRef, useState } from 'react'
import { img } from '../../assets/assets'
import { AddCircleIcon, ArchiveIcon, ArrowIcon, ChannelIcon, ChatIcon, DownIcon, EmojiIcon, GroupIcon, LikeIcon, LinkIcon, LogoIcon, MsgIcon, SearchIcon, SendMsgIcon, UserAddIcon } from '../../assets/svg/Icon'
import Input from '../../component/Input';
import { useGetAllUserQuery, useGetMessageQuery, useGetUserChatsQuery } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import UserList from '../../component/chat/UserList';
import UserChat from '../../component/chat/UserChat';
import Message from '../../component/chat/Message';
import MessageFooter from '../../component/chat/MessageFooter';


function ChatPage() {
    const [filter, setFilter] = useState("single");
    const [userChats, setUserChats] = useState([]);
    const socketConnection = useSelector((state) => state.chat.socketConnection)
    const user = useSelector((state) => state.auth.userData)

    const handleChange = (e) => {
        setFilter(e.target.value);
    };

    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit("getConversations", (user._id))
            socketConnection.on("conversations", (data) => {
                setUserChats(data)
            })
        }
    }, [])

    return (
        <div className='h-screen overflow-hidden p-5 text-white'>
            <div className='container-style h-full w-full flex rounded-2xl overflow-hidden'>
                <div className='w-1/2 bg-[#161C23] h-full pt-5 flex flex-col space-y-2 overflow-y-auto'>
                    <div className='flex items-center justify-between px-5 py-3 flex-grow-0'>
                        <div className='flex items-center'>
                            <LogoIcon />
                            <h1 className='font-semibold text-xl gap-2'>Chatpit</h1>
                        </div>
                        <div className='flex items-center gap-5'>
                            <SearchIcon />
                            <UserAddIcon />
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-1 flex-wrap'>
                        <label htmlFor="type5" className='cursor-pointer relative inline-flex items-center' >
                            <input type="radio" name="type" id="type5" value="single" onChange={handleChange} className='sr-only peer h-full w-full' checked={filter === 'single'} />
                            <div className={`peer-checked:border-public peer-checked:text-white text-body-text rounded-xl bg-[#1E242A] px-2 xl:px-4 py-1 text-sm border border-transperent`}>
                                <div className='flex flex-col items-center justify-center py-2 space-y-1'>
                                    <ChatIcon />
                                    <p>Single</p>
                                </div>
                            </div>
                        </label>
                        <label htmlFor="type1" className='cursor-pointer relative inline-flex items-center' >
                            <input type="radio" name="type" id="type1" value="group" onChange={handleChange} className='sr-only peer h-full w-full' checked={filter === 'group'} />
                            <div className={`peer-checked:border-workshop peer-checked:text-white text-body-text rounded-xl bg-[#1E242A] px-2 xl:px-4 py-1 text-sm border border-transperent`}>
                                <div className='flex flex-col items-center justify-center py-2 space-y-1'>
                                    <GroupIcon />
                                    <p>Group</p>
                                </div>
                            </div>
                        </label>
                        <label htmlFor="type2" className='cursor-pointer relative inline-flex items-center' >
                            <input type="radio" name="type" id="type2" value='favorite' onChange={handleChange} className='sr-only peer h-full w-full' checked={filter === 'favorite'} />
                            <div className={`peer-checked:border-red peer-checked:text-white text-body-text rounded-xl bg-[#1E242A] px-2 xl:px-4 py-1 text-sm border border-transperent`}>
                                <div className='flex flex-col items-center justify-center py-2 space-y-1'>
                                    <LikeIcon className="fill-red stroke-red" />
                                    <p>Favorite</p>
                                </div>
                            </div>
                        </label>
                        <label htmlFor="type3" className='cursor-pointer relative inline-flex items-center' >
                            <input type="radio" name="type" id="type3" value='channel' onChange={handleChange} className='sr-only peer h-full w-full' checked={filter === 'channel'} />
                            <div className={`peer-checked:border-primary peer-checked:text-white text-body-text rounded-xl bg-[#1E242A] px-2 xl:px-4 py-1 text-sm border border-transperent`}>
                                <div className='flex flex-col items-center justify-center py-2 space-y-1'>
                                    <ChannelIcon />
                                    <p>Channel</p>
                                </div>
                            </div>
                        </label>
                        <label htmlFor="type4" className='cursor-pointer relative inline-flex items-center' >
                            <input type="radio" name="type" id="type4" value='archive' onChange={handleChange} className='sr-only peer h-full w-full' checked={filter === 'archive'} />
                            <div className={`peer-checked:border-ticket peer-checked:text-white text-body-text rounded-xl bg-[#1E242A] px-2 xl:px-4 py-1 text-sm border border-transperent`}>
                                <div className='flex flex-col items-center justify-center py-2 space-y-1'>
                                    <ArchiveIcon />
                                    <p>Archive</p>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div>
                        <p className='mx-5 font-semibold'>Moments</p>
                        <UserChat />
                    </div>
                    <div className='space-y-5'>
                        <p className='mx-5 font-semibold'>Recent Chat</p>
                        <div className='flex flex-col flex-grow space-y-3 overflow-y-scroll h-full px-5'>
                            {userChats.length > 0 && userChats.map(chat => (
                                <UserList chat={chat} key={chat._id} />
                            ))}
                            {
                                !userChats || userChats.length === 0 && (
                                    <div className='flex items-center justify-center h-full'>
                                        <p>No Recent Chat</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='h-full relative flex flex-col w-full'>
                    <Message />
                </div>
            </div>
        </div>
    )
}

export default ChatPage