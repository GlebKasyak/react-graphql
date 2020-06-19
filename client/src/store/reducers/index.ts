import { combineReducers } from "redux";

import app from "./app.reducer";
import user from "./user.reducer";
import event from "./event.reducer";

const rootReducer = combineReducers({
    app,
    user,
    event
});

type RootReducer = typeof rootReducer;
export type AppStateType = ReturnType<RootReducer>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>;

export default rootReducer;