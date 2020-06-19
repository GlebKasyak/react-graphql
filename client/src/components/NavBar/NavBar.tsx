import React, { FC, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { AppBar, Tabs, Tab, Button } from "@material-ui/core";

import "./style.scss";

import { PageUrls } from "../../shared/constants/pageUrls";
import { SetStateType } from "../../interfaces/common";
import { userActions } from "../../store/actions/user.action";
import { clearStorage } from "../../shared/storage";

type NavBarProps = {
    setPageUrl: SetStateType<PageUrls>,
    pageUrl: PageUrls,
    isAuth: boolean
}

const NavBar: FC<NavBarProps> = ({ setPageUrl, pageUrl, isAuth }) => (
    <div className="navbar" >
        <AppBar position="static">
            <Tabs
                value={ pageUrl }
                onChange={ (event, value) => setPageUrl(value) }
                aria-label="navigation"
            >
                { isAuth
                    ? (
                        [
                            <Tab
                                value={ PageUrls.events }
                                component={ Link }
                                to={ PageUrls.events }
                                label="Events"
                                key={ PageUrls.events }
                            />,
                            <Tab
                                value={ PageUrls.bookings }
                                component={ Link }
                                to={ PageUrls.bookings }
                                label="Bookings"
                                key={ PageUrls.bookings }
                            />,
                            <Tab key="logout" component={
                                forwardRef((props, ref) =>
                                    <LogoutBtn setPageUrl={ setPageUrl } { ...props }  />)
                            } />
                        ])
                    : (
                        [
                            <Tab
                                value={ PageUrls.login }
                                component={ Link }
                                to={ PageUrls.login }
                                label="Login"
                                key={ PageUrls.login }
                            />,
                            <Tab
                                value={ PageUrls.register }
                                component={ Link }
                                to={ PageUrls.register }
                                label="Register"
                                key={ PageUrls.register }
                            />
                        ]
                    )
                }
            </Tabs>
        </AppBar>
    </div>
);

type LoginBtnProps = {
    setPageUrl: SetStateType<PageUrls>,
}

const LogoutBtn: FC<LoginBtnProps> = ({ setPageUrl, children }) => {
    const dispatch = useDispatch();
    const { push } = useHistory();

    const handleClick = () => {
        dispatch(userActions.logoutSuccess());
        clearStorage();

        setPageUrl(PageUrls.login);
        push(PageUrls.login);
    }

    return (
        <Button
            onClick={ handleClick }
            variant="contained"
            color="secondary"
            className="navbar__logout-btn"
        >
            Logout
            { children }
        </Button>
    )
};

export default NavBar;