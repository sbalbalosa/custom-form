import React, { useContext, useEffect, startTransition } from "react";

import { validate } from "../../validations";
import { Validation, FieldError, FieldValue, FieldTouched } from "../../types";
import FormContext from "../../FormContext";
import { setFieldError, setFieldTouch, setFieldValue } from "../../store/store";
import { useField } from "../../hooks";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    validations?: Validation[];
}

type ControlledProps = Pick<Props, 'value' | 'onChange' | 'onBlur'>;

export default function ControlledInput(props: Props) {
    const { dispatch, setFieldValidations } = useContext(FormContext);

    const error = useField<FieldError>(props.name ?? '', 'error');
    const value = useField<FieldValue>(props.name ?? '', 'value');
    const touched = useField<FieldTouched>(props.name ?? '', 'touched');

    const { validations, ...domProps } = props;

    useEffect(() => {
        if (props.name) {
            setFieldValidations(
                props.name,
                validations ?? []
            )
        }
    }, [validations, props.name, setFieldValidations]);


    let isInvalid;
    if (touched) {
        isInvalid = error ? true : false;
    }

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;

        dispatch(setFieldValue(name, value));

        startTransition(() => {
            const validators = validations ?? [];

            const error = validate(value ?? '', validators);

            dispatch(setFieldError(name, error ?? undefined));
            dispatch(setFieldTouch(name, true));
        });
    }

    const handleBlur = (event: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        const validators = validations ?? [];

        const error = validate(value, validators);

        dispatch(setFieldError(name, error ?? undefined));
        dispatch(setFieldTouch(name, true));
    }

    const controlledProps: ControlledProps = {};


    controlledProps.onChange = handleChange;
    controlledProps.value = (props.name && value) ?? '';
    controlledProps.onBlur = handleBlur;

    return (
        <input {...domProps} {...controlledProps} aria-invalid={isInvalid} data-testid="controlled-input" />
    )
}