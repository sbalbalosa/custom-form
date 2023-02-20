import { useFormSelector } from "../store";
import { FieldKeys } from "../types";

export default function useField<T>(name: string, key: FieldKeys) {
  const selected = useFormSelector(
    (state) => state.fields[name ?? ""]?.[key]
  ) as T;

  return selected;
}
