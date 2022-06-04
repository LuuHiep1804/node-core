import mongoose from "mongoose";

const URI = 'mongodb://localhost:27017/fetch-project-training';

export const connect = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true , useUnifiedTopology: true });
        console.log("Connect sucessfully!");
    } catch (error) {
        console.log("Connect Failure!");
    }
}