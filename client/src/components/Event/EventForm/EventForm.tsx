import React, { FC, ChangeEvent, FormEvent, RefObject } from "react";
import { TextField, Button, Input } from '@material-ui/core';

import "./style.scss";

import { SetStateType } from "../../../interfaces/common";

type Props = {
    setIsVisible: SetStateType<boolean>,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (e: FormEvent<HTMLFormElement>) => void,
    isVisible: boolean,
    title: string,
    description: string,
    price: number,
    formRef: RefObject<HTMLFormElement>
};

const EventForm: FC<Props> = (
    {
        setIsVisible,
        onChange,
        onSubmit,
        isVisible,
        title,
        description,
        price,
        formRef
    }) => {
    return (
        <>
            { isVisible
                ? (
                    <form
                        onSubmit={ onSubmit }
                        ref={ formRef }
                        noValidate
                        className="form-event"
                        autoComplete="off"
                    >
                        <TextField
                            value={ title }
                            onChange={ onChange }
                            label="Title"
                            placeholder="Title"
                            name="title"
                            InputLabelProps={{ shrink: true }}
                            className="form-event__input"
                        />
                        <TextField
                            value={ description }
                            onChange={ onChange }
                            label="Description"
                            placeholder="Description"
                            name="description"
                            InputLabelProps={{ shrink: true }}
                            className="form-event__input"
                        />
                        <Input
                            value={ price }
                            onChange={ onChange }
                            placeholder="Price"
                            name="price"
                            type="number"
                            className="form-event__input"
                        />
                        <Button
                            disabled={ !title || !description || !price }
                            type="submit"
                        >
                            Create Event
                        </Button>
                    </form>)
                : (
                    <div
                        onClick={ () => setIsVisible(true) }
                        className="create-event-btn"
                    >
                        Create Event
                    </div>
                )
            }
        </>
    )
};

export default EventForm;