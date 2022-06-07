import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
    collection: 'tokens'
});

export const TokenModel = mongoose.model('tokens', tokenSchema);