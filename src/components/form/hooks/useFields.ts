import  { useFormSelector } from '../store';
import { FieldState } from "../types";

export default function useFields<T>(names: string[]) {
    const selected = useFormSelector((state) => {
        let fields: FieldState = {};

        for(const name of names) {
            const currentField = state.fields[name];

            if (currentField) {
                fields = {
                    ...fields,
                    [name]: currentField
                }
            }
        }

        return fields;

    }) as T;

    return selected;
}