import React, { useState, useEffect } from 'react';
import {Target,Wallet} from "./index";


const Multiplier = ({val,target,wallet}) => {
    const [value, setValue] = useState(0);
    const [color,setColor] = useState('text-white');
    const [showCashout, setShowCashout] = useState(false);

    useEffect(() => {
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

            if(value>=val && value<target){
                setColor('text-red-500');
            }    
            else if (value < val) {
                if(value>=target){
                    setShowCashout(true);
                    setColor('text-green-500');
                }
                setValue(prevValue => prevValue + 0.01);
            }else {
                clearInterval(interval);
            }
        }, 1); 

        return () => {
            clearInterval(interval);
        } 
    }, [value,val]); 

    

    return(
    <div className='flex flex-col justify-between items-center bg-slate-900 h-[600px] w-[800px] rounded-r'>
        <Wallet wallet={wallet} />
        <h2 className={`text-[100px] ${color} font-bold `}>{value.toFixed(2)}x</h2>
        <div className='mb-4'>
            {showCashout && <Target target={target}/>}
        </div>
    </div>
    )
};

export default Multiplier;
