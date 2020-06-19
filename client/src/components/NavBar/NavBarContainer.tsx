import React, { useState, useEffect, FC } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import NavBar from "./NavBar";

import { PageUrls } from "../../shared/constants/pageUrls";
import { AppStateType } from "../../store/reducers";
import { UserSelectors } from "../../store/selectors";
import { getIsAuthFromStorage } from "../../shared/storage";

type MapStateToProps = {
    isAuth: boolean
};

type Props = MapStateToProps;

const NavBarContainer: FC<Props> = ({ isAuth }) => {
    const authData = getIsAuthFromStorage();
    const { push } = useHistory();
    const defaultPageUrl = authData ? PageUrls.events : PageUrls.login;

    const [pageUrl, setPageUrl] = useState(defaultPageUrl);

    useEffect(() => {
        setPageUrl(defaultPageUrl);
        push(defaultPageUrl);
    }, [defaultPageUrl, push, isAuth]);

    return (
        <NavBar
            setPageUrl={ setPageUrl }
            pageUrl={ pageUrl }
            isAuth={ authData }
        />
    )
};

export default connect<MapStateToProps, {}, {}, AppStateType>(
    state => ({ isAuth: UserSelectors.getUserIsAuth(state) })
)(NavBarContainer);