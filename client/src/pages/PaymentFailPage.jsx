import React from 'react'
import Modal from '../component/Modal/Modal'
import { Link } from 'react-router-dom'
import Button from '../component/Button'

function PaymentFailPage() {
    return (
        <div>
            <Modal open={true}>
                <div className='text-white text-center flex flex-col items-center'>
                    <img src={img.done} alt="done" className='w-4/5 h-3/5' />
                    <div className='flex flex-col items-center gap-3'>
                        <h1 className='text-3xl'>Sorry !</h1>
                        <p className='text-body-text'>Your payment has been failed .</p>
                        <Link to={`/own-events`} className='w-full'>
                            <Button
                                text='View Event'
                                className="h-14"
                            />
                        </Link>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default PaymentFailPage