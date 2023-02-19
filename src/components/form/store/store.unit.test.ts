import { describe, expect, it } from "vitest";
import { 
    reducer, 
    initialState, 
    setFieldValue, 
    setFieldError, 
    setFieldTouch, 
    setErrors, 
    removeField, 
    setFormIsValid,
    setFormIsBootstraped
} from "./store";

describe('store', () => {
    it('should set a field a field value', () => {
        const state = reducer(initialState, setFieldValue('test', 'test-value'));

        expect(initialState).not.toEqual(state);
        expect(state).toEqual({
            ...initialState,
            fields: {
                test: {
                    value: 'test-value'
                }
            }
        });
    });

    it('should set a field error', () => {
        const state = reducer(initialState, setFieldError('test', 'test-error'));

        expect(initialState).not.toEqual(state);
        expect(state).toEqual({
            ...initialState,
            fields: {
                test: {
                    error: 'test-error'
                }
            }
        });
    });

    it('should set a field touched', () => {
        const state = reducer(initialState, setFieldTouch('test', true));

        expect(initialState).not.toEqual(state);
        expect(state).toEqual({
            ...initialState,
            fields: {
                test: {
                    touched: true
                }
            }
        });
    });

    it('should set field errors', () => {
        const copy = structuredClone(initialState);
        copy.fields = {
            copy1: {
                error: 'copy-error1'
            },
            copy2: {
                error: 'copy-error2'
            }
        }

        const state = reducer(copy, setErrors({
            copy1: 'error1',
            copy2: 'error2'
        }));

        expect(copy).not.toEqual(state);
        expect(state).toEqual({
            ...copy,
            fields: {
                ...copy.fields,
                copy1: {
                    error: 'error1'
                },
                copy2: {
                    error: 'error2'
                }
            }
        });
    });

    it('should remove a field', () => {
        const copy = structuredClone(initialState);
        copy.fields = {
            name: {
                value: 'test'
            },
            age: {
                value: '2'
            }
        }

        const state = reducer(copy, removeField('name'));

        expect(copy).not.toEqual(state);
        expect(state).toEqual({
            ...copy,
            fields: {
                age: {
                    value: "2"
                }
            }
        });
    });

    it('should set a form to valid', () => {
        const copy = structuredClone(initialState);
        copy.form.isValid = false;

        const state = reducer(copy, setFormIsValid(true));

        expect(copy).not.toEqual(state);
        expect(state).toEqual({
            ...copy,
            form: {
                ...copy.form,
                isValid: true  
            }
        });
    });

    it('should set a form to bootstraped', () => {
        const copy = structuredClone(initialState);
        copy.form.isBootstraped = false;

        const state = reducer(copy, setFormIsBootstraped(true));

        expect(copy).not.toEqual(state);
        expect(state).toEqual({
            ...copy,
            form: {
                ...copy.form,
                isBootstraped: true  
            }
        });
    });
});