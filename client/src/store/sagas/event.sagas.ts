import { call, put, takeEvery } from "redux-saga/effects";

import { EventAPI } from "../../apiServices";
import * as eventTypes from "../types/eventTypes";
import { Action } from "../../interfaces/common";
import { EventType } from "../../interfaces/EventInterface";
import { eventActions } from "../actions/event.action";
import { appActions } from "../actions/app.action";

function* getEvents() {
    try {
        yield put(appActions.setLoadingAC(true));

        const res = yield call(EventAPI.getEvents);
        yield put(eventActions.getEventsSuccess(res.data.data.events));

        yield put(appActions.setLoadingAC(false));
    } catch (err) {
        yield put(appActions.setErrorAC(err.errors[0].message));
    }
};

function* createEvent(action: Action<EventType>) {
    try {
        yield put(appActions.setLoadingAC(true));

        const res = yield call(EventAPI.createEvent, action.payload!);
        yield put(eventActions.createEventSuccess(res.data.data.createEvent));

        yield put(appActions.setLoadingAC(false));
    } catch (err) {
        yield put(appActions.setErrorAC(err.errors[0].message));
    }
};

function* deleteEvent(action: Action<string>) {
    try {
        yield put(appActions.setLoadingAC(true));

        const res = yield call(EventAPI.deleteEvent, action.payload!);
        yield put(eventActions.deleteEventSuccess(res.data.data.deleteEvent._id));

        yield put(appActions.setLoadingAC(false));
    } catch (err) {
        yield put(appActions.setErrorAC(err.errors[0].message));
    }
};

function* getBookings() {
    try {
        yield put(appActions.setLoadingAC(true));

        const res = yield call(EventAPI.getBookings);
        yield put(eventActions.getBookingsSuccess(res.data.data.bookings));

        yield put(appActions.setLoadingAC(false));
    } catch (err) {
        yield put(appActions.setErrorAC(err.errors[0].message));
    }
};

function* bookEvent(action: Action<string>) {
    try {
        yield put(appActions.setLoadingAC(true));

        const res = yield call(EventAPI.bookEvent, action.payload!);
        yield put(eventActions.bookEventSuccess(res.data.data.bookEvent));

        yield put(appActions.setLoadingAC(false));
    } catch (err) {
        yield put(appActions.setErrorAC(err.errors[0].message));
    }
};

function* cancelBookingEvent(action: Action<string>) {
    try {
        yield put(appActions.setLoadingAC(true));

        const res = yield call(EventAPI.cancelBooking, action.payload!);
        yield put(eventActions.cancelBookingEventSuccess(res.data.data.cancelBooking._id));

        yield put(appActions.setLoadingAC(false));
    } catch (err) {
        yield put(appActions.setErrorAC(err.errors[0].message));
    }
};

export default [
    takeEvery(eventTypes.GET_EVENTS_REQUEST, getEvents),
    takeEvery(eventTypes.CREATE_EVENT_REQUEST, createEvent),
    takeEvery(eventTypes.DELETE_EVENT_REQUEST, deleteEvent),
    takeEvery(eventTypes.GET_BOOKINGS_REQUEST, getBookings),
    takeEvery(eventTypes.BOOK_EVENT_REQUEST, bookEvent),
    takeEvery(eventTypes.CANCEL_BOOKING_EVENT_REQUEST, cancelBookingEvent)
];