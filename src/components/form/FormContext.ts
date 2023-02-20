import { createContext } from "react";
import useForm from "./hooks/useForm";

export const FormContext = createContext<ReturnType<typeof useForm>>({
  formElement: {
    current: null,
  },
  dispatch: () => undefined,
  handleSubmit: () => new FormData(),
  setFieldValidations: () => undefined,
  validateField: () => undefined,
  isFormValid: () => false,
  subscribeToChanges: () => () => undefined,
  getFormData: () => new FormData(),
});

export default FormContext;
