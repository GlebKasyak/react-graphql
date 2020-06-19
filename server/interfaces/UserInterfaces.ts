import { Document, Model } from "mongoose";

export interface IUserDocument extends Document {
    email: string,
    password: string,

    generateAuthToken: () => Promise<TokenData>
};

export interface IUserModel extends Model<IUserDocument> {
    findByCredentials: (email: string, password: string) => Promise<IUserDocument>
};

type TokenData = {
    token: string,
    tokenExpiration: number
};

