import React, { ChangeEvent, FormEvent, FC } from "react";
import { TextField, Container, Button } from '@material-ui/core';

import "./style.scss";

type Props = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (e: FormEvent<HTMLFormElement>) => void,
    email: string,
    password: string
};

const Login: FC<Props> = ({ onChange, onSubmit, email, password }) => (
    <Container  >
        <form className="login-form" onSubmit={ onSubmit } >
            <TextField
                onChange={ onChange }
                value={ email }
                label="Email"
                name="email"
                required
            />
            <TextField
                onChange={ onChange }
                value={ password }
                label="Password"
                name="password"
                type="password"
                required
            />
            <Button
                className="login-form__btn"
                variant="outlined"
                color="primary"
                type="submit"
                disabled={ !email.trim() || !password.trim() }
            >
                Sign in
            </Button>
        </form>
    </Container>
);

export default Login