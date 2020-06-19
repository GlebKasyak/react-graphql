import { Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { IUserDocument, IUserModel } from "../interfaces/UserInterfaces";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        min: 5,
        required: true,
        trim: true
    }
},
    {
    timestamps: true
});

userSchema.pre<IUserDocument>("save", async function(next) {
    const user = this;

    if(user.isModified("password")) {
        user.password = await hash(user.password, 15);
    }

    next();
});

userSchema.statics.findByCredentials = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if(!user) {
        throw new Error("User does not exist!");
    };

    const isMatch = await compare(password, user.password);
    if(!isMatch) {
        throw new Error("Password is incorrect, please try again");
    };

    return user;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this as IUserDocument;
    const token =  sign({ userId: user._id }, "graphql-key");

    return {
        token,
        tokenExpiration: 1
    }
};

const User = model<IUserDocument, IUserModel>("User", userSchema);
export default User;