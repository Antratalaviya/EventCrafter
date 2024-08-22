import React, { useEffect, useRef, useState } from 'react'
import { CalenderIcon, CompanyIcon, EmailIcon, EyeIcon, InstituteIcon, LockIcon, NamedLogoIcon, PostIcon, SchoolIcon, UserIcon } from '../assets/svg/Icon';
import Input from '../component/Input';
import "../index.css"
import Button from '../component/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authService from '../api/auth';

function SignUp() {
    const [passType, setPassType] = useState('password');
    const [currPassType, setCurrPassType] = useState('password');
    const [errors, setErrors] = useState('');
    const [orgType, setOrgType] = useState();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();


    useEffect(() => {
        const fetch = async () => {
            // let item = await authService.register({ email: 'tre@trddg.com', name: 'abc', dob: "2024-06-14", orgType: "school", password: "abc", surname: "abc" });
            // let item = await authService.login({email: 'tre@trddg.com',password: "abc"})
            // console.log(item.data.data.accessToken)
        }
        fetch();
        // console.log(orgType)
    }, [orgType])


    const handleRegister = (data) => {
        console.log(data)
        navigate('/sign-in');
    }


    return (
        <div className='bg-background h-screen w-screen overflow-y-scroll grid place-items-center text-white'>
            <div className='w-1/3 bg-background shadow shadow-gray rounded-2xl p-8 space-y-5'>
                <div className='space-y-5 grid place-items-center'>
                    <NamedLogoIcon />
                    <h1 className='text-3xl font-bold font-serif'>Sign up</h1>
                </div>
                <form onSubmit={handleSubmit(handleRegister)}>
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
                                        max={6}
                                        {...register('postcode', {
                                            required: true,
                                            // pattern: /^\d{1,6}$/
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
                        <div className='relative w-full'>
                            <EmailIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
                            <Input
                                type={'email'}
                                placeholder="Your Email Address"
                                className={'pl-8 flex items-center pr-3'}
                                {...register('email', {
                                    required: true,
                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                })}
                            />
                        </div>
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
                        <Button onSubmit={() => disabled}
                            text='Sign up'
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
