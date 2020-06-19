import { buildSchema } from "graphql";

import { EventTypes, EventQueries, EventMutations } from "./EventSchema";
import { UserTypes, UserQueries, UserMutations } from "./UserSchema";
import { BookingTypes, BookingQueries, BookingMutations } from "./BookingSchema";

export default buildSchema(`
    ${ EventTypes }
    ${ UserTypes }
    ${ BookingTypes }
   
    type RootQuery {
        ${ EventQueries }
        ${ UserQueries }
        ${ BookingQueries }
    }
    
    type RootMutation {
        ${ EventMutations }
        ${ UserMutations }
        ${ BookingMutations }
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);