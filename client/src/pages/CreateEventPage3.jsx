import React, { useEffect, useRef } from 'react'
import { CrossIcon, FileIcon, GalleryIcon, PdfIcon, VideoIcon } from '../assets/svg/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { setEvent } from '../store/EventSlice';
import { deleteImg } from '../Firebase/delete';

function CreateEventPage3() {
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const imgInputRef = useRef(null);

    const event = useSelector((state) => state.event.event);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setEvent({
            ...event,
            [e.target.name]: e.target.value,
        }))
    }

    return (

        <div className='w-full grid grid-cols-1 text-white gap-5 py-5'>
            <div className='bg-[#1F252C] col-center space-y-5 p-5 rounded-lg border-dashed border-2 border-primary'>
                <div onClick={() => videoInputRef.current.click()}>
                    <VideoIcon />
                </div>
                <input
                    type="file"
                    name='videoFile'
                    ref={videoInputRef}
                    onChange={(e) => {
                        dispatch(setEvent({
                            ...event,
                            [e.target.name]: e.target.files[0]
                        }))

                    }}
                    accept='video/*'
                    className='hidden'
                />
                <div className='text-center'>
                    <p>Choose Video File</p>
                    <p className='text-body-text'>Maximum video 30 sec video upload</p>
                </div>
            </div>
            <div className='bg-[#1F252C] col-center space-y-5 p-5 rounded-lg border-dashed border-2 border-primary'>
                <div onClick={() => fileInputRef.current.click()}>
                    <FileIcon />
                </div>
                <input
                    type="file"
                    name='pdfFile'
                    ref={fileInputRef}
                    onChange={(e) => {
                        const files = Array.from(e.target.files);
                        dispatch(setEvent(
                            { pdfFile: [...event.pdfFile, ...files] }
                        ))
                    }}
                    accept='application/pdf, application/msword'
                    className='hidden'
                    multiple
                />
                <div className='text-center'>
                    <p>Choose File</p>
                    <p className='text-body-text'>Select PDF file to  upload</p>
                </div>
            </div>
            {
                event.pdfFile.length > 0 && (
                    <>
                        <div className='grid grid-cols-2 gap-5'>
                            {event.pdfFile.map((file, index) => (
                                <div className='relative flex items-center justify-start gap-5 bg-[#1F252C] rounded-lg w-full py-3 px-5' key={index}>
                                    <PdfIcon />
                                    <div>
                                        <p>{file.name}</p>
                                        {Math.floor(file.size / 1000) > 1024 ? (<p className='text-sm'>{Math.floor(file.size / 1000000)}mb</p>) : <p className='text-sm'>{Math.floor(file.size / 1000)}kb</p>}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(setEvent(({ pdfFile: event.pdfFile.filter((_, i) => i !== index) })))}
                                        className="absolute top-4 right-2 rounded-full bg-stroke/50 size-10 row-center"
                                    >
                                        <CrossIcon className="size-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
            <div className='bg-[#1F252C] rounded-lg ring-1 ring-gray'>
                <textarea
                    type="text"
                    placeholder='Please describe your event in more detail so that you arouse curiosity and your visitors know what to expect at yours. Upload an agenda if you have one. Think of the images you can use too. Maybe also pictures of the location or what you think what could be interesting'
                    name='description'
                    onChange={handleChange}
                    maxLength={200}
                    style={{ resize: "none" }}
                    value={event.description}
                    className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                />
                <div className='float-right text-body-text pr-3'>
                    <span >{event.description.length}</span>
                    <span >/ 200</span>
                </div>
            </div>
            <div className={`bg-[#1F252C] col-center space-y-5 p-5 rounded-lg border-dashed border-2 border-primary`}>
                <div onClick={() => imgInputRef.current.click()}>
                    <GalleryIcon />
                </div>
                <input
                    type="file"
                    name='photos'
                    ref={imgInputRef}
                    onChange={(e) => {
                        const files = Array.from(e.target.files);
                        dispatch(setEvent({ photos: [...files, ...event.photos].slice(0, 6) }))
                    }}
                    accept='image/*'
                    className='hidden'
                    multiple
                />
                <div className='text-center'>
                    <p>Upload Photos</p>
                    <p className='text-body-text'>Maximum 6 photos upload</p>
                </div>
            </div>
            {event.photos.length > 0 && (
                <div className={`bg-[#1F252C] col-center space-y-5 p-5 rounded-lg border-dashed border-2 border-primary`}>
                    <div className='grid grid-cols-6 gap-5 transition-all'>
                        {event.photos.map((img, index) => (
                            <div className='relative rounded-xl overflow-hidden' key={index}>
                                {img?.url ? (
                                    <img
                                        src={img.url}
                                        alt={`Selected ${index}`}
                                        className='h-48 w-full object-cover rounded'
                                    />
                                ) : (
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`Selected ${index}`}
                                        className='h-48 w-full object-cover rounded'
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={async () => {
                                        if (img?.url) {
                                            await deleteImg(img?.url);
                                        }
                                        dispatch(setEvent({ photos: event.photos.filter((_, i) => i !== index) }));
                                    }}
                                    className="absolute top-0 right-1 rounded-full bg-stroke/50 size-10 row-center"
                                >
                                    <CrossIcon className="size-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateEventPage3