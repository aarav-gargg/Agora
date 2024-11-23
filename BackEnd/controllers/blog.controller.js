import Blogs from "../models/blogs.model.js";
import User from "../models/users.model.js";
import mongoose from "mongoose";


export const updateBlog = async (req, res) => {
    try {
        const { title, content} = req.body;
        const { id } = req.params;

        const user = req.user

        const blog = await Blogs.findById(id);

        if(blog.author != user.id){
            return res.status(404).json({
                message : "YOU ARE NOT AUTHORIZED TO UPDATE THE BLOG"
            })
        }

        const updatedBlog = await Blogs.findByIdAndUpdate(id, { title, content }, { new: true });

        if (!updatedBlog) {
            return res.status(400).json({ message: "No such blog exists" });
        }

        return res.status(200).json({
            message: "Blog updated successfully",
            updatedBlog
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await Blogs.find().populate({
            path : "author",
            options: { sort: { createdAt: -1 } }
        });
        return res.status(200).json({
            message: "Blogs fetched successfully",
            allBlogs
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export const getUserBlogs = async (req, res) => {
    try {
        const user = req.user;
        const userId = user.id;

        const userBlogs = await User.findById(userId).populate({
            path: 'blogs',
            options: { sort: { createdAt: -1 } }
        });

        if (!userBlogs || userBlogs.blogs.length === 0) {
            return res.status(404).json({
                message: "No blogs found for this user"
            });
        }

        return res.status(200).json({
            message: "Blogs fetched successfully",
            blogs: userBlogs.blogs
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;

        if (!mongoose.isValidObjectId(blogId)) {
            return res.status(400).json({ message: "Invalid blog ID" });
        }

        const blog = await Blogs.findById(blogId);

        if (!blog) {
            return res.status(400).json({
                message: "No such blog exists"
            });
        }

        return res.status(200).json({
            message: "Blog fetched successfully",
            blog
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("id" , id)

        const user = req.user;

        // if (foundedUser.role !== 'Admin') {
        //     return res.status(403).json({
        //         message: "You are not authorized to delete the post"
        //     });
        // }

        const blog = await Blogs.findById(id);

        if(blog.author != user.id){
            return res.status(404).json({
                message : "YOU ARE NOT AUTHORIZED TO DELETE THE BLOG"
            })
        }

        const deletedBlog = await Blogs.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(400).json({
                message: "No such blog exists"
            });
        }
        await User.findByIdAndUpdate(user.id, {
            $pull: { blogs: id } 
        });
        return res.status(200).json({
            message: "Blog deleted successfully"
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export const createBlog = async (req, res) => {
    try {
        const { title, description , userId } = req.body;

        const user = req.user;

        const blog = new Blogs({ title, content : description , author : userId});
        const savedBlog = await blog.save();

        user.blogs.push(savedBlog._id);
        await user.save();

        res.status(201).json({
            message: "Blog created successfully",
            blog: savedBlog
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
