import { Reducer } from "redux";

import * as eventTypes from "../types/eventTypes";
import { eventActions } from "../actions/event.action";
import { EventType, BookingType } from "../../interfaces/EventInterface";
import { InferActionsTypes } from "./index";


const initialState = {
    events: [] as Array<EventType>,
    bookings: [] as Array<BookingType>
};

type StateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof eventActions>;

const reducer: Reducer<StateType, ActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case eventTypes.GET_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.payload
            };
        case eventTypes.CREATE_EVENT_SUCCESS:
            return {
                ...state,
                events: [action.payload, ...state.events]
            };
        case eventTypes.DELETE_EVENT_SUCCESS:
            return {
                ...state,
                events: state.events.filter(event => event._id !== action.payload)
            };
        case eventTypes.BOOK_EVENT_SUCCESS:
            return {
                ...state,
                bookings: [action.payload, ...state.bookings]
            };
        case eventTypes.GET_BOOKINGS_SUCCESS:
            return {
                ...state,
                bookings: action.payload
            };
        case eventTypes.CANCEL_BOOKING_EVENT_SUCCESS:
            return {
                ...state,
                bookings: state.bookings.filter(booking => booking._id !== action.payload)
            };
        default:
            return state
    }
};

export default reducer;