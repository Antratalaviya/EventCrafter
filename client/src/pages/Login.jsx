import React, { useRef, useState } from 'react'
import { EmailIcon, EyeIcon, LockIcon, NamedLogoIcon } from '../assets/svg/Icon'
import Input from '../component/Input'
import Button from '../component/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../api/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [passType, setPassType] = useState('password')
  const { register, handleSubmit } = useForm();
  const [loginUser, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await loginUser({ email: data.email, password: data.password }).unwrap();
      if (response.success) {
        toast.success(response.message)
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className='bg-background h-screen w-screen overflow-y-scroll col-center text-white'>
      <ToastContainer theme="dark" limit={1} />
      <div className='w-1/3 bg-background shadow shadow-gray rounded-2xl p-8 space-y-5'>
        <div className='space-y-5 grid place-items-center'>
          <NamedLogoIcon />
          <h1 className='text-3xl font-bold font-serif'>Sign In</h1>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} id='login' name='login'>
          <div className='w-full space-y-5'>
            <div className='relative w-full'>
              <EmailIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
              <Input
                type={'email'}
                placeholder="Enter Email Address"
                className={'pl-8 flex items-center pr-3 focus:bg-new-card '}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  }
                })}
              />
            </div>
            <div className='relative w-full'>
              <LockIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" />
              <Input
                type={passType}
                placeholder="Enter Passport"
                className={'pl-8 flex items-center pr-3'}
                {...register('password', {
                  required: 'Password is required',
                })}

              >
                <div onClick={() => setPassType((prev) => prev = prev === 'text' ? 'password' : "text")} className='cursor-pointer'>
                  <EyeIcon />
                </div>
              </Input>
            </div>
            <Button
              text={isLoading ? "Loading" : "Sign in"}
            />
          </div>
        </form>
        <div className='flex gap-1'>
          <p className='text-body-text'>Don't have account?</p>
          <Link to={'/sign-up'} className='underline'>
            SignUp
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
