import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const EditBlog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, title, content, authorId } = location.state || {};

    const [formData, setFormData] = useState({
        title: title || "",
        description: content || "",
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:3000/blog/update/${id}`,
                { title: formData.title, content: formData.description},
                { headers }
            );

            if(response.status == 404){
                alert("YOU ARE NOT AUTHORIZED TO UPDATE THIS BLOG")
                navigate("/")
            }

            if (response.status === 200) {
                alert("Blog updated successfully!");
                navigate("/")
            }
            
        } catch (error) {
            console.log(error)
                if (error.response) {
                    alert(error.response.data.message || "An error occurred during fetch.");
                } else if (error.request) {
                    alert("No response from server. Please try again later.");
                } else {
                    alert("An unexpected error occurred. Please try again.");
                }
        }
    };

    return (
        <div>
            <div className='flex items-center justify-center p-10 flex-col'>
                <div className="text-center px-4">
                    <h2 className="font-mono font-extrabold text-4xl md:text-5xl my-5">
                        EDIT YOUR BLOG
                    </h2>
                    <hr className="w-2/3 mx-auto border-t-2 border-[#3bf8eb] my-4" />
                </div>

                <form
                    onSubmit={handleSubmit} 
                    className="w-full max-w-2xl bg-[#222231] p-8 rounded-lg shadow-md mt-8 space-y-6"
                >
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-lg font-semibold text-gray-300 mb-2"
                        >
                            Blog Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter your blog title"
                            className="w-full p-3 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bf8eb]"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-lg font-semibold text-gray-300 mb-2"
                        >
                            Blog Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write a captivating description for your blog"
                            className="w-full h-32 p-3 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3bf8eb]"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#3bf8eb] hover:bg-[#2be7d9] hover:border-2 text-black font-bold text-lg py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105 duration-200"
                        >
                            EDIT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;
