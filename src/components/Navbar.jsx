import React from 'react'
import { BiMenu } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between  bg-indigo-900 text-white py-2'>
        <div className='logo'>
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
        <ul className='hidden md:flex gap-8 mx-9 whitespace-nowrap'>
            <li className='cursor-pointer hover:bg-white hover:text-black text-xl font-semibold rounded-xl px-2 transition-all'>Home</li>
            <li className='cursor-pointer hover:bg-white hover:text-black text-xl font-semibold rounded-xl px-2 transition-all'>Your tasks</li>
        </ul>
        <div className='mx-9 block md:hidden'><BiMenu/></div>
    </nav>
  )
}

export default Navbar
