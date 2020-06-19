import { Reducer } from "redux";

import * as userTypes from "../types/userTypes";
import { userActions } from "../actions/user.action";
import { EventType } from "../../interfaces/EventInterface";
import { InferActionsTypes } from "./index";


const initialState = {
    user: {
        _id: "",
        email: "",
        createdEvents: [] as Array<EventType>
    },
    token: "",
    isAuth: false
};

type StateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof userActions>;

const reducer: Reducer<StateType, ActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case userTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                isAuth: true
            };
        case userTypes.GET_USER_AUTH_DATA_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        case userTypes.LOGOUT_SUCCESS:
            return initialState;
        default:
            return state
    }
};

export default reducer;