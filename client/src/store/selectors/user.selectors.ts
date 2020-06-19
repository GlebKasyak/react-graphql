import { AppStateType } from "../reducers";

class UserSelectors {
    static getUserIsAuth = (state: AppStateType) => state.user.isAuth;

    static getUser = (state: AppStateType) => state.user.user;

    static getUserId = (state: AppStateType) => state.user.user._id;
}

export default UserSelectors;