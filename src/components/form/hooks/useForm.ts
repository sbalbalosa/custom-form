import { useRef, useMemo } from "react";

import type { FormValidations, FormErrors, Validation } from "../types";
import { validate } from '../validations';
import {
    setFieldError,
    setErrors,
    useFormStore
} from '../store';

type Props = {
    onSubmit?: (formData: FormData) => void
}

export default function useForm(props: Props) {
    const { dispatch, subscribeToChanges } = useFormStore();

    const formElement = useRef<HTMLFormElement | null>(null);
    const formValidations = useRef<FormValidations>({});

    const setFieldValidations = (name: string, validations: Validation[]) => {
        formValidations.current[name] = validations;
    }

    const getFormData = () => {
        let formData = new FormData();

        if (formElement.current) {
            formData = new FormData(formElement.current);
        }
        
        return formData;
    }

    const validateField = (name: string) => {
        const validations = formValidations.current[name];

        if (validations) {
            const value = getFormData().get(name);

            if (value) {
                const error = validate(name, validations);

                if (error) dispatch(setFieldError(name, error));
            }
        }
    }

    const validateAll = () => {
        const formData = getFormData();

        let updatedFormErrors: FormErrors  = {};

        for (const [key, value] of formData.entries()) {
            const validations = formValidations.current[key];

            /*
                NOTE: we need to check if value is string because it could be FILE type as well.
            */
            if (validations && typeof value === "string") {
                const error = validate(value, validations);
                
                if (error) {
                    updatedFormErrors = {
                        ...updatedFormErrors,
                        [key]: error
                    };
                }
            }
        }

        return updatedFormErrors;
    }

    const isFormValid = () => {
        const errors = validateAll();
        return Object.keys(errors).length > 0 ? false : true;
    }

    const handleSubmit = () => {
        const updatedFormErrors = validateAll();

        if (Object.keys(updatedFormErrors).length > 0) {
            dispatch(setErrors(updatedFormErrors));
        }

        props.onSubmit && props.onSubmit(getFormData());        
    }

    const formObj = useMemo(() => ({
        dispatch,
        formElement,
        setFieldValidations,
        validateField,
        handleSubmit,
        isFormValid,
        subscribeToChanges,
        getFormData
    }), [])

    return formObj;
}