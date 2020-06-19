import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";

import EventForm from "./EventForm";

import { eventActions } from "../../../store/actions/event.action";

const defaultFormValue = {
    title: "",
    description: "",
    price: 0
};

const EventFormContainer = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue);

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (formRef.current && !formRef.current.contains(e.target as HTMLElement)) {
                setFormData(defaultFormValue);
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [formRef]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(eventActions.createEventRequest(formData));
        setFormData(defaultFormValue);
        setIsVisible(false);
    };

    return <EventForm
        setIsVisible={ setIsVisible }
        onChange={ handleChange }
        onSubmit={ handleSubmit }
        isVisible={ isVisible }
        title={ formData.title }
        description={ formData.description }
        price={ formData.price }
        formRef={ formRef }
    />
};

export default EventFormContainer;