import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SiAgora } from "react-icons/si";

const SignUp = () => {
    
    const navigate= useNavigate();
    
    const [formData , setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) =>{
        const {name , value} = e.target;
        setFormData({...formData , [name] : value })
    }

    const handleSubmit = async (e) => {
        console.log("function called");
        e.preventDefault();
    
        try {
            if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
                alert("PLEASE FILL ALL THE FIELDS");
            } else if (formData.password !== formData.confirmPassword) {
                alert("PASSWORDS DO NOT MATCH");
            } else {
                const resp = await axios.post("https://agora-1-dafa.onrender.com/user/register", formData);
                if (resp.status === 400) {
                    alert(resp.data.message);
                } else if (resp.status === 200) {
                    alert("USER HAS BEEN REGISTERED SUCCESSFULLY, LOGIN NOW TO CONTINUE");
                    navigate("/login");
                }
            }
        } catch (error) {
            console.error("Error during registration:", error);
            if (error.response) {
                alert(error.response.data.message || "An error occurred during registration.");
            } else if (error.request) {
                alert("No response from server. Please try again later.");
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };

    useEffect(()=>{
        console.log(formData)
    },[formData]);

    return (
        <div className='flex flex-col justify-center items-center p-11'>
            <SiAgora className='text-cyan-400 text-9xl'/>
            <div className='bg-gradient-to-tl w-full max-w-md from-zinc-800 to-zinc-900 border-2 justify-center border-cyan-400  rounded-2xl p-6 flex flex-col'>
                <div className='text-center mb-6'>
                    <h1 className='text-2xl font-extrabold text-cyan-200'>Welcome to Agora</h1>
                    <h2 className='text-xl font-bold text-cyan-300'>Your words, your stories—unleash the power of your voice today!</h2>
                </div>
                <form className='space-y-4 flex flex-col' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Enter Your Name</label>
                        <input required name='name' value={formData.name} onChange={handleChange} type="text" placeholder='John Doe' className='mt-1 block w-full px-4 py-2 border border-gray-300 text-black rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500' />
                    </div>
                    <div>
                        <label htmlFor="email">Enter Your Email</label>
                        <input required name='email' type="email" value={formData.email} onChange={handleChange} placeholder='sample@example.com' className='mt-1 block w-full px-4 py-2 border border-gray-300 text-black rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500' />
                    </div>
                    <div>
                        <label htmlFor="password">Enter Your Password</label>
                        <input required name='password' value={formData.password} onChange={handleChange} type="password" placeholder='******' className='mt-1 block w-full px-4 py-2 border border-gray-300 text-black rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500' />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input required name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} type="password" placeholder='******' className='mt-1 block w-full px-4 py-2 border border-gray-300 text-black rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500' />
                    </div>
                    <button className='mt-5 p-3 bg-slate-500 rounded-2xl hover:bg-slate-600 text-center' type='submit'>SignUp</button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-cyan-600 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
