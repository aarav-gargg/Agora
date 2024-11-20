import React from 'react'
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className='flex flex-col p-4 justify-center items-center text-[#3bf8eb] mb-2'>
      <div className='flex flex-col'>
        <h1 className='text-3xl font-sans justify-center items-center'>AGORA</h1>
        <h2 className='text-lg font-mono text-[#C5C6C7]'>
        Your Voice, Amplified.
        </h2>
      </div>
      <hr className='w-2/3 border-t-2 border-[#3bf8eb] my-4'/>
      <div className='flex flex-row justify-center items-center gap-3'>
        <div className='text-4xl'>
        <FaCircleUser />
        </div>
      <div className='flex flex-col text-white'>
      <h1 className='text-xl font-mono font-bold justify-center items-center'>AARAV GARG</h1>
        <h2 className='text-sm font-mono text-[#C5C6C7] md:text-sm'>
          aaravgarg@gmail.com
        </h2>
      </div>
      </div>
      
    </div>
  )
}

export default Navbar
