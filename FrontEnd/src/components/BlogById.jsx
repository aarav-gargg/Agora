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
  const [isEditing, setIsEditing] = useState(null);
  const [editContent, setEditContent] = useState("");
  const userId = localStorage.getItem("id");

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
        `https://agora-1-dafa.onrender.com/comment/create`,
        { blogId: id, content: commentContent },
        { headers }
      );
      if (response.status === 201) {
        setCommentContent("");
        fetchComments();
      }
    } catch (error) {
      alert("Failed to add comment. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.post(
        `https://agora-1-dafa.onrender.com/comment/delete/${commentId}`,
        { blogId: id },
        { headers }
      );
      if (response.status === 201) {
        alert("Comment deleted successfully.");
        fetchComments();
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the comment.");
    }
  };

  const handleEditComment = (comment) => {
    setIsEditing(comment._id);
    setEditContent(comment.content);
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    if (!editContent.trim()) {
      alert("Updated content cannot be empty!");
      return;
    }
    try {
      const response = await axios.put(
        `https://agora-1-dafa.onrender.com/comment/update/${isEditing}`,
        { content: editContent },
        { headers }
      );
      if (response.status === 200) {
        alert("Comment updated successfully.");
        setIsEditing(null);
        fetchComments();
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the comment.");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.post(
        "https://agora-1-dafa.onrender.com/comment/get",
        { blogId: id }
      );
      if (response.status === 200) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching comments.");
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://agora-1-dafa.onrender.com/blog/blogByID/${id}`
        );
        if (response.status === 200) {
          setBlog(response.data.blog);
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching the blog.");
      }
    };
    fetchBlog();
    fetchComments();
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
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg p-4 flex flex-col space-y-4 md:flex-row md:justify-between"
                >
                  {isEditing === comment._id ? (
                    <form
                      onSubmit={handleUpdateComment}
                      className="flex flex-col w-full"
                    >
                      <textarea
                        className="w-full bg-zinc-900 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows="3"
                      ></textarea>
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
                          onClick={() => setIsEditing(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col md:flex-row w-full">
                      <div className="flex-1">
                        <p className="text-gray-100 font-bold">
                          {comment.content}
                        </p>
                        <span className="text-sm text-gray-500">
                          - {comment.user?.name || "Anonymous"}
                        </span>
                      </div>
                      {comment.user?._id === userId && (
                        <div className="flex space-x-4 mt-2 md:mt-0">
                          <button
                            onClick={() => handleEditComment(comment)}
                            className="text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">
              No comments yet. Be the first to comment!
            </p>
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
                Publish Comment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogById;
