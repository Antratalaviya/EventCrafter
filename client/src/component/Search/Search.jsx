import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { FilterIcon, SearchIcon } from '../../assets/svg/Icon';
import Input from '../Input';
import Button from '../Button';
import { useGetAllEventsQuery, useGetAllOwnEventsQuery } from '../../api/api';
import { useDebounce } from '../../context/useDebounce';

function Search({ filter, setFilter, search, setSearch, events, setEvents }) {
    const [keyword, setKeyword] = useState("");
    const [filterOpen, setFilterOpen] = useState(false)
    const [debouncedKeyword] = useDebounce(keyword, 500);

    const memoizedFilter = useMemo(() => filter, [filter]);

    const { data, isSuccess } = useGetAllOwnEventsQuery(
        { keyword: debouncedKeyword, filter: memoizedFilter },
        { skip: !search }
    );

    useEffect(() => {
        if (isSuccess) {
            setEvents(data?.data)
            setSearch(false);
        }
    }, [isSuccess]);

    const handleChange = (e) => {
        setFilter((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        setFilter((prev) => ({
            ...prev,
            page: 1,
            limit: 10
        }))
        setSearch(true);
        setFilterOpen(false);
        setKeyword("")
        setFilter((prev) => ({ ...prev, type: "private", status: "upcoming", sortby: "desc" }))
    };

    return (
        <>
            <div className='flex justify-between bg-background w-2/5 items-center mr-2 relative  rounded-md border border-gray pr-5 pl-3 mt-5'>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center'>
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
                    <div className='absolute top-full mt-2 right-5 bg-background z-50 border- border-gray rounded-xl min-w-96 p-5 space-y-5 gap-5 text-white'>
                        <h1 className='text-center'>Filter</h1>
                        <hr className='text-body-text' />
                        <div className='w-full overflow-hidden space-y-3'>
                            <p>EventClasses</p>
                            <div className='flex justify-start items-center flex-wrap gap-3'>
                                <label htmlFor="type5" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="type" id="type5" value="private" onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.type === 'private'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>Private</p>
                                    </div>
                                </label>
                                <label htmlFor="type1" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="type" id="type1" value="public" onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.type === 'public'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>Public</p>
                                    </div>
                                </label>
                                <label htmlFor="type2" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="type" id="type2" value='workshop' onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.type === 'workshop'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>Workshop</p>
                                    </div>
                                </label>
                                <label htmlFor="type3" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="type" id="type3" value='ticket' onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.type === 'ticket'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>Ticket</p>
                                    </div>
                                </label>
                                <label htmlFor="type4" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="type" id="type4" value='business' onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.type === 'business'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>Business</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className='w-full overflow-hidden space-y-3'>
                            <p>EventClasses</p>
                            <div className='flex justify-start items-center flex-wrap gap-3'>
                                <label htmlFor="type5" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="status" id="status5" value="private" onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.status === 'upcoming'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>Upcoming</p>
                                    </div>
                                </label>
                                <label htmlFor="status1" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="status" id="status1" value="public" onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.status === 'completed'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>Completed</p>
                                    </div>
                                </label>
                                <label htmlFor="status2" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="status" id="status2" value='workshop' onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.status === 'cancelled'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>Cancelled</p>
                                    </div>
                                </label>
                                <label htmlFor="status3" className='cursor-pointer relative inline-flex items-center' >
                                    <input type="radio" name="status" id="status3" value='ticket' onChange={handleChange} className='sr-only peer h-full w-full' checked={filter.status === 'draft'} />
                                    <div className={`py-2 rounded-full cursor-pointer mt-2 w-full flex justify-center items-center peer-checked:bg-primary bg-dark px-5`}>
                                        <p>Draft</p>
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

export default Search