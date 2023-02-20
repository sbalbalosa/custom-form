import React, { useContext, useEffect } from "react";

import { validate } from "../../validations";
import FormContext from "../../FormContext";
import { setFieldError, setFieldTouch } from "../../store/store";
import { useField } from "../../hooks";
import { Validation, FieldError, FieldTouched } from "../../types";

type InputElement = React.InputHTMLAttributes<HTMLInputElement>;

type Props = InputElement & {
  validations?: Validation[];
  name?: string;
  onBlur?: InputElement["onBlur"];
};

export default function Input(props: Props) {
  const { setFieldValidations, dispatch } = useContext(FormContext);

  const error = useField<FieldError>(props.name ?? "", "error");
  const touched = useField<FieldTouched>(props.name ?? "", "touched");

  const { validations, ...domProps } = props;

  let isInvalid;
  if (touched) {
    isInvalid = error ? true : false;
  }

  useEffect(() => {
    if (props.name) {
      setFieldValidations(props.name, validations ?? []);
    }
  }, [validations, props.name, setFieldValidations]);

  const handleBlur = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const validators = validations ?? [];

    const error = validate(value, validators);

    dispatch(setFieldError(name, error ?? undefined));
    dispatch(setFieldTouch(name, true));
  };

  return (
    <input
      {...domProps}
      onBlur={props.onBlur ?? handleBlur}
      aria-invalid={isInvalid}
      data-testid="uncontrolled-input"
    />
  );
}
