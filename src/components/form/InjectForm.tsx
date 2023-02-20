import { useFormSelector } from "./store";
import { initialState } from "./store/store";
import { FormMetaState } from "./types";

interface Props {
  children: (form: FormMetaState) => JSX.Element;
}

export default function InjectForm(props: Props) {
  const selected = useFormSelector<FormMetaState>(
    (state) => state.form
  ) as FormMetaState;

  return props.children(selected ?? initialState.form);
}
