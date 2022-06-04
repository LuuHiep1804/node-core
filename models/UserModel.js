import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
}, {
    collection: 'user'
});

export const UserModel = mongoose.model('user', userSchema);