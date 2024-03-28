import React, { useState, useEffect } from 'react';
import {Target,Wallet} from "./index";


const Multiplier = ({val,target,wallet}) => {
    const [value, setValue] = useState(0);
    const [color,setColor] = useState('text-white');
    const [showCashout, setShowCashout] = useState(false);
    // const [wallet, setWallet] = useState(0.00);

    useEffect(() => {
        fetch(`${String(import.meta.env.VITE_BACKEND_URL)}`)
        .then((res)=> res.json())
        .then(data => {
            setWallet(data.wallet)
        })
        .catch((error) => {
            console.error('Error fetching wallet: ', error);
        })
        setValue(0);
        setColor('text-white');
    }, [val]);

    useEffect(()=>{
        if(showCashout){
            setTimeout(()=>{
                setShowCashout(false);
            },1000)
        }
    },[showCashout])

    useEffect(() => {
        const interval = setInterval(() => {
            if (value >= val && value < target) {
                setColor('text-red-500');
            } else if (value < val) {
                if (value >= target) {
                    setShowCashout(true);
                    setColor('text-green-500');
                }
                let increment;
                if(val<5) increment = 0.03;
                else if(val>=5 && val<=10) increment = 0.10;
                else if(val>10 && val<20) increment = 0.20;
                else if(val>=20 && val<30) increment = 0.30;
                else if(val>=30 && val<40) increment = 0.40;
                else if(val>=40 && val<50) increment = 0.50;
                else if(val>=50) increment = 1.01;
                setValue(prevValue => prevValue + increment);
            } else {
                clearInterval(interval);
            }
        }, 0.1);

        return () => {
            clearInterval(interval);
        } 
    }, [value,val]); 

    

    return(
    <div className='flex flex-col justify-between items-center bg-slate-900 h-[600px] w-[800px] rounded-r'>
        <div className='flex'>
        {/* <MetaMask /> */}
        <Wallet wallet={wallet} />
        </div>
        <h2 className={`text-[100px] ${color} font-bold `}>{value.toFixed(2)}x</h2>
        <div className='mb-4'>
            {showCashout && <Target target={target}/>}
        </div>
    </div>
    )
};

export default Multiplier;
