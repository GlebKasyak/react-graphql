import axios from "axios";

import { UserFormData } from "../interfaces/UserInterface";
import { ServerEndpoints } from "../shared/constants/commons";

class UserAPI {
    static me = () => {
        const requestBody = {
            query: `
                query {
                  auth {
                    _id
                    email
                    createdEvents {
                        _id
                        title
                        description
                        price
                        createdAt
                    }
                  }
                }
            `
        };

        return axios.post(ServerEndpoints.graphql, JSON.stringify(requestBody));
    };

    static login = (data: UserFormData) => {
        const requestBody = {
            query: `
                query {
                  login(email: "${ data.email }", password: "${ data.password }") {
                    token
                  }
                }
            `
        };

        return axios.post(ServerEndpoints.graphql, JSON.stringify(requestBody));
    };

    static register = (data: UserFormData) => {
        const requestBody = {
            query: `
                mutation {
                  register(userInput: { email: "${ data.email }", password: "${ data.password }" }) {
                    registered
                  }
                }
            `
        };

        return axios.post(ServerEndpoints.graphql, JSON.stringify(requestBody));
    };
};

export default UserAPI;

