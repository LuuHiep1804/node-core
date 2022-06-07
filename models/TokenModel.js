import mongoose, { Schema } from "mongoose";

const tokenSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    access: {
        type: String,
        required: true,
        trim: true
    },
    refresh: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true}, {
    collection: 'token'
});

export const TokenModel = mongoose.model('token', tokenSchema);