import * as appTypes from "../types/appTypes";

export const appActions = {
    setLoadingAC: (payload: boolean) => ({ type: appTypes.SET_LOADING, payload } as const),

    setErrorAC: (payload: string) => ({ type: appTypes.REQUEST_FAILURE, payload } as const),
    closeErrorAC: () => ({ type: appTypes.CLOSE_LOADING } as const)
}