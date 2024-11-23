import React from 'react'
import Blog from './Blog'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const YourBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { userId } = useParams();
  const [user, setUser] = useState("")
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await axios.get("http://localhost:3000/blog/userBlog", { headers });
        if (resp.status === 200) {
          setBlogs(resp.data.blogs.blogs);
          setUser(resp.data.blogs.name)
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
    }

    fetch();
  }, []);
  
  return (
    <div>
      <div className='flex items-center justify-center p-10 flex-col'>
        <div className="text-center px-4">
          <h2 className="font-mono font-extrabold text-4xl md:text-5xl my-5">
            YOUR BLOG POSTS
          </h2>
          <hr className="w-2/3 mx-auto border-t-2 border-[#3bf8eb] my-4" />
        </div>

        <div className='container mx-auto p-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <div key={index} className='m-2 p-2'>
                  <Blog
                    name={user ? user : 'Unknown'}
                    title={blog.title}
                    content={blog.content}
                    date={blog.createdAt}
                    authorId={userId}
                    id={blog._id}
                  />
                </div>
              ))
            ) : (
              <p>You have not published any blog yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourBlogs
