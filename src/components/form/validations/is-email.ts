export default function isEmail(
  error: string
): (value: string) => string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (value) => {
    if (emailRegex.test(value)) return null;
    return error;
  };
}
