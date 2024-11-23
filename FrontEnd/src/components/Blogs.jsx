import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegUser } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const resp = await axios.get("http://localhost:3000/blog/all");
        console.log(resp);
        if (resp.status === 200) {
          setBlogs(resp.data.allBlogs);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        if (error.response) {
          alert(error.response.data.message || "An error occurred during fetch.");
        } else if (error.request) {
          alert("No response from server. Please try again later.");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      }
    };

    fetchBlogs();
  }, []);


  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="flex flex-col p-6 justify-center items-center min-h-screen">
      <div className="text-center px-4 my-6">
        <h2 className="font-mono font-extrabold text-4xl md:text-5xl my-5 text-cyan-600">
          TOP BLOG POSTS
        </h2>
        <hr className="w-2/3 mx-auto border-t-2 border-[#3bf8eb] my-4" />
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.slice(0, 6).map((blog, index) => (
              <div
                data-aos="zoom-in"
                key={index}
                className="p-4 border rounded-lg shadow-lg bg-gradient-to-tl from-zinc-800 to-zinc-900 hover:shadow-xl transition-shadow duration-300 cursor-pointer hover:border-2"
              >
                <div className="flex items-center mb-4">
                  <FaRegUser className="text-2xl text-gray-200 mr-3" />
                  <span className="text-lg font-semibold text-gray-600">
                    {blog.author?.name || "Unknown Author"}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-200 mb-2">
                  {blog.title}
                </h3>

                <p className="text-gray-400 line-clamp-3 mb-4">
                  {blog.content}
                </p>

                <p className="text-sm text-gray-500">
                  Published on: {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No blogs available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
