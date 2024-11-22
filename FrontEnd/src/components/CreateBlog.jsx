import React, { useState } from 'react';
import axios from "axios";

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        userId : localStorage.getItem("id")
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
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:3000/blog/create', formData, { headers });
            console.log(response)
            if (response.status == 201) {
                alert("BLOG CREATED SUCCESSFULLY")
            }
            setFormData({ title: "", description: "" });
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
    return (
        <div>
            <div className='flex items-center justify-center p-10 flex-col'>
                <div className="text-center px-4">
                    <h2 className="font-mono font-extrabold text-4xl md:text-5xl my-5">
                        CREATE YOUR BLOG
                    </h2>
                    <p className="mt-3 text-lg md:text-xl text-[#C5C6C7] leading-relaxed">
                        Share your thoughts, experiences, and ideas with the world! Create a
                        blog that captivates your audience and showcases your unique voice.
                    </p>
                    <hr className="w-2/3 mx-auto border-t-2 border-[#3bf8eb] my-4" />
                </div>

                <div className="text-center px-6 md:px-12 lg:px-24">
                    <h3 className="font-mono font-bold text-2xl md:text-3xl my-4 text-[#3bf8eb]">
                        How to Create an Impactful Blog Post
                    </h3>
                    <p className="text-lg leading-relaxed text-[#C5C6C7]">
                        Writing a blog is an art that allows you to connect, inspire, and
                        share your unique perspective with the world. A great blog should
                        captivate your audience with a compelling introduction, set the tone
                        with a clear purpose, and maintain flow with well-structured content.
                        Use authentic, relatable language to convey your ideas and back them
                        with facts, examples, or personal anecdotes to build credibility.
                        Don’t forget to engage your readers by asking questions or offering
                        solutions that resonate with their needs. Keep your paragraphs
                        concise, use headings to guide the reader, and sprinkle in visuals or
                        quotes to add depth. Above all, write from the heart—your passion and
                        authenticity will shine through and leave a lasting impression on
                        your audience.
                    </p>
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
                            Publish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBlog
