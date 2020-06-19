import { AppStateType } from "../reducers";

class AppSelectors {
    static isLoading = (state: AppStateType) => state.app.isLoading;

    static getError = (state: AppStateType) => state.app.error;
}

export default AppSelectors;