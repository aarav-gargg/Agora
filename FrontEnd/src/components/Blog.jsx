import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa6";
import { FaEllipsisV } from 'react-icons/fa';

const Blog = ({ name, title, content, date }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    return (
        <div className='border min-w-fit max-w-fit border-white bg-gradient-to-tr from-[#2c4866] to-[#0B0C10] flex flex-col justify-center items-center  p-4  cursor-pointer rounded-xl hover:translate-x-2 hover:translate-y-1 duration-300 ease-out transition-transform'>
            <div className='flex w-full justify-between items-center p-2'>
                <div className='flex gap-2 items-center'>
                    <FaRegUser className='text-lg' />
                    <span>{name}</span>
                </div>

                <div className='flex items-center gap-4'>
                    <div className='text-sm'>
                        Uploaded On: {formattedDate}
                    </div>
                    <div className='relative'>
                        <button 
                            onClick={toggleDropdown}
                            className="text-white focus:outline-none">
                            <FaEllipsisV className='text-lg' />
                        </button>

                        {showDropdown && (
                            <div className='absolute right-0 bg-[#2c4866] text-white border border-white rounded-md shadow-md mt-2 w-40'>
                                <ul className='text-sm'>
                                    <li className='px-4 py-2 hover:bg-[#0B0C10] cursor-pointer'>View</li>
                                    <li className='px-4 py-2 hover:bg-[#0B0C10] cursor-pointer'>Update</li>
                                    <li className='px-4 py-2 hover:bg-[#0B0C10] cursor-pointer'>Delete</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <hr className='my-1 bg-cyan-600 border-t-2 w-2/4'/>
            <div className='my-2 p-2 flex flex-col gap-2'>
                <h1 className='text-xl text-[#ff5733]'>{title}</h1>
                <p className='text-gray-400'>{content}</p>
            </div>
        </div>
    );
};

export default Blog;
