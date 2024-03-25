import React from 'react'
import {LogoutBtn} from './index'

function Navbar() {
  return (
    <div className='flex items-center w-screen h-[70px] bg-gray-800 shadow-lg'>
        <div className='ml-2 flex text-white font-bold text-4xl'>Billion-Faire</div>
        <div className='ml-[1200px] flex'>
            <LogoutBtn />
        </div>
    </div>
  )
}

export default Navbar