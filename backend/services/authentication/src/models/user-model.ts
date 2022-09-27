import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

interface UserDocument {
    username: string;
    email: string;
    password: string;
    role: string;
    accountActive: boolean;
    accountVerified: boolean;

    comparePasswords: (enteredPassword: string) => Promise<boolean>;
    getAuthenticationToken: () => Promise<void>;
}

// Working on the auth feature branch
const UserSchema = new mongoose.Schema<UserDocument>({
    
    // username of the user
    username: {
        type: String,
        required: true,
        minlength: [5, "Username must be at least 5 characters long"],
        maxlength: [20, "Username must be at least 20 characters long"],
        trim: true
    },

    // User's e-mail address
    email: {
        type: String,
        required: true,
        unique: true
    },

    // The user's password
    password: {
        type: String
    }

}, {timestamps: true});

// @description: Before saving a user to the database, hash their password
UserSchema.pre('save', async function(next) {
    // Hash User's Current Password
})

UserSchema.methods.comparePasswords = async function(enteredPassword: string): Promise<boolean> {
    return await false;
}

export default UserSchema;//test