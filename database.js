import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.DATABASE_URL;

export const connectDB = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true , useUnifiedTopology: true });
        console.log("Connect DB sucessfully!");
    } catch (error) {
        console.log("Connect DB Failure!");
    }
}