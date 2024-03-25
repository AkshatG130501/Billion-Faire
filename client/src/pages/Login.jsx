import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const {loading, login} = useLogin();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await login(email, password);
    }

  return (
    <div className='flex flex-col ml-[550px] mt-[150px] w-[500px] h-[400px] bg-slate-900 rounded shadow-lg'>
        <div className='flex justify-center text-white font-bold text-3xl mt-3'>Login</div>
        <form onSubmit={handleSubmit}>
        <div className='flex flex-col justify-center items-center mt-5 space-y-4'>
            <div className='flex flex-col'>
            <label className='text-gray-300' htmlFor="">Email<span className="text-red-500">*</span></label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-[450px] rounded h-[35px]' type="email"/>
            </div>
            <div className='flex flex-col'>
            <label className='text-gray-300' htmlFor="">Password<span className="text-red-500">*</span></label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className='w-[450px] rounded h-[35px]' type="password"/>
            </div>
        </div>
        <div className='flex justify-center mt-10'>
            <button className='text-lg w-[450px] h-[45px] bg-green-600 rounded' disabled={loading}>
            {loading ? <span className='loading loading-spinner '></span> : "Login"}
            </button>
        </div>
        </form>
        <div>
            <p className='text-white text-center mt-5'>Don't have an account? <Link to={"/signup"} className='text-blue-500'>Signup</Link></p>
        </div>
    </div>
  )
}

export default Login