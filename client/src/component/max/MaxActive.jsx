import React, { useState } from 'react'
import DeactiveModal from './DeactiveModal';
import { img } from '../../assets/assets';
import Button from '../Button';
import Modal from '../Modal/Modal';
import { useMax } from '../../context/useMax';

function MaxActive() {
    const [activeModal, setActiveModal] = useState(false);
    const { setActive } = useMax();

    const handleOpen = () => {
        setActiveModal((prev) => !prev)
    }

    const handleSubmit = () => {
        setActive((prev) => !prev);
    }

    const handleCancel = () => {
        setActive((prev) => prev);
        setActiveModal(false);
    }

    return (
        <div className='w-full h-full flex justify-center text-white items-center'>
            <div className='w-1/2 h-96 flex items-center justify-center flex-col p-4 space-y-3'>
                <img className='w-40 h-40 -m-2' src={img.driving} alt="max" />
                <p className='text-xl tracking-wider leading-3 pb-2'>I Am Driving</p>
                <div className='flex justify-center py-2'>
                    <div className='flex flex-col items-center p-2'>
                        <p>02</p>
                        <p className='text-white/70'>Hours</p>
                    </div>
                    <p>:</p>
                    <div className='flex flex-col items-center p-2'>
                        <p>00</p>
                        <p className='text-white/70'>Minutes</p>
                    </div>
                    <p>:</p>
                    <div className='flex flex-col items-center p-2'>
                        <p>00</p>
                        <p className='text-white/70'>Seconds</p>
                    </div>
                </div>
                <div className='w-full'>
                    <Button onEvent={handleOpen} text={'Deactivate Mex Mode'} />
                </div>
            </div>
            <Modal open={activeModal} className="z-20">
                {activeModal && <DeactiveModal onSubmit={handleSubmit} onCancel={handleCancel} />}
            </Modal>
        </div >
    )
}

export default MaxActive
