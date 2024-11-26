import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
    },
    {
      timestamps: true,
    }
  );
  

const Blogs = mongoose.model("Blogs" , blogSchema);

export default Blogs;