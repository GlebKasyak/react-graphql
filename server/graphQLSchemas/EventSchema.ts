
export const EventTypes = `
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        createdAt: String!,
        creator: User!
    }
    
    input EventInput {
        title: String!
        description: String!
        price: Float!
    }
`;

export const EventQueries = `
     events: [Event!]!
`;

export const EventMutations = `
     createEvent(eventInput: EventInput): Event!
     deleteEvent(eventId: ID!): Event!
`;