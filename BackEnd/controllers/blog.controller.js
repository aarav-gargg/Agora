import Blogs from "../models/blogs.model.js";
import User from "../models/users.model.js";

export const createBlog = async (req,res) => {
    try {
        const {title , content} = req.body;

        const user = req.user

        const blog = new Blogs({title,content});
        const savedBlog = await blog.save();

        user.blogs.push(savedBlog._id);
        await user.save();

        res.status(201).json({
            message:"Blog created successfully",
            blog:savedBlog
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}