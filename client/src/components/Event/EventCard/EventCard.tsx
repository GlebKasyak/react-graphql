import React, { FC } from "react";
import { Card, CardActions, CardContent, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";

import { EventType } from "../../../interfaces/EventInterface";
import { AppStateType } from "../../../store/reducers";
import { eventActions } from "../../../store/actions/event.action";
import { UserSelectors } from "../../../store/selectors";
import { getDate } from "../../../shared/helpers";

type Props = {
    event: EventType
};

const EventCard: FC<Props> = ({ event }) => {
    const dispatch = useDispatch();
    const selfId = useSelector((state: AppStateType) => UserSelectors.getUserId(state));

    const deleteEventHandler = (eventId: string) => {
        const result = window.confirm("Are you sure you want to delete this?");

        result && dispatch(eventActions.deleteEventRequest(eventId));
    };

    const bookEventHandler = (eventId: string) => {
        dispatch(eventActions.bookEventRequest(eventId));
    }

    const { createdAt, title, description, price, creator } = event;
    return (
        <Card className="event-card" variant="outlined">
            <CardContent>
                <Typography className="event-card__data" color="textSecondary" gutterBottom >
                    { getDate(createdAt!) }
                </Typography>
                <Typography variant="h5" component="h2" className="event-card__title" >
                    { title }
                </Typography>
                <Typography variant="body2" component="p" className="event-card__description" >
                    { description }
                </Typography>
                <Typography color="textSecondary" className="event-card__price" >
                    Price: ${ price }
                </Typography>
            </CardContent>
            <div>
                { creator!._id === selfId
                    ? (
                        <div className="event-card__actions" >
                            <div className="event-card__owner" >Your the owner this event</div>
                            <CardActions>
                                <Button
                                    onClick={ deleteEventHandler.bind(null, event._id!) }
                                    size="small"
                                    color="secondary"
                                >
                                    Remove event
                                </Button>
                            </CardActions>
                        </div>)
                    : (
                        <CardActions>
                            <Button
                                onClick={ bookEventHandler.bind(null, event._id!) }
                                variant="outlined"
                                size="small"
                                color="primary"
                            >
                                Book
                            </Button>
                        </CardActions>
                    )
                }

            </div>
        </Card>
    )
}

export default EventCard;
