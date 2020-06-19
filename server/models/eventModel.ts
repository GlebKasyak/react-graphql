import { Schema, model, Model, Types } from "mongoose";

import { IEvent } from "../interfaces/EventInterfaces";

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    creator: {
        type: Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    });

export default model<IEvent, Model<IEvent>>("Event", eventSchema);