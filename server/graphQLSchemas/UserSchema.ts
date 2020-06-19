
export const UserTypes = `
    type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
    }
    
    type LoginData {
        token: String!
        tokenExpiration: Int!
    }
    
    type RegisterData {
      registered: Boolean!  
    }
    
    input UserInput {
        email: String!
        password: String!
    }
`;

export const UserQueries = `
    login(email: String!, password: String!): LoginData!
    auth: User!
`;

export const UserMutations = `
    register(userInput: UserInput): RegisterData!
`;