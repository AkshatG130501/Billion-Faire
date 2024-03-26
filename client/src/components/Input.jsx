import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Multiplier } from './index';

function Input() {
  const [value, setValue] = useState(0);
  const [target, setTarget] = useState(0);
  const [betAmount, setBetAmount] = useState(0);    
  const [wallet, setWallet] = useState(10000.00);

const fetchData = () => {
    axios.get(`${String(import.meta.env.VITE_BACKEND_URL)}`)
        .then((response) => {
            const fetchedMaxValue = response.data.maxValue;
            setValue(fetchedMaxValue);
        })
        .catch((error) => {
            console.error('Error fetching maxValue: ', error);
        });
};

const handleClick = () => {
    if(betAmount<=wallet){
        fetchData();
        if(value>=target){
            setWallet(wallet+(betAmount*target - betAmount));
        }else{
            setWallet(wallet-betAmount);
        }
    }else{
        alert('Insufficient funds');
    }
};

const handlebetChange = (e) => {
    if(e.target.value>wallet){
        alert('Insufficient funds');
    }
    else if(e.target.value<0){
        alert('Invalid amount');
    }
    else{
        setBetAmount(e.target.value);
    }
}

const convertHalf = () => {
    setBetAmount(betAmount/2);
}

const convertDouble = () => {
    if(betAmount*2>wallet){
        alert('Insufficient funds');
    }else{
        setBetAmount(betAmount*2);
    }
}

const handleTargetChange = (e) => {
    if(e.target.value<0){
        alert('Invalid Target Multiplier');
    }else{
        setTarget(e.target.value);
    }
}

  return (
      <div className='flex'>
        <div className='flex flex-col w-[300px] bg-gray-800 h-[600px] ml-[200px] rounded-l'>
        <div className='flex flex-col ml-5 mt-20 space-y-1 shadow-lg'>
            <label className='text-gray-400' htmlFor="">Bet Amount</label>
            <div className='flex justify-around rounded bg-gray-700 w-[250px] h-[44px]'>
            <input value={betAmount} onChange={handlebetChange} className='h-[40px] rounded w-[150px] mt-[2px] p-2' placeholder='0.00000000' min={0} type="number"/>
            <button onClick={convertHalf} className='text-xs w-[30px] text-white font-semibold'>1/2</button>
            <div className='mt-2 h-[40px]'>|</div>
            <button onClick={convertDouble} className='w-[30px] text-white font-semibold'>2x</button>
            </div>
        </div>
        <div className='flex flex-col ml-5 mt-5 space-y-1'>
            <label className='text-gray-400' htmlFor="">Target Multiplier</label>
            <input placeholder='0.00000000' min={0} onChange={handleTargetChange} className='h-[40px] w-[250px] rounded p-2' type="number" />
        </div>
        <div className='flex flex-col ml-5 mt-5 space-y-1'>
            <label className='text-gray-400' htmlFor="">Profit on Win</label>
            <input readOnly value={target!=0 ? (betAmount*target-betAmount).toFixed(2) : 0.00} className='h-[40px] w-[250px] rounded p-2' type="text" />
        </div>
        <div className='flex mt-10 ml-5'>
            <button onClick={handleClick} className='bg-green-600 rounded  h-[40px] w-[250px] font-semibold'>Bet</button>
        </div>
      </div>
        <div>
            <Multiplier val={value} target={target} wallet={wallet} />
        </div>
    </div>
  )
}

export default Input