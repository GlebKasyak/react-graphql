import { call, put, takeEvery } from "redux-saga/effects";

import { UserAPI } from "../../apiServices";
import * as userTypes from "../types/userTypes";
import { UserFormData } from "../../interfaces/UserInterface";
import { Action } from "../../interfaces/common";
import { setTokenToStorage, setIsAuthToStorage } from "../../shared/storage";
import { userActions } from "../actions/user.action";
import { appActions } from "../actions/app.action";

function* getAuthUserData() {
    try {
        const res = yield call(UserAPI.me);
        yield put(userActions.getUserAuthDataSuccess(res.data.data.auth));
    } catch (err) {
        yield put(appActions.setErrorAC(err.errors[0].message));
    }
};

function* login(action: Action<UserFormData>) {
    try {
        yield put(appActions.setLoadingAC(true));

        const res = yield call(UserAPI.login, action.payload!);

        setTokenToStorage(res.data.data.login.token);
        setIsAuthToStorage();
        yield put(userActions.loginSuccess(res.data.data.login.token));

        yield call(getAuthUserData);

        yield put(appActions.setLoadingAC(false));
    } catch (err) {
        yield put(appActions.setErrorAC(err.errors[0].message));
    }
};

function* register(action: Action<UserFormData>) {
    try {
        yield put(appActions.setLoadingAC(true));

        yield call(UserAPI.register, action.payload!);
        yield put(appActions.setLoadingAC(false));
    } catch (err) {
        yield put(appActions.setErrorAC(err.errors[0].message));
    }
};


export default [
    takeEvery(userTypes.LOGIN_REQUEST, login),
    takeEvery(userTypes.REGISTER_REQUEST, register),
    takeEvery(userTypes.GET_USER_AUTH_DATA_REQUEST, getAuthUserData)
];