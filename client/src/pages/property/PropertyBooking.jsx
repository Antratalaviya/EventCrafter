import React, { useEffect, useState } from 'react'
import SingleProperty from '../../component/property/SingleProperty'
import { img } from '../../assets/assets'
import SearchProperty from '../../component/Search/SearchProperty';
import Spinner from '../../component/Spinner';
import Button from '../../component/Button';
import { useGetAllPropertiesQuery } from '../../api/api';
import { useCurrLocation } from '../../context/useCurrLocation';

function PropertyBooking() {
    const [search, setSearch] = useState(true);
    const [loadMoreFilter, setLoadMoreFilter] = useState(false);
    const [properties, setProperties] = useState([]);
    const { setPageName, setLoc } = useCurrLocation();
    const [filter, setFilter] = useState({
        rating: "",
        sortby: "",
        amenities: "",
        page: 1,
        limit: 10,

    });
    const { data, isSuccess, isLoading } = useGetAllPropertiesQuery(
        { keyword: "", filter },
        { skip: !loadMoreFilter }
    );
    useEffect(() => {
        setLoc('property');
        setPageName("Property Booking")
    }, [])
    useEffect(() => {
        if (isSuccess) {
            setProperties((prev) => ([...prev, ...data?.data]));
            setLoadMoreFilter(false);
        }
        console.log(properties)
    }, [data])
    useEffect(() => {
        console.log(properties)
    }, [properties])

    if (!properties) {
        return <div className='h-screen w-screen grid place-items-center'>
            <Spinner />
        </div>
    }
    return (
        <div className='p-5 flex flex-col overflow-y-scroll gap-5 h-screen'>
            <SearchProperty
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
                setProperties={setProperties}
            />
            <div className='grid grid-cols-3 gap-5'>
                {properties && properties.length > 0 && properties.map((property, index) => (
                    <SingleProperty
                        key={index}
                        propertyId={property._id}
                        property={property.name}
                        rating={property.rating}
                        street={property.street}
                        city={property.city}
                        country={property.country}
                        amenities={property.amenities}
                        purpose={property.purpose}
                        description={property.description}
                        amount={property.amount}
                        photo={property.photos.url}
                        own={false}
                    />
                ))}
                <SingleProperty
                    // property="Artisan doing woodcutting.."
                    // rating="4.5"
                    // street="41901 Thornridge Cir. Shiloh"
                    // city="Hawaii"
                    // country="Singapor"
                    amenities={["Car parking available", "Swimming Pool", "Free WiFi", "Food available on spot"]}
                    purpose="Parties"
                    // description
                    // amount
                    photo={img.img1}
                    own={false}
                />
                <SingleProperty photo={img.img2} own={false} amenities={["Car parking available", "Swimming Pool", "Free WiFi", "Food available on spot"]} purpose="Parties" />
                <SingleProperty photo={img.img3} own={false} amenities={["Car parking available", "Swimming Pool", "Free WiFi", "Food available on spot"]} purpose="Parties" />
                <SingleProperty photo={img.img4} own={false} amenities={["Car parking available", "Swimming Pool", "Free WiFi", "Food available on spot"]} purpose="Parties" />
                <SingleProperty photo={img.img5} own={false} amenities={["Car parking available", "Swimming Pool", "Free WiFi", "Food available on spot"]} purpose="Parties" />
                <SingleProperty photo={img.img6} own={false} amenities={["Car parking available", "Swimming Pool", "Free WiFi", "Food available on spot"]} purpose="Parties" />
                <SingleProperty photo={img.img7} own={false} amenities={["Car parking available", "Swimming Pool", "Free WiFi", "Food available on spot"]} purpose="Parties" />
                <SingleProperty photo={img.img8} own={false} amenities={["Car parking available", "Swimming Pool", "Free WiFi", "Food available on spot"]} purpose="Parties" />
                <SingleProperty photo={img.img9} own={false} amenities={["Car parking available", "Swimming Pool", "Free WiFi", "Food available on spot"]} purpose="Parties" />

                {properties.length < filter.page * filter.limit ? (<></>) : (
                    <div className="col-span-2 flex items-center text-white">
                        <Button
                            className="w-1/3 mx-auto"
                            text="Load More"
                            onClick={() => { setFilter((prev) => ({ ...prev, page: prev.page + 1 })); setLoadMoreFilter(true) }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PropertyBooking