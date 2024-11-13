import React, { useEffect, useRef, useState } from 'react'
import { useCreateChatMutation, useGetAllUserQuery } from '../../api/api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentRecipient } from '../../store/ChatSlice';
import { capitalize } from '../../utils/customUtility';

function UserChat() {
    const [users, setUsers] = useState([]);
    const scrollContainerRef = useRef(null);

    const onlineUsers = useSelector((state) => state.chat.onlineUsers)
    const user = useSelector((state) => state.auth.userData);

    const dispatch = useDispatch();

    const { data: usersData, isSuccess } = useGetAllUserQuery("");
    const [createUserChat] = useCreateChatMutation();


    const handleCurrentUser = async (user) => {
        dispatch(setCurrentRecipient(user))
    }

    const handleScroll = (e) => {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
    }

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("wheel", handleScroll);
        }
        return () => scrollContainer.removeEventListener('wheel', handleScroll);
    }, [])

    useEffect(() => {
        if (isSuccess) {
            setUsers(usersData.data.filter((u) => u._id !== user._id))
        }
    }, [usersData])

    return (
        <div
            className='flex justify-start mx-auto items-center flex-shrink-0 w-[90%] gap-2 px-3 xl:py-3 overflow-x-scroll userScrollBarHorizontal cursor-pointer'
            ref={scrollContainerRef}
        >
            {users && users.map((u) => (
                <div className='flex flex-col items-center gap-1 relative' key={u._id} onClick={() => dispatch(setCurrentRecipient(u))}>
                    {/* <div className='rounded-full flex-shrink-0 overflow-hidden border border-public border-dashed size-14'>
                        <img src={u.avatar} alt="User Avatar" />
                    </div> */}
                    <div className='rounded-full flex-shrink overflow-hidden border border-public border-dashed size-10 xl:size-14 flex items-center justify-center'>
                        {u?.avatar && u?.avatar?.includes("https") ? (
                            <img src={u.avatar} alt="User Avatar" />
                        ) : (
                            <div>
                                <p>{capitalize(u.name[0]) + capitalize(u.surname[0])}</p>
                            </div>
                        )}
                    </div>
                    <p className='md:text-xs text-sm font-extralight'>{u.name}</p>
                    {
                        onlineUsers.includes(u._id.toString()) && (
                            <div className='size-2 rounded-full bg-[#45D700] absolute bottom-6 right-2'>
                            </div>
                        )
                    }
                </div>
            ))}
            {users && users.map((u) => (
                <div className='flex flex-col items-center gap-1' key={u._id + 1}>
                    <div className='rounded-full flex-shrink overflow-hidden border border-public border-dashed size-10 xl:size-14 flex items-center justify-center'>
                        {u?.avatar && u?.avatar?.includes("https") ? (
                            <img src={u.avatar} alt="User Avatar" />
                        ) : (
                            <div>
                                <p>{capitalize(u.name[0]) + capitalize(u.surname[0])}</p>
                            </div>
                        )}
                    </div>
                    <p className='md:text-xs text-sm font-extralight'>{u.name}</p>
                </div>
            ))}
        </div>

    )
}

export default UserChat