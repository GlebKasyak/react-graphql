import React, { ChangeEvent, FormEvent, FC } from "react";
import { TextField, Container, Button } from "@material-ui/core";

import "./style.scss";

type Props = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (e: FormEvent<HTMLFormElement>) => void,
    email: string,
    password: string
};

const Register: FC<Props> = ({ onChange, onSubmit, email, password }) => {
    return (
        <Container  >
            <form className="register-form" onSubmit={ onSubmit } >
                <TextField
                    onChange={ onChange }
                    value={ email }
                    label="Email"
                    name="email"
                    type="email"
                    required
                />
                <TextField
                    onChange={ onChange }
                    value={ password }
                    label="Password"
                    name="password"
                    required
                    type="password"
                />
                <Button
                    className="login-form__btn"
                    variant="outlined"
                    color="primary"
                    type="submit"
                    disabled={ !email.trim() || !password.trim() }
                >
                    Register
                </Button>
            </form>
        </Container>
    )
};

export default Register
