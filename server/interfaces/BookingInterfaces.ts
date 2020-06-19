import { Document } from "mongoose";

export interface IBooking extends Document {
    user: string,
    event: string
}