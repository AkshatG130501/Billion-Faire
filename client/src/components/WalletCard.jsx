import React, {useState} from 'react'
import { ethers } from 'ethers'


function MetaMask() {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState('');
    const [userBalance, setUserBalance] = useState('');
    const [text, setText] = useState('Connect Wallet');

    const connectWallet = async () => {
        if(window.ethereum){
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(result => {
                accountChanged([result[0]]);
                setText('Wallet Connected');
            })
        }else{
            setErrorMessage('Please install MetaMask!');
        }
    }

    const accountChanged = (accountName) => {
        setDefaultAccount(accountName);
        getUserBalance(accountName);
    }

    const getUserBalance = (accountAddress) =>{
        window.ethereum.request({ method: 'eth_getBalance', params: [String(accountAddress), 'latest'] })
        .then(balance => {
            setUserBalance(ethers.formatEther(balance));
        })
    }

    async function sendTransaction() {
        let params = [{
            from : defaultAccount[0],
            to: '0x0762CA9f24F3E09A350bD867279D66290d712315',
            gas: Number(21000).toString(16),
            gasPrice: Number(2500000).toString(16),
            value: Number(1000000000000000).toString(16),
        }]

        await window.ethereum.request({ method: 'eth_sendTransaction', params}).catch((err)=>{
            console.log(err);
        })
    }

  return (
    <div className='flex flex-col items-center ml-[550px] mt-[150px] w-[500px] h-[400px] bg-slate-900 rounded shadow-lg'>
        <button className='w-[150px] h-[40px] bg-gray-500 text-white mt-3 rounded' onClick={connectWallet}>{text}</button>
        <div className='flex flex-col justify-center items-center mt-5 space-y-4'>
            <div className='flex flex-col'>
                <label className='text-gray-300' htmlFor="">Account Address</label>
                <input value={defaultAccount} className='w-[450px] rounded h-[35px] pl-2' type="text" readOnly/>
            </div>
            <div className='flex flex-col'>
                <label className='text-gray-300' htmlFor="">Balance</label>
                <input value={userBalance} className='w-[450px] rounded h-[35px] pl-2' type="text" readOnly/>
            </div>
        </div>
        <div>
            <div className='flex flex-col mt-3'>
                <label className='text-gray-300' htmlFor="">Deposit Amount</label>
                <input placeholder='0.00' className='w-[450px] rounded h-[35px] pl-2' type="number"/>
            </div>
            <form >
            <input type='submit' className='text-lg w-[450px] h-[45px] bg-green-600 rounded mt-10' value='Deposit'/>
            </form>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  )
}

export default MetaMask