import { Reducer } from "redux";

import * as appTypes from "../types/appTypes";
import { appActions } from "../actions/app.action";
import { InferActionsTypes } from "./index";

const initialState = {
    error: "",
    isLoading: false
};

type StateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof appActions>;

const reducer: Reducer<StateType, ActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case appTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case appTypes.REQUEST_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case appTypes.CLOSE_LOADING:
            return {
                ...state,
                error: ""
            };
        default:
            return state
    }
};

export default reducer;