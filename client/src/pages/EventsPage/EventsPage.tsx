import React, { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";

import { EventList, Loader } from "../../components";

import { EventType } from "../../interfaces/EventInterface";
import { AppStateType } from "../../store/reducers";
import { eventActions } from "../../store/actions/event.action";
import { EventSelectors, AppSelectors } from "../../store/selectors";

type MapStateToProps = {
    events: Array<EventType>,
    isLoading: boolean
};

type MapDispatchToProps = {
    getEvents: () => void
};

type Props = MapStateToProps & MapDispatchToProps;

const EventsPage: FC<Props> = ({ events, getEvents, isLoading }) => {
    useEffect(() => {
        if(!events.length) {
            getEvents();
        }
    },[events.length, getEvents]);


    if(isLoading) {
        return  <Loader />
    }

    return (
        <Container>
            <EventList events={ events } />
        </Container>
    )
};

const mapStateToProps = (state: AppStateType) => ({
    events: EventSelectors.getEvents(state),
    isLoading: AppSelectors.isLoading(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getEvents: () => dispatch(eventActions.getEventsRequest())
});

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
    mapStateToProps,
    mapDispatchToProps
)(EventsPage);
