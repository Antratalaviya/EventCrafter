import React, { useEffect, useRef, useState } from 'react'
import { img } from '../../assets/assets'
import { ArrowIcon, DownIcon, LogoIcon, NotFoundIcon, SentIcon } from '../../assets/svg/Icon'
import { useDispatch, useSelector } from 'react-redux';
import { useGetMessageQuery } from '../../api/api';
import { capitalize, getOnlyTime } from '../../utils/customUtility';
import { useGetRecipient } from '../../context/useGetRecipient';
import MessageFooter from './MessageFooter';

function Message() {
    const [messages, setMessages] = useState([]);
    const [profileOpen, setProfileOpen] = useState(false);
    const currentMessage = useRef(null);

    const user = useSelector((state) => state.auth.userData);
    const recipient = useSelector((state) => state.chat.currentRecipient);
    const socketConnection = useSelector((state) => state.chat.socketConnection);

    useEffect(() => {
        if (socketConnection && recipient) {
            setMessages([])
            // Emit "getMessage" when the recipient changes or when the socket connects
            socketConnection.emit("getMessage", {
                sender: user._id,
                receiver: recipient._id,
            });

            // Listen for incoming messages and only update state if the messages belong to the active recipient
            socketConnection.on("message", (data) => {
                // if (data && data[0]?.sender === recipient._id) {
                setMessages(data);
                // }
            });

            return () => {
                // Cleanup: remove the listener to avoid multiple listeners
                socketConnection.off("message");
            };
        }
    }, [socketConnection, recipient]);

    useEffect(() => {
        if (recipient && messages?.length > 0 && socketConnection) {
            const lastMessage = messages[messages.length - 1];

            // Emit "seen" only if the last message is from the current recipient
            if (recipient._id === lastMessage.sender) {
                socketConnection.emit("seen", recipient._id);
            }
        }
    }, [messages, socketConnection, recipient]);




    useEffect(() => {
        if (currentMessage?.current) {
            // currentMessage.current.scrollIntoView({ behavior: "smooth", block: "end" });
            const scrollContainer = currentMessage.current.parentNode;

            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight - scrollContainer.clientHeight + 20, // adjust 20px padding
                behavior: "smooth"
            });
        }
    }, [messages]);

    if (!recipient) {
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <NotFoundIcon />
                <h1 className='text-xl'>No Chat Selected</h1>
            </div>
        )
    }

    return (
        <div className='flex flex-grow'>
            <div className='flex flex-grow flex-col'>
                <div className='bg-[#161C23]/85 flex items-center gap-5 p-3 xl:p-5'>
                    <ArrowIcon />
                    <div className='rounded-full overflow-hidden size-10' onClick={() => setProfileOpen(!profileOpen)}>
                        {recipient?.avatar && recipient?.avatar?.includes("https") ? (
                            <img src={recipient.avatar} alt="User Avatar" />
                        ) : (
                            <div className='flex items-center justify-center border border-body-text rounded-full size-10'>
                                <p>{capitalize(recipient.name[0]) + capitalize(recipient.surname[0])}</p>
                            </div>
                        )}
                    </div>
                    <p>{`${recipient.name} ${recipient.surname}`}</p>
                </div>
                <div className={`h-[55vh] flex flex-col flex-grow bg-white/5 p-5 space-y-5 overflow-y-scroll`}>
                    <div className='rounded-full text-center mx-auto px-5 py-1 bg-white/5 text-sm'>
                        <p>Today</p>
                    </div>
                    {messages && (messages[0]?.sender === recipient._id || messages[0]?.sender === user._id) && messages.map((msg, index) => {
                        const isLastMessage = index === messages.length - 1;
                        return (
                            <div
                                className={`flex items-center gap-2 group`}
                                key={msg._id}
                                ref={isLastMessage ? currentMessage : null}  // Only attach ref to the last message
                            >
                                {msg.sender !== user._id && (
                                    <div className='rounded-full size-10 overflow-hidden'>
                                        <img src={recipient.avatar} alt="profile_img" className='h-full w-full' />
                                    </div>
                                )}
                                <div className={`flex gap-2 items-center ${msg.sender === user._id ? 'bg-primary rounded-bl-xl pl-7 ml-auto' : 'bg-[#1B2027] rounded-br-xl pr-7'} max-w-[70%] px-3 py-1 rounded-t-xl relative`}>
                                    <p className='text-sm'>{msg.text}</p>
                                    <div className='pt-3 text-xs text-body-text flex gap-1'>
                                        <span >{getOnlyTime(msg.createdAt)}</span>
                                        <span className={`${msg.sender === user._id ? "flex" : "hidden"}`}><SentIcon stroke={`${msg.seen === false ? "#9697a1" : "#25D637"}`} /></span>
                                    </div>
                                    <div className={`hidden group-hover:flex absolute top-1  ${msg.sender === user._id ? "left-2" : "right-2"}`}>
                                        <DownIcon className="size-5" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <MessageFooter />
            </div>
            {profileOpen && (
                <div className='w-1/3 flex flex-col items-center'>
                    <div className='bg-[#161C23]/85 flex items-center w-full gap-5 p-5'>
                        <div onClick={() => setProfileOpen(false)} >
                            <ArrowIcon />
                        </div>
                        <p className='mx-auto'>User Detail</p>
                    </div>
                    <div className='space-y-5 p-5'>
                        <div className='rounded-full overflow-hidden size-20'>
                            <img src={recipient.avatar} alt="User Avatar" />
                        </div>
                        <h2 className='font-semibold'>{`${recipient.name} ${recipient.surname}`}</h2>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Message