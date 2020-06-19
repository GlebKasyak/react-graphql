import React, { FC, useState, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Container, Button } from "@material-ui/core";

import { Loader, BookingList, BookingsChart } from "../../components";
import "./style.scss";

import { BookingType } from "../../interfaces/EventInterface";
import { AppStateType } from "../../store/reducers";
import { AppSelectors, EventSelectors } from "../../store/selectors";
import { eventActions } from "../../store/actions/event.action";


type MapStateToProps = {
    bookings: Array<BookingType>,
    isLoading: boolean
};

type MapDispatchToProps = {
    getBookings: () => void
};

type Props = MapStateToProps & MapDispatchToProps;

const BookingsPage: FC<Props> = ({ getBookings, bookings, isLoading }) => {
    enum OutputTypes {
        list = "list",
        chart = "chart"
    };

    const [outputType, setOutputType] = useState<OutputTypes>(OutputTypes.list);

    useEffect(() => {
        if(!bookings.length) {
            getBookings();
        }
    }, [bookings, getBookings]);

    if(isLoading) {
        return  <Loader />
    };

    return (
        <Container className="booking-page" >
            <div className="booking-tabs-wrapper" >
                <Button
                    onClick={ () => setOutputType(OutputTypes.list) }
                    className={ "booking-tab " + (outputType === OutputTypes.list ? "booking-tab--active" : "") }
                >
                    List
                </Button>
                <Button
                    onClick={ () => setOutputType(OutputTypes.chart) }
                    className={ "booking-tab " + (outputType === OutputTypes.chart ? "booking-tab--active" : "") }
                >
                    Chart
                </Button>
            </div>
            { outputType === OutputTypes.list
                ? <BookingList bookings={ bookings } />
                : <BookingsChart bookings={ bookings } />
            }
        </Container>
    )
};

const mapStateToProps = (state: AppStateType) => ({
    bookings: EventSelectors.getBookings(state),
    isLoading: AppSelectors.isLoading(state)
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
    getBookings: () => dispatch(eventActions.getBookingsRequest()),
});

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
    mapStateToProps,
    mapDispatchToProps
)(BookingsPage);
