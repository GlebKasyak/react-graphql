import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";

import { appActions } from "../../store/actions/app.action";

type Props = {
    message: string
}

const Error: FC<Props> = ({ message }) => {
    const dispatch = useDispatch();

    return (
        <Alert severity="error" onClose={ () => dispatch(appActions.closeErrorAC()) } >
            <AlertTitle>Error</AlertTitle>
            { message }
        </Alert>
    )
}

export default Error;