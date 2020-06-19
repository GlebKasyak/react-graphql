import axios from "axios";

import { EventType } from "../interfaces/EventInterface";
import { ServerEndpoints } from "../shared/constants/commons";

class EventAPI {
    static getEvents = () => {
        const requestBody = {
            query: `
                query {
                  events {
                    _id
                    title
                    description
                    price
                    createdAt
                     creator {
                        _id
                        email
                    }
                  }
                }
            `
        };

        return axios.post(ServerEndpoints.graphql, JSON.stringify(requestBody));
    };

    static createEvent = (event: EventType) => {
        const { title, description, price } = event;
        const requestBody = {
            query: `
              mutation CreateEvent($title: String!, $description: String!, $price: Float!) {
                createEvent(eventInput: { title: $title, description: $description, price: $price }) {
                    _id
                    title
                    description
                    price
                    createdAt
                    creator {
                        _id
                        email
                    }
                }
              }
           `,
            variables: {
                title,
                description,
                price: Number(price)
            }
        };

        return axios.post(ServerEndpoints.graphql, JSON.stringify(requestBody));
    };

    static deleteEvent = (eventId: string) => {
       const requestBody = {
           query: `
              mutation {
                deleteEvent(eventId: "${ eventId }") {
                    _id
                }
              }
           `
       };

       return axios.post(ServerEndpoints.graphql, JSON.stringify(requestBody));
    };

    static bookEvent = (eventId: string) => {
        const requestBody = {
            query: `
              mutation {
                bookEvent(eventId: "${ eventId }") {
                    _id
                    event {
                        _id
                        title
                        description
                        price
                        createdAt
                    }
                    createdAt
                }
              }
           `
        };

        return axios.post(ServerEndpoints.graphql, JSON.stringify(requestBody));
    };

    static getBookings = () => {
        const requestBody = {
            query: `
              query {
                bookings {
                    _id
                    event {
                        _id
                        title
                        description
                        price
                        createdAt
                    }
                    createdAt
                }
              }
           `
        };

        return axios.post(ServerEndpoints.graphql, JSON.stringify(requestBody));
    };

    static cancelBooking = (bookingId: string) => {
        const requestBody = {
            query: `
              mutation CancelBooking($id: ID!) {
                cancelBooking(bookingId: $id) {
                    _id
                }
              }
           `,
            variables: {
                id: bookingId
            }
        };

        return axios.post(ServerEndpoints.graphql, JSON.stringify(requestBody));
    };
};

export default EventAPI;

