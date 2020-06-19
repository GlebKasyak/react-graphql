import React, { FC } from "react";
import { List } from '@material-ui/core';
import { Alert } from "@material-ui/lab";

import BookingItem from "../BookingItem/BookingItem";
import "./style.scss";

import { BookingType } from "../../../interfaces/EventInterface";

type Props = {
    bookings: Array<BookingType>,
}

const BookingList: FC<Props> = ({ bookings }) => {
    return (
        <>
            { !!bookings.length
                ? (
                    <List>
                        { bookings.map(booking =>
                            <BookingItem booking={ booking } key={ booking._id } />)
                        }
                    </List>)
                : (
                    <Alert className="booking-list-alert" severity="info">
                        Bookings list is empty!
                    </Alert>
                )
            }
        </>
    )
};

export default BookingList;