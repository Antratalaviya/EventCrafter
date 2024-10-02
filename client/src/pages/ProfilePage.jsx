import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ArrowIcon, CameraIcon, CompanyIcon, EditIcon, EmailIcon, InstituteIcon, LogoIcon, ShareIcon, UserIcon, CalenderIcon, PostIcon, SchoolIcon, } from '../assets/svg/Icon'
import { img } from '../assets/assets'
import { capitalize } from '../utils/customUtility'
import Input from '../component/Input'
import { useForm } from 'react-hook-form';
import Button from '../component/Button';
import "../index.css"
import { Link } from 'react-router-dom'
import { useUpdateEmailMutation, useUpdateProfileMutation } from '../api/api'
import Modal from "../component/Modal/Modal"
import OtpInput from '../component/Otp/OtpInput'
import Otp from '../component/Otp/Otp'
import { toast } from 'react-toastify'

function ProfilePage() {
    const user = useSelector(state => state.auth.userData)
    const [openEmailModal, setOpenEmailModal] = useState(false);
    const [verify, setVerify] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const [updateEmail, { isLoading: emailChangeLoading }] = useUpdateEmailMutation();
    const [userDetail, setUserDetail] = useState({
        name: user.name,
        surname: user.surname,
        dob: `${new Date(user.dob).getFullYear()}-${new Date(user.dob).getUTCMonth() + 1}-${new Date(user.dob).getUTCDate()}`,
        postcode: user.postcode ? user.postcode : null,
        orgName: user.orgName ? user.orgName : null,
    })


    const handleChange = (e) => {
        setUserDetail({
            ...userDetail, [e.target.name]: e.target.value
        })
    }
    const handleEmailChange = async () => {
        try {
            const result = await updateEmail({ email: email }).unwrap();
            if (result.success) {
                toast.success(result.message)
                setOpenEmailModal(false)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const handleUpdateProfile = async () => {
        try {
            console.log(user)
            const response = await updateProfile({ ...userDetail })
            if (response.success) {
                toast.success(response.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className='grid grid-cols-4 p-5 h-screen'>
            <div className="overflow-hidden text-white bg-black-light col-span-2 rounded-md h-[90%]">
                <div className='flex items-center justify-between p-8 bg-gray relative'>
                    <Link to={'/settings'}>
                        <ArrowIcon />
                    </Link>
                    <p className='text-3xl font-semibold'>Profile</p>
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
            <div className='col-span-2 p-5 text-white flex flex-col items-center space-y-5'>
                <div className='relative gap-5 flex flex-col'>
                    <p className='font-semibold'>Edit Profile</p>
                    <div className='rounded-full overflow-hidden size-20'>
                        <img src={img.p3} alt="User Avatar" />
                    </div>
                    <div className='rounded-full bg-primary p-1 absolute bottom-0 right-1/2 translate-x-12 ring-1 ring-black-light'>
                        <CameraIcon />
                    </div>
                </div>
                <div className='w-full space-y-5'>
                    <Input
                        type={'text'}
                        placeholder={`${capitalize(user.orgType)}`}
                        disabled
                    ></Input>
                    {user.orgType && user.orgType !== 'personal' && (
                        <>
                            <div className='relative w-full'>
                                {user.orgType === 'school' ? <SchoolIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" /> : <CompanyIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
                                }

                                <Input
                                    type={'text'}
                                    placeholder={`Name of ${capitalize(user.orgType)}`}
                                    className={'pl-8'}
                                    name={"orgName"}
                                    value={userDetail.orgName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='relative w-full'>
                                <PostIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
                                <Input
                                    type={'number'}
                                    placeholder={user.postcode}
                                    className={'pl-8 flex justify-evenly items-center appearance-none'}
                                    maxLength={6}
                                    name={"postcode"}
                                    value={userDetail.postcode}
                                    onChange={handleChange}
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
                                name={"name"}
                                value={userDetail.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='relative w-full'>
                            <UserIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
                            <Input
                                type={'text'}
                                placeholder={user.surname}
                                className={'pl-8'}
                                name={"surname"}
                                value={userDetail.surname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='relative w-full'>
                        <CalenderIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
                        <Input
                            type={'text'}
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = 'text'}
                            placeholder={userDetail.dob}
                            className={'pl-8 flex items-center pr-3'}
                            InputClassName={'datepicker-input'}
                            name={"dob"}
                            value={userDetail.dob}
                            onChange={handleChange}
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
                            InputClassName="text-white"
                            disabled
                            onClick={() => setOpenEmailModal(true)}
                        >

                            {!verify ? (
                                <Button
                                    text="Change"
                                    className="h-8 w-20 text-xs row-center"
                                    onClick={() => setOpenEmailModal(true)}
                                />
                            ) :
                                (
                                    <p className='text-green font-semibold'>Verified</p>
                                )}

                        </Input>
                    </div>
                    <Button
                        text={isLoading ? "Loading" : "Save"}
                        onClick={handleUpdateProfile}
                    />
                </div>
            </div>

            <Modal open={openEmailModal} ModalClassName={"space-y-5 col-center text-white"}>
                <div className='text-center space-y-2'>
                    <h2 className='text-2xl font-semibold'>Change Email</h2>
                    <p className='text-body-text text-sm'>Please Enter The Below New Email Address</p>
                </div>
                <Otp
                    email={email}
                    setEmail={setEmail}
                    verify={verify}
                    setVerify={setVerify}
                />
                {verify && (
                    <Button
                        text={emailChangeLoading ? "Loading..." : "Save"}
                        className="w-20 h-8 row-center"
                        onClick={handleEmailChange}
                    />
                )}
            </Modal>
        </div>
    )
}

export default ProfilePage