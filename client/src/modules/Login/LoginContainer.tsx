import React, { useState, ChangeEvent, FormEvent, FC } from "react";
import { connect } from "react-redux";

import Login from "./Login";
import { Loader } from "../../components";

import { userActions } from "../../store/actions/user.action";
import { User } from "../../interfaces/UserInterface";
import { AppStateType } from "../../store/reducers";
import { UserSelectors, AppSelectors } from "../../store/selectors";
import { UserFormData } from "../../interfaces/UserInterface";

type MapStateToProps = {
    isAuth: boolean,
    user: User,
    isLoading: boolean
};

type MapDispatchToProps = {
    login: (data: UserFormData) => void
};

type Props = MapStateToProps & MapDispatchToProps;

const LoginContainer: FC<Props> = ({ login, isLoading, isAuth }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login(formData);
        setFormData({ email: "", password: "" });
    };

    if(isLoading) {
        return <Loader />
    }

    const { email, password } = formData;

    return <Login
        onChange={ handleChange }
        onSubmit={ handleSubmit }
        email={ email }
        password={ password }
    />
};

const mapStateToProps = (state: AppStateType) => ({
    isAuth: UserSelectors.getUserIsAuth(state),
    user: UserSelectors.getUser(state),
    isLoading: AppSelectors.isLoading(state)
});

export default connect<{}, MapDispatchToProps, {}, AppStateType>(
    mapStateToProps,
    { login: userActions.loginRequest })
(LoginContainer);
