
export const BookingTypes = `
    type Booking {
       _id: ID!
       event: Event!
       user: User!
       createdAt: String!
    }
`;

export const BookingQueries = `
     bookings: [Booking!]!
`;

export const BookingMutations = `
     bookEvent(eventId: ID!): Booking!
     cancelBooking(bookingId: ID!): Booking!
`;