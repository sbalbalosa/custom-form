 import type { Validation } from "../types";
 export default function validate(value: string, validators: Validation[]) {
        let error: string | null = null;

        for (const validator of validators) {
            const result = validator(value);
            if (result) {
                error = result;
                break;
            }
        }
        return error;
    }