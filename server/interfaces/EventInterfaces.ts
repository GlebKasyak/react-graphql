import { Document } from "mongoose";

export interface IEvent extends Document {
    title: string,
    description: string,
    price: number,
    creator: string
}

export type CreateEventData = Omit<IEvent, "creator">;