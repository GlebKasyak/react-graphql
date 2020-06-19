import { Request } from "express";

import { Booking } from "../models";
import { ErrorHandler } from "../utils/error";

export default {
    bookEvent: async ({ eventId }: { eventId: string }, req: Request) => {
        try {
            if(!req.isAuth) {
                throw new Error("Unauthenticated!");
            }

            const booking = await Booking.create({ user: req.user._id, event: eventId });
            if(!booking) {
                throw new Error("Error! Event does not created!");
            }

            return await booking
                .populate("user", "-password")
                .populate("event")
                .execPopulate();
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    },
    bookings: async (args: null, req: Request) => {
        try {
            if(!req.isAuth) {
                throw new Error("Unauthenticated!");
            };

            const bookings = await Booking.aggregate([
                { $match: { user: req.user._id } },
                {
                    $lookup: {
                        from: "users",
                        let: { "userId": "$user" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$$userId", "$_id"] } } }
                        ],
                        as: "user"
                    }
                },
                { $unwind: "$user" },
                {
                    $lookup: {
                        from: "events",
                        let: { "eventId": "$event" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$$eventId", "$_id"] } } },
                            {
                                $lookup: {
                                    from: "users",
                                    localField: "creator",
                                    foreignField: "_id",
                                    as: "creator"
                                }
                            },
                            { $unwind: "$creator" }
                        ],
                        as: "event"
                    }
                },
                { $unwind: "$event" },
                { $sort: { createdAt: -1 } }
            ])

            if(!bookings) {
                throw new Error("Error!Bookings not found!");
            };

            return bookings;
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    },
    cancelBooking: async ({ bookingId }: { bookingId: string }, req: Request) => {
        try {
            if(!req.isAuth) {
                throw new Error("Unauthenticated!");
            };

            const booking = await Booking.findOneAndRemove({ _id: bookingId })
                .populate({ path: "event", populate: { path: "creator", select: "-password" } });

            if(!booking) {
                throw new Error("Error!Booking not deleted!")
            }
            return await booking.remove()
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    }
}