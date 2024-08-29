import React, { useEffect, useState } from 'react'
import { useGetAllSendParticipantsQuery, useGetAllUserQuery } from '../../api/api';
import { AddCircleIcon, InviteIcon, LinkIcon, SearchIcon, SelectIcon, SuccessIcon, TimeIcon } from '../../assets/svg/Icon';
import Input from '../Input';
import Button from '../Button';
import { img } from "../../assets/assets"
import User from './User';
import { useDebounce } from '../../context/useDebounce';
import Modal from '../Modal/Modal';
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../Spinner';
import { capitalize } from '../../utils/customUtility';

function Invitation({ eventId }) {
    const [addParticipate, setAddParticipate] = useState(false);
    const [openParticipate, setOpenParticipate] = useState(false);
    const [sendParticipants, setSendParticipants] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [keyword, setKeyword] = useState("")
    const [debouncedKeyword] = useDebounce(keyword, 500);
    const navigate = useNavigate()
    const { data: users } = useGetAllUserQuery(
        { keyword: debouncedKeyword }, {
        skip: !addParticipate
    })
    const { data: sendParticipant, isSuccess } = useGetAllSendParticipantsQuery(eventId, {
        skip: !addParticipate
    })


    if (!eventId) {
        return <Spinner />
    }

    useEffect(() => {
        if (isSuccess) {
            setSendParticipants(sendParticipant.data)
        }
    }, [sendParticipant])
    return (
        <>
            <div className='w-full text-white p-5 space-y-5'>
                <div className='flex items-center justify-between gap-5'>
                    <h1 className='text-3xl font-semibold'>Send Invitation</h1>
                    <Button
                        text="Skip"
                        className="w-32"
                        onClick={() => setOpenCreate(true)}
                    />
                </div>
                <div className='flex gap-5'>
                    <div className={`bg-[#252A30] rounded-lg ring-1 ring-gray col-span-1 w-full flex items-center pr-5 cursor-pointer`} onClick={() => setAddParticipate(false)}>
                        <div className={'bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'}>
                            <p>Invite to event via link</p>
                        </div>
                        <LinkIcon />
                    </div>
                    <div className={`bg-[#252A30] rounded-lg ring-1 ring-gray col-span-1 w-full flex items-center pr-5 cursor-pointer`} onClick={() => { setAddParticipate(true); setOpenParticipate(false) }}>
                        <div className={'bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'}>
                            <p>Add Participants</p>
                        </div>
                        <InviteIcon />
                    </div>
                </div>

                {addParticipate &&
                    <div className='flex flex-col gap-5 w-full rounded-lg bg-black-light p-5' >
                        <Input
                            placeholder="Search User"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            name="keyword"
                            autoComplete="off"
                            className=" border border-gray ring-transperent w-2/4 rounded-full flex items-center pr-5 pl-3"
                        >
                            <SearchIcon />
                        </Input>
                        <div className='flex flex-col justify-start space-y-5'>
                            {users?.data.map((user) => (
                                <User
                                    key={user._id}
                                    name={user.name}
                                    surname={user.surname}
                                    avatar={user.avatar}
                                    id={user._id}
                                    eventId={eventId}
                                    sendParticipants={sendParticipants}
                                />
                            ))}
                        </div>
                        <Button
                            text="Done"
                            onClick={() => { setAddParticipate(false); setOpenParticipate(true); }}
                            className="cursor-pointer"
                        />
                    </div>
                }
                {openParticipate &&
                    <div className='flex flex-col gap-5 w-full rounded-lg bg-black-light p-5' >
                        <h1>Participate Members</h1>
                        <div className='flex gap-5 items-center'>
                            <div className='bg-public rounded-md flex items-center gap-2 py-2 px-4'>
                                <SelectIcon />
                                <p>{`Accepted (14)`}</p>
                            </div>
                            <div className='bg-red rounded-md flex items-center gap-2 py-2 px-4'>
                                <AddCircleIcon className="rotate-45 fill-white stroke-red" />
                                <p>{`Rejected (14)`}</p>
                            </div>
                            <div className='bg-yellow rounded-md flex items-center gap-2 px-4 p-2'>
                                <TimeIcon />
                                <p>{`Pending (14) `}</p>
                            </div>
                        </div>
                        <div className='flex flex-col justify-start space-y-5'>
                            {sendParticipants && sendParticipants.map((item) => (
                                <div key={item._id} className='flex items-center justify-between rounded-md shadow-custom-black px-3 py-1'>
                                    <div className='flex items-center gap-5 w-[70%]'>
                                        <div className='rounded-full size-16 overflow-hidden'>
                                            <img src={img.p3} alt="profile_img" className='h-16 w-24' />
                                        </div>
                                        <div className='flex flex-col w-[80%]'>
                                            <p className='text-white font-medium'>{`${capitalize(item.name)} ${capitalize(item.surname)}`} </p>
                                        </div>
                                    </div>
                                    {item.status === 'pending' && (
                                        <div className='bg-yellow/10 rounded-md flex items-center gap-2 py-2 px-6 text-yellow'>
                                            <TimeIcon className="stroke-yellow" />
                                            <p>{`Pending`}</p>
                                        </div>
                                    )}
                                    {item.status === 'accepted' && (
                                        <div className='bg-public/10 rounded-md flex items-center gap-2 py-2 px-5 text-public'>
                                            <SelectIcon fill="#25d695" />
                                            <p>{`Accepted`}</p>
                                        </div>
                                    )}
                                    {item.status === 'rejected' && (
                                        <div className='bg-red/10 rounded-md flex items-center gap-2 py-2 px-5 text-red'>
                                            <AddCircleIcon className="rotate-45 fill-red stroke-black-light" />
                                            <p>{`Rejected`}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className='flex items-center justify-between rounded-md shadow-custom-black px-3 py-1'>
                                <div className='flex items-center gap-5 w-[70%]'>
                                    <div className='rounded-full size-16 overflow-hidden'>
                                        <img src={img.p3} alt="profile_img" className='h-16 w-24' />
                                    </div>
                                    <div className='flex flex-col w-[80%]'>
                                        <p className='text-white font-medium'>Clara Tolson </p>
                                    </div>
                                </div>
                                <div className='bg-public/10 rounded-md flex items-center gap-2 py-2 px-5 text-public'>
                                    <SelectIcon fill="#25d695" />
                                    <p>{`Accepted`}</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between rounded-md shadow-custom-black px-3 py-1'>
                                <div className='flex items-center gap-5 w-[70%]'>
                                    <div className='rounded-full size-16 overflow-hidden'>
                                        <img src={img.p2} alt="profile_img" className='h-16 w-24' />
                                    </div>
                                    <div className='flex flex-col w-[80%]'>
                                        <p className='text-white font-medium'>Clara Tolson </p>
                                    </div>
                                </div>
                                <div className='bg-yellow/10 rounded-md flex items-center gap-2 py-2 px-6 text-yellow'>
                                    <TimeIcon className="stroke-yellow" />
                                    <p>{`Pending`}</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between rounded-md shadow-custom-black px-3 py-1'>
                                <div className='flex items-center gap-5 w-[70%]'>
                                    <div className='rounded-full size-16 overflow-hidden'>
                                        <img src={img.p4} alt="profile_img" className='h-16 w-24' />
                                    </div>
                                    <div className='flex flex-col w-[80%]'>
                                        <p className='text-white font-medium'>Clara Tolson </p>
                                    </div>
                                </div>
                                <div className='bg-red/10 rounded-md flex items-center gap-2 py-2 px-5 text-red'>
                                    <AddCircleIcon className="rotate-45 fill-red stroke-black-light" />
                                    <p>{`Rejected`}</p>
                                </div>
                            </div>
                        </div>
                    </div>}
                {openParticipate && <div className="mt-4 ml-auto w-1/5 gap-2 flex">
                    <Button
                        onEvent={() => navigate(-1)}
                        className="bg-dark"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => setOpenCreate(true)}
                    >
                        Next
                    </Button>
                </div>}
            </div>

            <Modal open={openCreate}>
                <div className='text-white text-center flex flex-col items-center'>
                    {/* <img src={img.done} alt="done" className='w-4/5 h-3/5' /> */}
                    <SuccessIcon />
                    <div className='flex flex-col items-center gap-3'>
                        <h1 className='text-3xl'>Successfully</h1>
                        <p className='text-body-text'>Your event event has been successfully Edited</p>
                        <Link to={`/event/${eventId}`} className='w-full'>
                            <Button
                                text='Done'
                                className="h-14"
                                onClick={() => setOpenCreate(false)}
                            />
                        </Link>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Invitation