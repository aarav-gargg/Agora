import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import dotnev from 'dotenv'
import userRoutes from "./routes/user.route.js"
import blogRoutes from "./routes/blog.route.js"


const app = express();

dotnev.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB")
})

app.use(cors());
app.use(express.json());

app.use("/user" , userRoutes);
app.use("/blog" , blogRoutes);

app.listen(3000 , ()=>{
    console.log('Server is running on port 3000');
})