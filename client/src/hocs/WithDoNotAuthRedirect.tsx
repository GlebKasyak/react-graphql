import React, { useEffect, FC, ComponentType } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps  } from "react-router-dom";

import { getIsAuthFromStorage } from "../shared/storage";
import { PageUrls } from "../shared/constants/pageUrls";
import { AppStateType } from "../store/reducers";
import { UserSelectors } from "../store/selectors";

const WithDoNotAuthRedirect = <P extends RouteComponentProps>(Component: ComponentType<P>) => {
    const RedirectComponent: FC<P> = props => {
        const isAuth = useSelector((state: AppStateType) => UserSelectors.getUserIsAuth(state))

        useEffect(() => {
            const authData = getIsAuthFromStorage();

            if(!authData && !isAuth) {
                props.history.push(PageUrls.login);
            }
        }, [props.history, isAuth]);

        return <Component { ...props } />;
    }

    RedirectComponent.displayName = "WithDoNotAuthRedirect";
    return RedirectComponent;
};

export default WithDoNotAuthRedirect;