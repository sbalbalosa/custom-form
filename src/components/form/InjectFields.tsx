import { FormState } from "./types";
import { useFields } from "./hooks";

interface Props {
  names: string[];
  children: (fields: FormState["fields"]) => JSX.Element;
}

export default function InjectFields(props: Props) {
  const fields = useFields<FormState["fields"]>(props.names);

  return props.children(fields ?? {});
}
