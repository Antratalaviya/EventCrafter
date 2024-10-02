import React, { useState } from 'react'
import Button from '../Button';
import OtpInput from './OtpInput';
import Input from '../Input';
import { useSendOtpMutation, useVerifyOtpMutation } from '../../api/api';
import { toast } from 'react-toastify';
import { EmailIcon } from '../../assets/svg/Icon';

function Otp({ email, setEmail, verify, setVerify }) {
    const [otpValue, setOtpValue] = useState('');
    const [openOtpBox, setOpenOtpBox] = useState(false);
    const [generateOtp, { isSuccess }] = useSendOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();


    const handleGenerateOtp = async () => {
        try {
            console.log(email)
            const result = await generateOtp({ email: email }).unwrap();
            if (result.success) {
                setOpenOtpBox(true)
                console.log(result.data)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const handleVerify = async () => {
        try {
            console.log(email)
            const result = await verifyOtp({ otp: otpValue, email: email }).unwrap();
            if (result.success) {
                setVerify(true);
                setOpenOtpBox(false);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };

    return (
        <div className='space-y-5 text-white'>
            <div className='relative w-full'>
                <EmailIcon className="absolute top-1/2 left-2 transform -translate-y-1/2" fill="white" />
                <Input
                    type={'email'}
                    placeholder={email ? email : "Your Email"}
                    className={'pl-8 flex items-center pr-3'}
                    InputClassName="text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                    {verify ? (
                        <p className='text-green font-semibold'>Verified</p>
                    ) : isSuccess ? (<Button
                        text="Resend"
                        className="w-24 h-8 text-sm row-center"
                        onClick={handleGenerateOtp}
                    />) :
                        (
                            <Button
                                text="verify"
                                className="w-20 h-8 row-center"
                                onClick={handleGenerateOtp}
                            />
                        )}
                </Input>
            </div>
            {openOtpBox && (
                <div className='col-center space-y-5'>
                    <div className='text-center space-y-2'>
                        <h2 className='text-2xl font-semibold'>Enter Verification code</h2>
                        <p className='text-body-text text-sm'>Please check your Email for the 4 digit OTP code and enter it below</p>
                    </div>
                    <OtpInput onOtpChange={handleOtpChange} />
                    <Button
                        text="Send"
                        className="w-20 h-8 row-center"
                        onClick={handleVerify}
                    />
                </div>
            )}
        </div>
    )
}

export default Otp