import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import bookRoutes from './routes/book.js';
import userRoutes from './routes/auth.js';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';


dotenv.config()
const app=express();

app.use(cors());
app.use(express.json())
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("api is running")
})

app.use('/books', bookRoutes);
app.use('/user', userRoutes);

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });