import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook } from '@testing-library/react';

import { setErrors, setFieldError } from "../store";
import useForm from "./useForm";

const createForm = (firstName: string = 'First', lastName: string = 'Last') => {
  const form = document.createElement('form');

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'firstName');
  input.setAttribute('value', firstName);

  form.appendChild(input);

  const input2 = document.createElement('input');
  input2.setAttribute('type', 'text');
  input2.setAttribute('name', 'lastName');
  input2.setAttribute('value', lastName);

  form.appendChild(input2);

  return form;
}

let dispatch = vi.fn();
vi.mock('../store', async () => {
  const store = await vi.importActual("../store");
  return {
    ...store as {},
    useFormStore: vi.fn(() => ({ dispatch, subscribeToChanges: vi.fn() }))
  }
});

vi.mock('../validations', () => {
  return {
    validate: vi.fn().mockReturnValue('error')
  }
});

describe('useForm', () => {
    beforeEach(() => {
        dispatch.mockReset();
    });

    it('should be able to get all form data', () => {
        const { result } = renderHook(() => useForm({ onSubmit: vi.fn() }));

        const form = createForm();
        result.current.formElement.current = form;

        const formData = result.current.getFormData();

        expect(formData.get('firstName')).toBe('First');
        expect(formData.get('lastName')).toBe('Last');
    });

    it('should be able to validate a field', () => {
        const { result } = renderHook(() => useForm({ onSubmit: vi.fn() }));

        const form = createForm();
        result.current.formElement.current = form;
        result.current.setFieldValidations("firstName", []);

        result.current.validateField('firstName');

        expect(dispatch).toBeCalledWith(setFieldError("firstName", "error"));
    });

    it('should be able to validate all fields', () => {
        const { result } = renderHook(() => useForm({ onSubmit: vi.fn() }));

        const form = createForm();
        result.current.formElement.current = form;
        result.current.setFieldValidations("firstName", []);
        result.current.setFieldValidations("lastName", []);

        expect(result.current.isFormValid()).toBe(false);
    });

    it('should handle form submission', () => {
        const mockOnSubmit = vi.fn();
        const { result } = renderHook(() => useForm({ onSubmit: mockOnSubmit }));

        const form = createForm();
        result.current.formElement.current = form;
        result.current.setFieldValidations("firstName", []);
        result.current.setFieldValidations("lastName", []);

        result.current.handleSubmit();

        expect(dispatch).toBeCalledWith(setErrors({
            firstName: 'error',
            lastName: 'error'
        }));
        expect(mockOnSubmit).toBeCalled();
    })
});