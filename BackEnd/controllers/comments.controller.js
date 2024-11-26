import Comment from "../models/comments.model.js";
import User from "../models/users.model.js";
import Blogs from "../models/blogs.model.js";

export const createComment = async (req, res) => {
    try {
        const { blogId, content } = req.body;
        const user = req.user;
        const userId = user.id;

        if (!content || !blogId || !userId) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        const newComment = await Comment.create({
            content,
            blog: blogId,
            user: userId,
        })

        await Blogs.findByIdAndUpdate(blogId, {
            $push: { comments: newComment._id },
        });

        await User.findByIdAndUpdate(userId, {
            $push: { comments: newComment._id },
        });

        res.status(201).json({
            message: "Comment created successfully.",
            comment: newComment,
          });

    } catch (error) {
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

export const getCommentsForBlog = async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!blogId) {
      return res.status(400).json({ message: "Blog ID is required." });
    }

    const blog = await Blogs.findById(blogId).populate({
      path: 'comments', 
      populate: {
        path: 'user', 
        select: 'name'
      }
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.status(200).json({
      message: "Comments fetched successfully.",
      comments: blog.comments
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message
    });
  }
};
