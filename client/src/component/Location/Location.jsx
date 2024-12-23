import React, { useState } from 'react'
import { ArrowIcon, GPSIcon, LocationIcon } from '../../assets/svg/Icon'
import Button from '../Button'
import Drawer from '../Drawer/Drawer'
import { useSelector } from 'react-redux'
import { useUpdateAddressMutation } from '../../api/api'
import { toast } from 'react-toastify'

function Location() {
    const add = 'Caleta de Fuste, Fuerteventura ESP'
    const user = useSelector((state) => state.auth.userData);
    const [updateAddress] = useUpdateAddressMutation();
    const [locDrawer, setLocDrawer] = useState(false);
    const [location, setLocation] = useState({
        address: user?.address,
        latitude: null,
        longitude: null,
        error: null,
    });

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ ...location, latitude, longitude });
                    // Call reverseGeocoding function here to get the address from coordinates
                    reverseGeocoding(latitude, longitude);
                },
                (error) => {
                    setLocation({ ...location, error: "Unable to retrieve your location" });
                }
            );
        } else {
            setLocation({ ...location, error: "Geolocation is not supported by your browser" });
        }
    };

    const reverseGeocoding = async (latitude, longitude) => {
        // Using a service like Google Maps API or OpenStreetMap's Nominatim for reverse geocoding
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();
        setLocation((prev) => ({
            ...prev,
            address: data.display_name || "Address not found",
        }));
    };

    const handleChange = (e) => {
        setLocation({ ...location, latitude: null, longitude: null, address: e.target.value });
    };
    const handleUpdateAddress = async () => {
        try {
            const res = await updateAddress({ address: location.address }).unwrap();
            if (res.success) {
                setLocDrawer(false);
                toast.success("Address updated successfully")
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <>
            <button onClick={() => setLocDrawer(true)}>
                <div className='flex items-center gap-x-1 rounded-full text-sm text-white bg-new-card ring-1 ring-stroke py-2 px-4'>
                    <LocationIcon className="w-5 h-5" />
                    <p className="pr-4">{location.address}</p>
                </div>
            </button>
            <Drawer open={locDrawer} onClose={() => setLocDrawer(false)} >
                <div onClick={() => setLocDrawer(false)} className='size-5 cursor-pointer sticky left-15 top-15'>
                    <ArrowIcon />
                </div>
                <div className='text-white'>
                    <p className='py-4'>Select Location</p>
                    <div className='py-4 space-y-3'>
                        <div className='bg-[#252A30] rounded-lg ring-1 ring-gray'>
                            <input
                                type="text"
                                // placeholder='Search For  area, Street name...'
                                placeholder="Enter your location"
                                value={location.address}
                                onChange={handleChange}
                                onKeyDown={async (e) => {
                                    if (e.key === "Enter") {
                                        await handleUpdateAddress();
                                    }
                                }}
                                className='bg-transperent focus:outline-none w-full text-body-text p-3 text-sm'
                            />
                        </div>
                        <div className='flex bg-[#252A30] rounded-lg ring-1 ring-gray p-3 gap-2'>
                            <GPSIcon />
                            <div className='flex flex-col'>
                                <p className='py-1'>Get Current location</p>
                                <input
                                    type="text"
                                    placeholder='Using GPS'
                                    onClick={getLocation}
                                    className='bg-transperent focus:outline-none w-full text-body-text py-3 text-sm'
                                    readOnly
                                />
                            </div>
                        </div>

                        {location.error && (
                            <p className="text-red-500">{location.error}</p>
                        )}

                    </div>
                    <Button text={'Done'} onEvent={handleUpdateAddress} />
                </div>
            </Drawer>
        </>
    )
}

export default Location