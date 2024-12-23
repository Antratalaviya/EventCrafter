import React, { useEffect, useState } from 'react';

const CheckboxGroup = ({ checkboxes, checkedItems, setCheckedItems, checkBox = true }) => {

    // Handle the checkbox change dynamically
    const handleCheckboxChange = (key) => {
        if (checkBox) {
            setCheckedItems((prev) => ({
                ...prev,
                [key]: !prev[key],
            }));
        } else {
            setCheckedItems((prev) => ({
                [key]: !prev[key],
            }));
        }
    };


    return (
        <div className='flex items-center flex-wrap gap-5'>
            {checkboxes.map((item) => (
                <div key={item.key} className="flex items-center space-x-3 mr-5">
                    <input
                        type={checkBox ? "checkbox" : "radio"}
                        className="sr-only"
                        checked={checkedItems[item.key] || false}
                        onChange={() => handleCheckboxChange(item.key)}
                    />

                    <div
                        className={`size-5 ${checkBox ? "rounded" : "rounded-full"} ${checkedItems[item.key] ? 'bg-primary' : 'border border-body-text'} flex items-center justify-center cursor-pointer`}
                        onClick={() => handleCheckboxChange(item.key)}
                    >
                        {checkedItems[item.key] && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </div>

                    <label className="text-sm">
                        <p className='text-nowrap'>{item.label}</p>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CheckboxGroup