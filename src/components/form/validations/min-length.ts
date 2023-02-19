export default function minLength(length: number, error: string): (value: string) => string | null {
    return (value) => {
        if (value.length >= length) return null;
        return error;
    }
}