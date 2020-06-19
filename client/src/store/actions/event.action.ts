import * as eventTypes from "../types/eventTypes";
import { EventType, BookingType } from "../../interfaces/EventInterface";

export const eventActions = {
    getEventsRequest: () => ({ type: eventTypes.GET_EVENTS_REQUEST } as const),
    getEventsSuccess: (payload: Array<EventType>) => ({ type: eventTypes.GET_EVENTS_SUCCESS, payload } as const),

    deleteEventRequest: (payload: string) => ({ type: eventTypes.DELETE_EVENT_REQUEST, payload } as const),
    deleteEventSuccess: (payload: string) => ({ type: eventTypes.DELETE_EVENT_SUCCESS, payload } as const),

    createEventRequest: (payload: EventType) => ({ type: eventTypes.CREATE_EVENT_REQUEST, payload } as const),
    createEventSuccess: (payload: EventType) => ({ type: eventTypes.CREATE_EVENT_SUCCESS, payload } as const),

    getBookingsRequest: () => ({ type: eventTypes.GET_BOOKINGS_REQUEST } as const),
    getBookingsSuccess: (payload: Array<BookingType>) => ({ type: eventTypes.GET_BOOKINGS_SUCCESS, payload } as const),

    bookEventRequest: (payload: string) => ({ type: eventTypes.BOOK_EVENT_REQUEST, payload } as const),
    bookEventSuccess: (payload: BookingType) => ({ type: eventTypes.BOOK_EVENT_SUCCESS, payload } as const),

    cancelBookingEventRequest: (payload: string) => ({ type: eventTypes.CANCEL_BOOKING_EVENT_REQUEST, payload } as const),
    cancelBookingEventSuccess: (payload: string) => ({ type: eventTypes.CANCEL_BOOKING_EVENT_SUCCESS, payload } as const)
}