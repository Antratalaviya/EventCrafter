import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ArrowIcon, CameraIcon, CompanyIcon, EditIcon, EmailIcon, InstituteIcon, LogoIcon, ShareIcon, UserIcon, CalenderIcon, PostIcon, SchoolIcon, } from '../assets/svg/Icon'
import { img } from '../assets/assets'
import { capitalize } from '../utils/customUtility'
import Input from '../component/Input'
import { useForm } from 'react-hook-form';
import Button from '../component/Button';
import "../index.css"

function ProfilePage() {
    const user = useSelector(state => state.auth.userData)
    const [orgType, setOrgType] = useState((user.orgType));
    const { register, handleSubmit } = useForm();


    const handleRegister = async (data) => {
        try {
            // const response = await regitserUser({
            //     ...data
            // })
            // if (response.success) {
            //     toast.success(response.message)
            //     navigate('/sign-in');
            // }
            console.log(data)
        } catch (error) {
            toast.error(error.data.message)
        }
    }
    return (
        <div className='grid grid-cols-4 p-5 h-screen'>
            <div className="overflow-hidden text-white bg-black-light col-span-2 rounded-md h-[90%]">
                <div className='flex items-center justify-between p-8 bg-gray relative'>
                    <ArrowIcon />
                    <p>Profile</p>
                    <LogoIcon />
                    <div className='rounded-full overflow-hidden ring-8 ring-black-light size-16 cursor-pointer absolute -bottom-12 z-20'>
                        <img src={img.p3} alt="User Avatar" />
                    </div>
                </div>
                <div className='px-3 space-y-5'>
                    <div className='mt-16 rounded-md bg-gray p-3 flex items-start justify-between'>
                        <div>
                            <p className='font-semibold'>{capitalize(`${user.name} ${user.surname}`)}</p>
                            <p className='text-body-text text-sm'>{user.email}</p>
                            <p>{user.orgName ? user.orgName : ""}</p>
                        </div>
                        <div className='rounded-full bg-box p-2'>
                            <EditIcon className="size-4" />
                        </div>
                    </div>
                    <div className='rounded-md bg-gray p-3 space-y-2'>
                        <div className='flex items-start justify-between'>
                            <p className='text-sm'>EventCrafterId Card</p>
                            <div className='rounded-full bg-box p-2'>
                                <ShareIcon className="size-4" />
                            </div>
                        </div>
                        <hr className='text-body-text/30' />
                        <div className='flex gap-3 p-2'>
                            <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                <img src={img.p3} alt="User Avatar" />
                            </div>
                            <div>
                                <p className='font-semibold'>{capitalize(`${user.name} ${user.surname}`)}</p>
                                <p className='text-body-text text-sm font-extralight'>{user.subscriber} Subscribers</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center gap-2'>
                                <EmailIcon fill="white" />
                                <p className='text-xs'>{user.email}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                {user.orgType === "personal" && <>
                                    <UserIcon fill="white" />
                                    <p className='text-xs'>Personal</p>
                                </>}
                                {user.orgType === "institute" && <>
                                    <InstituteIcon fill="white" />
                                    <p className='text-xs'>Institution member</p>
                                </>}
                                {user.orgType === "company" && <>
                                    <CompanyIcon fill="white" />
                                    <p className='text-xs'>Company member</p>
                                </>}
                                {user.orgType === "school" && <>
                                    <SchoolIcon fill="white" />
                                    <p className='text-xs'>School member</p>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='col-span-2 p-5 text-white'>
                <div className='flex flex-col items-center space-y-5'>
                    <div className='relative gap-5 flex flex-col'>
                        <p className='font-semibold'>Edit Profile</p>
                        <div className='rounded-full overflow-hidden size-20'>
                            <img src={img.p3} alt="User Avatar" />
                        </div>
                        <div className='rounded-full bg-primary p-1 absolute bottom-0 right-1/2 translate-x-12 ring-1 ring-black-light'>
                            <CameraIcon />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(handleRegister)} id='updateUser'>
                        <div className='w-full space-y-5'>
                            <Input
                                type={'text'}
                                placeholder={`${capitalize(user.orgType)}`}
                                disabled
                            ></Input>
                            {orgType && orgType !== 'personal' && (
                                <>
                                    <div className='relative w-full'>
                                        {orgType === 'school' ? <SchoolIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" /> : <CompanyIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
                                        }

                                        <Input
                                            type={'text'}
                                            placeholder={`Name of ${orgType[0].toUpperCase() + orgType.slice(1)}`}
                                            className={'pl-8'}
                                            {...register('orgName', {
                                                required: true
                                            })}
                                        />
                                    </div>
                                    <div className='relative w-full'>
                                        <PostIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
                                        <Input
                                            type={'number'}
                                            placeholder={user.postcode}
                                            className={'pl-8 flex justify-evenly items-center appearance-none'}
                                            max={6}
                                            {...register('postcode', {
                                                required: true,
                                            })}
                                        >
                                            <p className='w-1/2'>postcode please</p>
                                        </Input>
                                    </div>
                                </>
                            )}
                            <div className='flex space-x-5'>
                                <div className='relative w-full'>
                                    <UserIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
                                    <Input
                                        type={'text'}
                                        placeholder={user.name}
                                        className={'pl-8'}
                                        {...register('name', {
                                            required: true
                                        })}
                                    />
                                </div>
                                <div className='relative w-full'>
                                    <UserIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
                                    <Input
                                        type={'text'}
                                        placeholder={user.surname}
                                        className={'pl-8'}
                                        {...register('surname', {
                                            required: true
                                        })}
                                    />
                                </div>
                            </div>
                            <div className='relative w-full'>
                                <CalenderIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
                                <Input
                                    type={'text'}
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => e.target.type = 'text'}
                                    placeholder={`${new Date(user.dob).getDate()}/ ${new Date(user.dob).getMonth()}/ ${new Date(user.dob).getFullYear()}`}
                                    className={'pl-8 flex items-center pr-3'}
                                    InputClassName={'datepicker-input'}
                                    {...register('dob', {
                                        required: true
                                    })}
                                >
                                    <CalenderIcon fill="white" />
                                </Input>
                            </div>
                            <div className='relative w-full'>
                                <EmailIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" fill="white" />
                                <Input
                                    type={'email'}
                                    placeholder={user.email}
                                    className={'pl-8 flex items-center pr-3'}
                                    {...register('email', {
                                        required: true,
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                    })}
                                    InputClassName="text-white"
                                >
                                    <Button
                                        text="Change"
                                        className="h-8 w-20 text-xs flex items-center mb-2"
                                    />

                                </Input>
                            </div>
                            <Button
                                // text={isLoading ? "Loading" : "Save"}
                                text={"Save"}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage