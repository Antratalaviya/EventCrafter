import React, { useState } from 'react'
import SingleProperty from '../../component/property/SingleProperty'
import { img } from '../../assets/assets'
import Modal from '../../component/Modal/Modal'
import Button from '../../component/Button'
import { DeleteIcon } from '../../assets/svg/Icon'

function Properties() {
    const [deleteModal, setDeleteModal] = useState(false)
    return (
        <div className='p-5 flex flex-col overflow-y-scroll'>
            <div className='grid grid-cols-2 gap-5'>
                <SingleProperty
                    // property="Artisan doing woodcutting.."
                    // rating="4.5"
                    // street="41901 Thornridge Cir. Shiloh"
                    // city="Hawaii"
                    // country="Singapor"
                    // amenities={["Food"]}
                    // purpose
                    // description
                    // amount
                    photo={img.img1}
                    own={true}
                    setDeleteModal={setDeleteModal}
                />
                <SingleProperty photo={img.img2} own={true} setDeleteModal={setDeleteModal} />
                <SingleProperty photo={img.img2} own={true} setDeleteModal={setDeleteModal} />
                <SingleProperty photo={img.img1} own={true} setDeleteModal={setDeleteModal} />

            </div>
            <Modal open={deleteModal}>
                <div className='text-white col-center text-center p-10'>
                    <div className='w-20 h-24'>
                        <DeleteIcon fill="red" className="w-full h-full" />
                    </div>
                    <div className='col-center gap-3'>
                        <h1 className='text-2xl'>Delete</h1>
                        <p className='text-body-text'>Are you sure you want to Delete this Property?</p>
                        <Button
                            text='Delete'
                            className="bg-red hover:bg-red/50 py-3"
                            onClick={() => setDeleteModal(false)}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Properties