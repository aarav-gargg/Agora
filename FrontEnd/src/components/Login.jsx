import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SiAgora } from "react-icons/si";
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { authActions } from '../store/auth.js';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData , setFormData] = useState({
        email : "",
        password : ""
    })

    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormData({...formData , [name] : value});
    }

    const handleSubmit = async (e) => {
        console.log("function called")
        e.preventDefault();

        try {
            if(!formData.email || !formData.password){
                alert("Please fill in all fields");
            }
            else{
                const resp = await axios.post("http://localhost:3000/user/login" , formData);
                if(resp.status == 400){
                    alert(resp.data.message);
                }
                else if(resp.status == 200){
                    localStorage.setItem("id" , resp.data.userId)
                    localStorage.setItem("token" , resp.data.token)
                    dispatch(authActions.login())
                    alert("USER LOGGED IN SUCCESSFULLY")
                    navigate("/")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center p-11'>
            <SiAgora className='text-cyan-400 text-9xl'/>
            <div className='bg-gradient-to-tl w-full max-w-md from-zinc-800 to-zinc-900 border-2 justify-center border-cyan-400  rounded-2xl p-6 flex flex-col'>
                <div className='text-center mb-4'>
                    <h1 className='text-2xl font-extrabold text-cyan-200'>Welcome back to Agora</h1>
                    <h2 className='text-xl font-bold text-cyan-300'>Login now to Continue</h2>
                </div>
                <form className='space-y-4 flex flex-col' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Enter your Email</label>
                        <input type="text" value={formData.email}  
                        onChange={handleChange} name='email' className='mt-1 block w-full px-4 py-2 border border-gray-300 text-black rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500' placeholder='example@sample.com' />
                    </div>
                    <div>
                        <label htmlFor="password">Enter Your Password</label>
                        <input required value={formData.password} onChange={handleChange} name='password' type="password" placeholder='******' className='mt-1 block w-full px-4 py-2 border border-gray-300 text-black rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500' />
                    </div>
                    <button className='mt-5 p-3 bg-slate-500 rounded-2xl hover:bg-slate-600 text-center' type='submit'>Login</button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-cyan-600 hover:underline">
                        SignUp
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
