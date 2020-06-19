import * as userTypes from "../types/userTypes";
import { UserFormData, User } from "../../interfaces/UserInterface";

export const userActions = {
    loginRequest: (payload: UserFormData) => ({ type: userTypes.LOGIN_REQUEST, payload } as const),
    loginSuccess: (payload: string) => ({ type: userTypes.LOGIN_SUCCESS, payload } as const),

    registerRequest: (payload: UserFormData) => ({ type: userTypes.REGISTER_REQUEST, payload } as const),

    getUserAuthDataRequest: () => ({ type: userTypes.GET_USER_AUTH_DATA_REQUEST } as const),
    getUserAuthDataSuccess: (payload: User) => ({ type: userTypes.GET_USER_AUTH_DATA_SUCCESS, payload } as const),

    logoutSuccess: () => ({ type: userTypes.LOGOUT_SUCCESS } as const),
}