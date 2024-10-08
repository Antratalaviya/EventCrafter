import React, { useEffect, useRef, useState } from 'react'
import { CalenderIcon, CompanyIcon, EmailIcon, EyeIcon, InstituteIcon, LockIcon, NamedLogoIcon, PostIcon, SchoolIcon, UserIcon } from '../assets/svg/Icon';
import Input from '../component/Input';
import "../index.css"
import Button from '../component/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Otp from '../component/Otp/Otp';

function SignUp() {
    const [passType, setPassType] = useState('password');
    const [currPassType, setCurrPassType] = useState('password');
    const [verify, setVerify] = useState(false);
    const [email, setEmail] = useState("");
    const [orgType, setOrgType] = useState();
    const { register, handleSubmit, watch } = useForm();
    const navigate = useNavigate();
    const [regitserUser, { isLoading }] = useRegisterMutation();

    const handleRegister = async (data) => {
        try {
            if (verify) {
                const response = await regitserUser({
                    ...data, email
                })
                if (response.success) {
                    toast.success(response.message)
                    navigate('/sign-in');
                }
            } else {
                toast.error("verify email first")
            }
        } catch (error) {
            toast.error(error.data.message)
        }
    }


    return (
        <div className='bg-background h-screen w-screen overflow-y-scroll col-center text-white'>
            <ToastContainer theme="dark" limit={1} />
            <div className='w-1/3 bg-background shadow shadow-gray rounded-2xl p-8 space-y-5'>
                <div className='space-y-5 grid place-items-center'>
                    <NamedLogoIcon />
                    <h1 className='text-3xl font-bold font-serif'>Sign up</h1>
                </div>
                <form onSubmit={handleSubmit(handleRegister)} id='signup' name='signup'>
                    <div className='w-full space-y-5'>
                        <div className='w-full bg-[#252A30] rounded-lg ring-1 ring-gray relative'>
                            <select
                                defaultValue={'personal'}
                                value={orgType}
                                className='border-transperent bg-transperent cursor-pointer focus:outline-none w-[95%] text-body-text rounded p-3 text-sm'

                                onChange={(e) => setOrgType(e.target.value)}
                                {...register('orgType', {
                                    required: true,
                                    onChange: (e) => setOrgType(e.target.value)
                                })}
                            >
                                <option value="personal">Personal</option>
                                <option value="institution">Institution</option>
                                <option value="company">Company</option>
                                <option value="school">School</option>
                            </select>
                        </div>
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
                                        placeholder="******"
                                        className={'pl-8 flex justify-evenly items-center appearance-none'}
                                        maxLength={6}
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
                                    placeholder="Your Name"
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
                                    placeholder="Your Surname"
                                    className={'pl-8'}
                                    {...register('surname', {
                                        required: true
                                    })}
                                />
                            </div>
                        </div>
                        <div className='relative w-full'>
                            <CalenderIcon className="absolute top-1/2 left-2 transform -translate-y-1/2 stroke-body-text" />
                            <Input
                                type={'text'}
                                onFocus={(e) => e.target.type = 'date'}
                                onBlur={(e) => e.target.type = 'text'}
                                placeholder="Date Of Birthday"
                                className={'pl-8 flex items-center pr-3'}
                                InputClassName={'datepicker-input'}
                                {...register('dob', {
                                    required: true
                                })}
                            >
                                <CalenderIcon />
                            </Input>
                        </div>
                        <Otp
                            email={email}
                            setEmail={setEmail}
                            verify={verify}
                            setVerify={setVerify}
                        />
                        <div className='relative w-full'>
                            <LockIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
                            <Input
                                type={passType}
                                placeholder=" Create Passport"
                                className={'pl-8 flex items-center pr-3'}
                                {...register('password', {
                                    required: true
                                })}

                            >
                                <div onClick={() => setPassType((prev) => prev = prev === 'text' ? 'password' : "text")} className='cursor-pointer'>
                                    <EyeIcon />
                                </div>
                            </Input>
                        </div>
                        <div className='relative w-full'>
                            <LockIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
                            <Input
                                type={currPassType}
                                placeholder=" Confirm Passport"
                                className={'pl-8 flex items-center pr-3'}
                                {...register('confirmPassword', {
                                    required: true
                                })}
                            >
                                <div onClick={() => setCurrPassType((prev) => prev = prev === 'text' ? 'password' : "text")} className='cursor-pointer'>
                                    <EyeIcon />
                                </div>
                            </Input>
                        </div>
                        <p className='text-body-text'>By creating an account, you agree our <span className='text-white'>terms of Service</span> and <span className='text-white'>privacy policy</span></p>
                        <Button
                            text={isLoading ? "Loading" : "Sign Up"}
                        />
                    </div>

                </form>
                <div className='flex gap-1'>
                    <p className='text-body-text'>Already have account?</p>
                    <Link to={'/sign-in'} className='underline'>
                        SignIn
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
