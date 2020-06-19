import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import { getDate } from "../../../shared/helpers";
import { eventActions } from "../../../store/actions/event.action";
import { BookingType } from "../../../interfaces/EventInterface";

type Props = {
    booking: BookingType
};

const BookingItem: FC<Props> = ({ booking }) => {
    const dispatch = useDispatch();
    const { title, description } = booking.event;

    const cancelBookingHandler = (bookingId: string) => {
        dispatch(eventActions.cancelBookingEventRequest(bookingId));
    };

    return (
        <ListItem button >
            <ListItemText
                primary={ `${ title } --- ${ getDate(booking.createdAt!) }` }
                secondary={ description }
            />
            <ListItemSecondaryAction>
                <IconButton
                    onClick={ cancelBookingHandler.bind(null, booking._id!) }
                    edge="end"
                    aria-label="delete"
                >
                    <Delete />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default BookingItem;