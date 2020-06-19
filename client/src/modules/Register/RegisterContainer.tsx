import React, { useState, ChangeEvent, FormEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import Register from "./Register";
import { Loader } from "../../components";

import { AppStateType } from "../../store/reducers";
import { userActions } from "../../store/actions/user.action";
import { AppSelectors } from "../../store/selectors";

const RegisterContainer: FC = () => {
    const isLoading = useSelector((state: AppStateType) => AppSelectors.isLoading(state));
    const dispatch = useDispatch();

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

    const handleSubmit =  (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(userActions.registerRequest(formData));
        setFormData({ email: "", password: "" });
    };

    if(isLoading) {
        return <Loader />
    };

    const { email, password } = formData;

    return <Register
        onChange={ handleChange }
        onSubmit={ handleSubmit }
        email={ email }
        password={ password }
    />
};

export default RegisterContainer
