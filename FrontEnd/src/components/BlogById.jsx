import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";

const BlogById = () => {
  const [blog, setBlog] = useState(null); // Initial state set to null
  const { id } = useParams();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/blog/blogByID/${id}`,
          { headers }
        );
        if (response.status === 200) {
          setBlog(response.data.blog);
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message || "An error occurred during fetch.");
        } else if (error.request) {
          alert("No response from server. Please try again later.");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <div className="container mx-auto py-8 px-4 lg:px-20">
        <div className="bg-gradient-to-tr from-zinc-900 to-zinc-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-cyan-400">
            {blog.title}
          </h1>
          <div className="flex items-center mb-6">
            <FaRegUser className="text-2xl text-gray-400 mr-3" />
            <span className="text-lg font-medium">
              {blog.author?.name || "Unknown Author"}
            </span>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg mb-6 whitespace-pre-line">
            {blog.content}
          </p>
          <p className="text-sm text-gray-500">
            Published on: {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogById;
