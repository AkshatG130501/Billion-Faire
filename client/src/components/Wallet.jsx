import React, {useEffect, useState} from 'react'

function Wallet({wallet}) {
  
  return (
    <div className='flex justify-center items-center w-[300px] h-[40px] bg-gray-800 rounded space-x-3'>
        <h1 className='text-white font-bold'>Wallet</h1>
        <input value={wallet.toFixed(2)} className='rounded w-[220px] pl-2' type="number" readOnly />
    </div>
  )
}

export default Wallet