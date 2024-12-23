import React, { useEffect, useMemo, useState } from 'react'
import { FilterIcon, SearchIcon } from '../../assets/svg/Icon';
import Input from '../Input';
import Button from '../Button';
import { useDebounce } from '../../context/useDebounce';
import Spinner from '../Spinner';
import CheckboxGroup from '../Checkbox/CheckboxGroup';
import { useGetAllPropertiesQuery } from '../../api/api';

function SearchProperty({ filter, setFilter, search, setSearch, setProperties }) {
    const [keyword, setKeyword] = useState("");
    const [filterOpen, setFilterOpen] = useState(false)
    const [debouncedKeyword] = useDebounce(keyword, 500);
    const [amenities, setAmenities] = useState({});

    const memoizedFilter = useMemo(() => filter, [filter]);
    const checkboxes = [
        { key: 'wifi', label: 'Free WiFi' },
        { key: 'parking', label: 'Car parking available' },
        { key: 'pool', label: 'Swimming Pool' },
        { key: 'gym', label: 'Gym Access' },
        { key: 'dining', label: 'Dining services' },
        { key: 'evparking', label: 'EV vehicle parking' },
        { key: 'child', label: 'Child friendly' },
    ];
    const { data, isSuccess, isLoading } = useGetAllPropertiesQuery(
        { keyword: debouncedKeyword, filter: memoizedFilter },
        { skip: !search }
    );

    useEffect(() => {
        if (isSuccess) {
            setProperties(data?.data);
            setSearch(false);
        }
    }, [data]);

    const handleChange = (e) => {
        setFilter((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        setSearch(true);
        setFilterOpen(false);
    };

    useEffect(() => {
        setFilter({
            ...filter,
            amenities: checkboxes.reduce((acc, item) => {
                if (amenities[item.key] || false) {
                    acc.push(item.label)
                }
                return acc
            }, []).toString()
        })
    }, [amenities])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className='flex justify-between bg-background w-2/5 items-center mx-auto relative  rounded-md border border-gray'>
                <div className='flex items-center justify-between pr-5 w-full'>
                    <div className='flex items-center pl-2'>
                        <div onClick={handleSubmit}>
                            <SearchIcon stroke={"#9697A1"} className="w-10 cursor-pointer" />
                        </div>
                        <Input
                            placeholder="Search By Event Name"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            name="keyword"
                            autoComplete="off"
                            className="bg-transperent ring-transperent w-full"
                        />
                    </div>
                    <div className='cursor-pointer' onClick={() => setFilterOpen(true)}>
                        <FilterIcon className="stroke-body-text " />
                    </div>
                </div>
                {filterOpen && (
                    <div className='absolute top-full mt-2 bg-background z-50 border border-gray rounded-xl w-full p-5 space-y-5 gap-5 text-white'>
                        <div className='w-full overflow-hidden space-y-3'>
                            <p>Rating</p>
                            <div className='flex justify-start items-center flex-wrap gap-3'>
                                <label htmlFor="type5" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="rating" id="type5" value="1" onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.rating === '1'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>1 Star</p>
                                    </div>
                                </label>
                                <label htmlFor="type1" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="rating" id="type1" value="2" onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.rating === '2'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>2 Star</p>
                                    </div>
                                </label>
                                <label htmlFor="type2" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="rating" id="type2" value='3' onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.rating === '3'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>3 Star</p>
                                    </div>
                                </label>
                                <label htmlFor="type3" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="rating" id="type3" value='4' onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.rating === '4'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>4 Star</p>
                                    </div>
                                </label>
                                <label htmlFor="type4" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="rating" id="type4" value='5' onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.rating === '5'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>5 Star</p>
                                    </div>
                                </label>
                                <label htmlFor="type6" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="rating" id="type6" value='0' onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.rating === '0'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>All</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className='w-full overflow-hidden space-y-3'>
                            <p>Price</p>
                            <div className='flex justify-start items-center flex-wrap gap-3'>
                                <label htmlFor="price1" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="sortby" id="price1" value="desc" onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.sortby === 'desc'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>High to Low</p>
                                    </div>
                                </label>
                                <label htmlFor="price2" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="sortby" id="price2" value='asc' onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.sortby === 'asc'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>Low to High</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className='space-y-2 flex-wrap'>
                            <p>Amenities</p>
                            <CheckboxGroup
                                checkboxes={checkboxes}
                                checkedItems={amenities}
                                setCheckedItems={setAmenities} />
                        </div>
                        <Button
                            text={"Apply"}
                            className="mt-5"
                            onClick={handleSubmit}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default SearchProperty