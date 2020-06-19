import React, { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import { NavBar, Error } from "./components";
import { EventsPage, BookingsPage } from "./pages";
import "./App.css";

import { Login, Register } from "./modules";
import { PageUrls } from "./shared/constants/pageUrls";
import { WithAuth, WithDoNotAuth } from "./hocs";
import { getIsAuthFromStorage } from "./shared/storage";

import { AppSelectors } from "./store/selectors";
import { AppStateType } from "./store/reducers";
import { userActions } from "./store/actions/user.action";

type MapStateToProps = {
    error: string
};

type MapDispatchToProps = {
    getAuthUserData: () => void
}

type Props = MapStateToProps & MapDispatchToProps;

const App: FC<Props> = ({ error, getAuthUserData }) => {
    const isAuth = getIsAuthFromStorage();

    useEffect(() => {
        isAuth && getAuthUserData();
    }, [getAuthUserData, isAuth]);

    return (
        <>
            <NavBar />
            { error && <Error message={ error } /> }
            <main>
                <Switch>
                    <Redirect exact from="/" to={ isAuth ? PageUrls.events : PageUrls.login } />
                    <Route exact path={ PageUrls.login } component={ WithAuth(Login) } />
                    <Route exact path={ PageUrls.register } component={ WithAuth(Register) } />
                    <Route exact path={ PageUrls.events } component={ WithDoNotAuth(EventsPage) } />
                    <Route exact path={ PageUrls.bookings } component={ WithDoNotAuth(BookingsPage) } />
                </Switch>
            </main>
        </>
    )
}


const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAuthUserData: () => dispatch(userActions.getUserAuthDataRequest())
});

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
    state => ({ error: AppSelectors.getError(state) }),
    mapDispatchToProps
)(App);
