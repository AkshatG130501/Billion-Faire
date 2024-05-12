import React, {useState} from 'react'
import {LogoutBtn} from './index'
import { useNavigate } from 'react-router-dom'

function Navbar() {

  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const {username} = JSON.parse(localStorage.getItem('authUser'));

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    if(selectedValue === '1') navigate('/deposit');
    else if(selectedValue === '2') navigate('/withdraw');
  }

  return (
    <div className='flex items-center w-screen h-[70px] bg-gray-800 shadow-lg justify-between'>
        <div className='flex text-white font-bold text-4xl ml-2'>Billion-Faire</div>
        <div className='ml-6 flex space-x-3 items-center'>
          <label className='text-white font-semibold text-lg' htmlFor="">Deposit/Withdraw</label>
          <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                             name='deposit-withdraw' id='deposit-withdraw'
                             onChange={handleOptionChange}
                             value={selectedOption}
          >
            <option selected>Select</option>
            <option value="1">Deposit</option>
            <option value="2">Withdraw</option>
          </select>
        </div>
        
        <div className='flex mr-4 items-center space-x-2'>
        <div className='flex items-center'>
                <div className='text-white font-semibold text-lg'>{username}</div>
                <img className='w-10 h-10 rounded-full' src='/office-man.png' alt='user' />
        </div>
            <LogoutBtn />
        </div>
    </div>
  )
}

export default Navbar