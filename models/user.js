import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: true
    },
    last_name: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: [ isEmail, 'invalid email' ],
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
})

export const User = mongoose.model(`User`, userSchema)