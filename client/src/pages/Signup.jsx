import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import useSignup  from '../hooks/useSignup'

function Signup() {

    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: ''
    })

    const {loading, signup} = useSignup();

    const handleSubmit = async(e) => {
        e.preventDefault()
        await signup(inputs);
    }

    return (
        <div className='flex flex-col ml-[550px] mt-[150px] w-[500px] h-[450px] bg-slate-900 rounded shadow-lg'>
            <div className='flex justify-center text-white font-bold text-3xl mt-3'>SignUp</div>
            <form onSubmit={handleSubmit}>
            <div className='flex flex-col justify-center items-center mt-5 space-y-4'>
                <div className='flex flex-col'>
                    <label className='text-gray-300' htmlFor="">Email<span className="text-red-500">*</span></label>
                    <input value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})} className='pl-2 w-[450px] rounded h-[35px]' type="email"/>
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-300' htmlFor="">Username<span className="text-red-500">*</span></label>
                    <input value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} className='pl-2 w-[450px] rounded h-[35px]' type="text"/>
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-300' htmlFor="">Password<span className="text-red-500">*</span></label>
                    <input value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} className='pl-2 w-[450px] rounded h-[35px]' type="password"/>
                </div>
            </div>
            <div className='flex justify-center mt-10'>
                <button type='submit' className='text-lg w-[450px] h-[45px] bg-green-600 rounded' disabled={loading}>
                {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}    
                </button>
            </div>
            </form>
            <div>
                <p className='text-white text-center mt-5'>Already have an account? <Link to={"/"} className='text-blue-500'>Login</Link></p>
            </div>
        </div>
    )
}

export default Signup