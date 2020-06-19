import { all } from "redux-saga/effects";

import userSagas from "./user.sagas";
import eventSagas from "./event.sagas";

export default function* () {
    yield all([
        ...userSagas,
        ...eventSagas
    ])
};