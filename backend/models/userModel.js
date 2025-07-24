import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
            minLength: 6,
            select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true

        }
    },
    refreshToken: {
        type: String,
        default: null,
        select: false
    },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpire: { type: Date, default: null },
}, { timestamps: true }); 

const User = mongoose.model("User", userSchema);

export default User;