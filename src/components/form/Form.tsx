import React, { useEffect } from "react";

import { setFormIsBootstraped, setFormIsValid } from "./store/store";
import { useForm } from "./hooks";
import FormContext from "./FormContext";

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
    onSubmit?: (formData: FormData) => void
};

export default function Form(props: Props) {
    const form = useForm(props);

    const { children, ...restProps } = props;

    useEffect(() => {
        const isValid = form.isFormValid();

        form.dispatch(setFormIsValid(isValid));
        form.dispatch(setFormIsBootstraped(true));
    }, []);

    const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
        const isValid = form.isFormValid();

        form.dispatch(setFormIsValid(isValid));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.handleSubmit();
    }

    return (
        <form
            ref={form.formElement}
            {...restProps}
            onSubmit={handleSubmit}
            onChange={handleChange}
            role="form"
        >
            <FormContext.Provider value={form}>
                {children}
            </FormContext.Provider>
        </form>
    )
}