import axios from "axios";

import { ENV } from "../shared/constants";
import { getTokenFromStorage } from "../shared/storage";

export default () => {
    axios.defaults.baseURL = ENV.SERVER_URL;
    axios.defaults.headers = {
        "Content-Type": "application/json"
    };

    axios.interceptors.request.use(config => {
            const authData = getTokenFromStorage();

            if(!!authData) {
                config.headers.Authorization = `Bearer ${ authData }`;
            };

            return config;
        },
        err => console.log(err)
    );

    axios.interceptors.response.use(res => res,
        ({ response }) => Promise.reject(response.data)
    )
}