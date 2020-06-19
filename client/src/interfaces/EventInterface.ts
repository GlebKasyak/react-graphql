import { User } from "./UserInterface";

export type EventType = {
    _id?: string,
    title: string,
    description: string,
    price: number,
    createdAt?: string,
    creator?: User;
}

export type BookingType = {
    _id?: string
    event: EventType
    user?: User
    createdAt: string
}