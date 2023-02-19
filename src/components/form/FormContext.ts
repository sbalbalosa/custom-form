import { createContext } from "react";
import useForm from "./hooks/useForm";

export const FormContext = createContext<ReturnType<typeof useForm>>({
    formElement: {
        current: null,
    },
    dispatch: (fn) => undefined,
    handleSubmit: () => new FormData(),
    setFieldValidations: (name, validations) => undefined,
    validateField: (name) => undefined,
    isFormValid: () => false,
    subscribeToChanges: () => () => undefined,
    getFormData: () => new FormData()
});

export default FormContext;
