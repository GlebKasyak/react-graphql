import { Request } from "express";

import { User } from "../models";
import { ErrorHandler } from "../utils/error";
import { IUserDocument } from "../interfaces/UserInterfaces";

export default {
    users: async (args: null, req: Request) => {
        try {
            if(!req.isAuth) {
                throw new Error("Unauthenticated!");
            }

            const users = User.find({});
            if(!users) {
                throw new Error("Error! Users not found!");
            }
            return users;
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    },
    auth: async (args: null, req: Request) => {
        try {
            if(!req.isAuth) {
                throw new Error("Unauthenticated!");
            };

            return { ...req.user.toObject(), password: null, createdEvents: [] }
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    },
    register: async ({ userInput }: { userInput: IUserDocument }) => {
        try {
            const user = await User.create(userInput);
            if(!user) {
                throw new Error;
            }

            return { registered: true };
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    },
    login: async ({ email, password }: { email: string, password: string }) => {
        try {
            const user = await User.findByCredentials(email, password);
            return await user.generateAuthToken();
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    }
}