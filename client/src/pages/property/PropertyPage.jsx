import React, { useState } from 'react'
import { img } from '../../assets/assets';
import { capitalize } from '../../utils/customUtility';
import { LocationFillIcon, SingleTickIcon, StarIcon } from '../../assets/svg/Icon';
import Button from '../../component/Button';
import { useNavigate } from 'react-router-dom';

function PropertyPage() {
    const [desc, setDesc] = useState(true);
    const navigate = useNavigate();
    const propertyId = "66c87da83c2e7bb657c929ba"
    const [property, setProperty] = useState({
        property: "Artisan doing woodcutting..",
        street: "41901 Thornridge Cir. Shiloh",
        city: "Hawaii",
        country: "Singapor",
        amenities: ["Car parking available", "Swimming Pool", "Free WiFi", "Food available on spot"],
        purpose: ["Parties"],
        description: "",
        amount: 250,
        videoFile: "",
        photos: [img.img1],
        rating: "4.5"
    });
    return (
        <div className='p-7 w-full h-full text-white overflow-y-scroll'>
            <div className='bg-black-light rounded-xl border border-dark overflow-hidden space-y-5 text-xs'>
                <div className='h-96 relative'>
                    <img className='w-full h-full object-cover' src={property.photos[0]} alt="event_img" />
                </div>
                <div className='flex flex-col justify-evenly p-5 space-y-5'>
                    <div className='flex items-center justify-between'>
                        <p className='text-white tracking-wider text-2xl font-semibold'>{capitalize(property.property)}</p>
                        <div className='rounded-xl bg-[#8ECE00]/10 text-white px-4 py-2 col-span-1 flex items-center justify-center ml-5 gap-2'>
                            <p className='text-[#8ECE00] text-xs font-extralight'><span className='text-base font-semibold'>{`$${property.amount} `}</span>Per Day</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 text-body-text text-sm font-extralight'>
                        <div className='flex items-center gap-x-2'>
                            <StarIcon />
                            <p className='text-white/75 text-sm text-center'>{property.rating}</p>
                        </div>
                        <div className='flex items-center gap-x-2 w-4/5'>
                            <LocationFillIcon />
                            <p className='leading-6 tracking-wider text-ellipsis line-clamp-1'>{`${capitalize(property.street + ", " + property.city + ", " + property.country + " ")}`}</p>
                        </div>
                    </div>
                    <div className='border-b border-body-text'></div>
                    <div className='space-y-2'>
                        <p className='text-base text-white font-normal'>Amenities</p>
                        <div className='flex items-center flex-wrap gap-5 text-body-text font-extralight text-sm'>
                            {property.amenities.length > 0 && property.amenities.map((item) => (
                                <div className='flex items-center gap-1' key={item}>
                                    <SingleTickIcon />
                                    <p>{item}</p>
                                </div>
                            ))}
                            {property.amenities.length > 0 && property.amenities.map((item) => (
                                <div className='flex items-center gap-1' key={item + 1}>
                                    <SingleTickIcon />
                                    <p>{item}</p>
                                </div>
                            ))}
                            {property.amenities.length > 0 && property.amenities.map((item) => (
                                <div className='flex items-center gap-1' key={item + 2}>
                                    <SingleTickIcon />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='border-b border-body-text'></div>
                    <div className='flex w-1/5 gap-5 items-center text-base'>
                        <Button
                            text={"Description"}
                            className="rounded-lg border border-stroke"
                            onClick={() => setDesc(true)}
                        />
                        <Button
                            text={"Review"}
                            className="bg-dark hover:bg-dark/50 rounded-lg border border-stroke"
                            onClick={() => setDesc(false)}
                        />
                    </div>
                    {desc ? (
                        <div className='text-body-text font-extralight space-y-5'>
                            <p>A stay at Ardency Inn by Park Tree Udaipur places you in the heart of Udaipur, within a 5-minute drive of Bhuvaneswari Temple and Bapu Bazaar. This hotel is 2 mi (3.3 km) from Vintage Collection of Classic Cars and 2.2 mi (3.5 km) from City Palace. Make yourself at home in one of the 46 air-conditioned rooms featuring minibars. Your memory foam bed comes with premium bedding. Bathrooms have showers and complimentary toiletries. Conveniences include phones, as well as desks and complimentary newspapers. Featured amenities include a 24-hour business center, express check-in, and express check-out. Free valet parking is available onsite.</p>
                            <p className='text-white font-normal'>Important information :</p>
                            <p className='text-white font-normal'>You Need To Know</p>
                            <div>
                                <li> The seasonal pool will be open from February 01 to December 31.</li>
                                <li>Pool access available from 8:00 AM to 9:00 PM.</li>
                                <li>No pets and no service animals are allowed at this property.</li>
                            </div>
                            <p className='text-white font-normal'>Special Instructions :</p>
                            <p>Front desk staff will greet guests on arrival.</p>
                            <p className='text-white font-normal'>Instructions</p>
                            <div>
                                <li>Extra-person charges may apply and vary depending on property policy</li>
                                <li>Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges</li>
                                <li>Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed</li>
                                <li>Guests must contact this property in advance to reserve onsite parking</li>
                                <li>This property accepts credit cards, debit cards, mobile payments, and cash</li>
                                <li>Mobile payment options include: Google Pay, Paytm, and PhonePe</li>
                            </div>
                        </div>
                    ) : (
                        <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                                <div className='flex gap-5 items-center'>
                                    <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                        <img src={img.p1} alt="user_profileImg" />
                                    </div>
                                    <div className='space-y-1'>
                                        {/* <p>{capitalize(`${user.name} ${user.surname}`)}</p> */}
                                        <p>Leslie Alexander</p>
                                        <p className='text-body-text font-extralight'>10 January 2024</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                </div>
                            </div>
                            <p className='text-body-text font-extralight'>I hiked the Pico do Arieiro to Pico do Ruivo with my teenage daughter. It was an amazing experience. Filipe was our driver. He was extremely punctual, friendly, and helpful. During our drive, he provided commentary that was informative and helpful, including many other places that match our interests, </p>
                            <div className='border-b border-stroke'></div>
                            <div className='flex items-center justify-between'>
                                <div className='flex gap-5 items-center'>
                                    <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                        <img src={img.p2} alt="user_profileImg" />
                                    </div>
                                    <div className='space-y-1'>
                                        {/* <p>{capitalize(`${user.name} ${user.surname}`)}</p> */}
                                        <p>Leslie Alexander</p>
                                        <p className='text-body-text font-extralight'>10 January 2024</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon fill="white" />
                                </div>
                            </div>
                            <p className='text-body-text font-extralight'>I hiked the Pico do Arieiro to Pico do Ruivo with my teenage daughter. It was an amazing experience. Filipe was our driver. He was extremely punctual, friendly, and helpful. During our drive, he provided commentary that was informative and helpful, including many other places that match our interests, </p>
                            <div className='border-b border-stroke'></div>
                            <div className='flex items-center justify-between'>
                                <div className='flex gap-5 items-center'>
                                    <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                        <img src={img.p3} alt="user_profileImg" />
                                    </div>
                                    <div className='space-y-1'>
                                        {/* <p>{capitalize(`${user.name} ${user.surname}`)}</p> */}
                                        <p>Leslie Alexander</p>
                                        <p className='text-body-text font-extralight'>10 January 2024</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon fill="white" />
                                    <StarIcon fill="white" />
                                </div>
                            </div>
                            <p className='text-body-text font-extralight'>I hiked the Pico do Arieiro to Pico do Ruivo with my teenage daughter. It was an amazing experience. Filipe was our driver. He was extremely punctual, friendly, and helpful. During our drive, he provided commentary that was informative and helpful, including many other places that match our interests, </p>
                            <div className='border-b border-stroke'></div>
                            <div className='flex items-center justify-between'>
                                <div className='flex gap-5 items-center'>
                                    <div className='rounded-full overflow-hidden ring-4 ring-black-light size-10'>
                                        <img src={img.p4} alt="user_profileImg" />
                                    </div>
                                    <div className='space-y-1'>
                                        {/* <p>{capitalize(`${user.name} ${user.surname}`)}</p> */}
                                        <p>Leslie Alexander</p>
                                        <p className='text-body-text font-extralight'>10 January 2024</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon fill="white" />
                                    <StarIcon fill="white" />
                                    <StarIcon fill="white" />
                                </div>
                            </div>
                            <p className='text-body-text font-extralight'>I hiked the Pico do Arieiro to Pico do Ruivo with my teenage daughter. It was an amazing experience. Filipe was our driver. He was extremely punctual, friendly, and helpful. During our drive, he provided commentary that was informative and helpful, including many other places that match our interests, </p>
                            <div className='border-b border-stroke'></div>
                        </div>
                    )}
                    <div className='ml-auto w-1/6'>
                        <Button
                            type="text"
                            text={"Book Event Property"}
                            className="py-4 font-semibold tracking-wider"
                            onClick={() => navigate(`/property/booking/${propertyId}`)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyPage