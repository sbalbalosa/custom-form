import React from "react";
import { useField } from "../hooks";
import { FieldError } from "../types";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  for: string;
};

export default function Error(props: Props) {
  const error = useField<FieldError>(props.for, "error");

  console.log(error);

  if (error) {
    return (
      <small role="alert" aria-errormessage={error}>
        {error}
      </small>
    );
  }

  return null;
}
