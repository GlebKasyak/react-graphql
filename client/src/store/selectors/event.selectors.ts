import { AppStateType } from "../reducers";

class EventSelectors {
    static getEvents = (state: AppStateType) => state.event.events;

    static getBookings = (state: AppStateType) => state.event.bookings;
}

export default EventSelectors;