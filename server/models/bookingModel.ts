import { Schema, model, Types, Model } from "mongoose";

import { IBooking } from "../interfaces/BookingInterfaces";

const BookingSchema = new Schema({
    event: {
        type: Types.ObjectId,
        ref: "Event"
    },
    user: {
        type: Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

export default model<IBooking, Model<IBooking>>("Booking", BookingSchema);