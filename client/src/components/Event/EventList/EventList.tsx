import React, { FC } from "react";
import { Alert } from "@material-ui/lab";

import EventCard from "../EventCard/EventCard";
import EventForm from "../EventForm/EventFormContainer";

import { EventType } from "../../../interfaces/EventInterface";

type Props = {
   events: Array<EventType>
};

const EventList: FC<Props> = ({ events }) => (
    <>
        <EventForm />
        { !!events.length
            ? events.map(event => <EventCard event={ event } key={ event._id } />)
            : <Alert severity="info">Event list is empty!</Alert>
        }
    </>
);

export default EventList;