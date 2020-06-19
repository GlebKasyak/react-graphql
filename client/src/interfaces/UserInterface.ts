import { EventType } from "./EventInterface";

export type User = {
    _id: string,
    email: string,
    password?: string,
    createdEvents: Array<EventType>
}

export type UserFormData = {
    email: string,
    password: string
}