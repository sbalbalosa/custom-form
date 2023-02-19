import { FormState, FormErrors } from "../types";

export const initialState: FormState = {
    fields: {},
    form: {
        isValid: false,
        isBootstraped: false, 
    }
};

export function reducer(state: FormState, action: Action): FormState {
    const fields = state.fields;
    const form = state.form;

    if (action.type === 'SET_FIELD_VALUE') {
        const { name, value } = action.payload;
        const currentField = fields[name];

        return {
            ...state,
            fields: {
                ...fields,
                [name] : {
                    ...currentField,
                    value
                }
            }
        };
    } else if (action.type === 'SET_FIELD_ERROR') {
        const { name, error } = action.payload;
        const currentField = fields[name];

        return {
            ...state,
            fields: {
                ...fields,
                [name] : {
                    ...currentField,
                    error
                }
            }
        };
    } else if (action.type === 'SET_FIELD_TOUCHED') {
        const { name, touched } = action.payload;
        const currentField = fields[name];

        return {
            ...state,
            fields: {
                ...fields,
                [name] : {
                    ...currentField,
                    touched
                }
            }
        };
    } else if (action.type === 'SET_ERRORS') {
        const errors = action.payload;

        let draftState = { ...state };
        for(const name in errors) {

            if (!draftState.fields[name]) continue;

            draftState = {
                ...draftState,
                fields: {
                    ...draftState.fields,
                    [name]: {
                        ...draftState.fields[name],
                        error: errors[name]
                    }
                }
                
            }
        }

        return draftState;
    } else if (action.type === 'REMOVE_FIELD') {
        const name = action.payload;
        const { [name]: _deleted, ...rest } = state.fields;

        return {
            ...state,
            fields: rest
        };
    } else if (action.type === 'SET_FORM_IS_VALID') {
        const isValid = action.payload;

        return {
            ...state,
            form: {
                ...form,
                isValid
            }
        };
    } else if (action.type === 'SET_FORM_IS_BOOTSTRAPED') {
        const isBootstraped = action.payload;

        return {
            ...state,
            form: {
                ...form,
                isBootstraped
            }
        };
    } else {
        return state;
    }
}

export function setFieldValue(name: string, value?: string) {
  return { type: 'SET_FIELD_VALUE', payload: {
    name,
    value
  }} as const;
}

export function setFieldError(name: string, error?: string) {
  return { type: 'SET_FIELD_ERROR', payload: {
    name,
    error
  }} as const;
}

export function setFieldTouch(name: string, touched?: boolean) {
  return { type: 'SET_FIELD_TOUCHED', payload: {
    name,
    touched
  }} as const;
}

export function setErrors(errors: FormErrors) {
  return { type: 'SET_ERRORS', payload: errors } as const;
}

export function removeField(name: string) {
    return { type: 'REMOVE_FIELD', payload: name } as const;
}

export function setFormIsValid(isValid: boolean) {
  return { type: 'SET_FORM_IS_VALID', payload: isValid } as const;
}

export function setFormIsBootstraped(isBootstraped: boolean) {
  return { type: 'SET_FORM_IS_BOOTSTRAPED', payload: isBootstraped } as const;
}



export type Action = 
  | ReturnType<typeof setFieldValue> 
  | ReturnType<typeof setFieldError> 
  | ReturnType<typeof setFieldTouch>
  | ReturnType<typeof setErrors>
  | ReturnType<typeof removeField>
  | ReturnType<typeof setFormIsValid>
  | ReturnType<typeof setFormIsBootstraped>;