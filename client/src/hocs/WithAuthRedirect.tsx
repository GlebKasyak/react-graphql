import React, { useEffect, ComponentType, FC } from "react";
import { RouteComponentProps } from "react-router-dom";

import { getIsAuthFromStorage } from "../shared/storage";
import { PageUrls } from "../shared/constants/pageUrls";

const WithAuthRedirect = <P extends any>(Component: ComponentType<P>) => {
    type Props = P & RouteComponentProps;

    const RedirectComponent: FC<Props> = props => {
        useEffect(() => {
            const authData = getIsAuthFromStorage();

            if(authData) {
                props.history.push(PageUrls.events);
            }
        }, [props.history]);

        return <Component { ...props } />
    }

    RedirectComponent.displayName = "WithAuthRedirect";
    return RedirectComponent;
};

export default WithAuthRedirect;