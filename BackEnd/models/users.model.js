import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      blogs: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Blogs",
        },
      ],
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
  

const User = mongoose.model("User" , userSchema);

export default User;