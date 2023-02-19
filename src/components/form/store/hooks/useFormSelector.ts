import { useContext, useState, useEffect } from "react";

import type { FormState } from "../../types";
import FormContext from "../../FormContext";

export default function useFormSelector<T>(selector: (state: FormState) => T) {
    const { subscribeToChanges } = useContext(FormContext);
    const [value, setValue] = useState<T | undefined>(undefined);

    const handleChange = (state: FormState) => {
        const nextValue = selector(state);
        if (value !== nextValue) {
            setValue(nextValue);
        }
    }

    useEffect(() => {
        const unsubscribe = subscribeToChanges(handleChange)
        return () => unsubscribe();
    }, [selector, handleChange]);

    return value;
}