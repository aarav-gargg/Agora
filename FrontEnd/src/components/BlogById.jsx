import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";


const BlogById = () => {
  const [blog, setBlog] = useState(null); 
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/comment/create`,
        {
          blogId: id,
          content: commentContent,
        },
        { headers }
      );
      if (response.status === 201) {
        setCommentContent("");
        window.location.reload();
      }
    } catch (error) {
      alert("Failed to add comment. Please try again.");
    }
  };

  useEffect(()=>{
    const fetchComments = async () => {
      try {
        const resp = await axios.post("http://localhost:3000/comment/get" , {
          blogId : id
        });
        if(resp.status == 200){
          setComments(resp.data.comments)
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
    }
    fetchComments();
  },[])
  

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/blog/blogByID/${id}`
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
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
          Comments
        </h2>
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((comment, index) => (
              <li
                key={index}
                className="bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg p-4"
              >
                <p className="text-gray-100 font-bold">{comment.content}</p>
                <span className="text-sm text-gray-500">
                  - {comment.user?.name || "Anonymous"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p className="text-gray-400">No comments yet. Be the first to comment!</p>
          <p className="text-gray-400">Note : You have to login to be able to comment</p>
          </div>
        )}
        {isLoggedIn && (
          <form
            onSubmit={handleCommentSubmit}
            className="mt-6 bg-zinc-800 p-6 rounded-lg shadow-lg"
          >
            <textarea
              className="w-full bg-zinc-900 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Write your comment here..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition"
            >
              Submit Comment
            </button>
          </form>
        )}
      </div>
    </div>
  </div>
  );
};

export default BlogById;
