import mongoose from "mongoose";

const URI = 'mongodb://localhost:27017/fetch-project-training';

export const connectDB = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true , useUnifiedTopology: true });
        console.log("Connect DB sucessfully!");
    } catch (error) {
        console.log("Connect DB Failure!");
    }
}