import React from 'react'
import { NotFoundIcon } from '../assets/svg/Icon'
import Button from '../component/Button'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className='bg-background h-screen w-screen overflow-y-scroll grid place-items-center text-white'>
            <div className='flex justify-around items-center container'>
                <div className='flex flex-col gap-y-5 items-start'>
                    <h1 className='text-5xl font-bold tracking-widest'>404 - Error</h1>
                    <h2 className='text-3xl uppercase font-bold tracking-widest'>Page Not Found</h2>
                    <p>The page you are looking for doesn't exist or an<br /> other error occurred, go back to home page.</p>
                    <Button onClick={() => navigate('/')} text='Back to Home' />
                </div>
                <NotFoundIcon />
            </div>
        </div>
    )
}

export default PageNotFound