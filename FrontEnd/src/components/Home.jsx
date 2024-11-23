import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import Blog from './Blog';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';

const Home = () => {
  const el = useRef(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [blogs, setBlogs] = useState([]);
;

  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await axios.get("http://localhost:3000/blog/all");

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
    }

    fetch();
  }, []);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Welcome to Agora.', 'Your Voice, Amplified.', 'Where Words Weave Worlds.'],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="p-6 justify-center items-center">
      <div className="text-center p-4 my-4">
        <h1 className="text-4xl md:text-6xl sm:text-3xl font-bold text-[#3bf8eb]">
          <span ref={el} />
        </h1>
        <Link to={isLoggedIn ? "/create-blog" : "/login"}>
          <button className='p-2 border border-white rounded-xl bg-gray-900 my-11 hover:bg-gray-800 hover:border-2 transition-transform ease-in-out duration-200'>
            Create Your Own Blog
          </button>
        </Link>
      </div>
      <div className='text-center p-4 my-4'>
        Welcome to Agora, your space for inspiration and thoughtful conversations. Here, we dive into a world of ideas, stories, and insights that aim to spark curiosity and foster connection. Whether you're seeking in-depth analyses or casual musings, Agora is the place where words come to life. Join us in exploring diverse perspectives and sharing your own voice, as we build a community centered around creativity, knowledge, and expression.
      </div>
      <div className='p-4 my-2'>
        <h2 className='md:text-3xl sm:text-xl font-bold text-[#3bf8eb]'>RECENT BLOGS</h2>
        <div className='container mx-auto p-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
            {blogs.length > 0 ? (
              blogs.slice(0, 6).map((blog, index) => ( // Limit to the first 6 blogs
                <div key={index} className='m-2 p-2' >
                  <Blog 
                    name={blog.author ? blog.author.name : 'Unknown'}
                    title={blog.title} 
                    content={blog.content}
                    date={blog.createdAt} 
                    authorId={blog.author ? blog.author._id : null}
                    id={blog._id}
                  />
                </div>
              ))
            ) : (
              <p>No blogs available at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
