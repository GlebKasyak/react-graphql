import { Request } from "express";

import { Event } from "../models";
import { ErrorHandler } from "../utils/error";
import { CreateEventData } from "../interfaces/EventInterfaces";

export default {
    events: async (args: null, req: Request) => {
        try {
            if(!req.isAuth) {
                throw new Error("Unauthenticated!");
            }

            const events = await Event.aggregate([
                {
                    $lookup: {
                        from: "users",
                        let: { "userId": "$creator" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$$userId", "$_id"] } } },
                            {
                                $lookup: {
                                    from: "events",
                                    let: { "creatorId": "$_id" },
                                    pipeline: [
                                        { $match: { $expr: { $eq: ["$$creatorId", "$creator"] } } },
                                    ],
                                    as: "createdEvents"
                                }
                            },
                            { $project: { password: 0 } },
                        ],
                        as: "creator"
                    }
                },
                { $sort: { createdAt: -1 } },
                { $unwind: "$creator" }
            ])
            if(!events) {
                throw new Error("Error! Events not found!");
            }
            return events;
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    },
    createEvent: async ({ eventInput }: { eventInput: CreateEventData }, req: Request) => {
        try {
            if(!req.isAuth) {
                throw new Error("Unauthenticated!");
            }

            const event = await Event.create({ ...eventInput, creator: req.user._id });
            if(!event) {
                throw new Error("Error! Event does not created!");
            }

            return await event.populate("creator").execPopulate();
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    },
    deleteEvent: async ({ eventId }: { eventId: string }, req: Request) => {
        try {
            if(!req.isAuth) {
                throw new Error("Unauthenticated!");
            }

            const deletedEvent = await Event.findOneAndRemove({ _id: eventId });
            if(!deletedEvent) {
                throw new Error("Error!Event was not deleted");
            }

            return deletedEvent;
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    }
}