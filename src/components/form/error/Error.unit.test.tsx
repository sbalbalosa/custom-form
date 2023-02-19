import { describe, expect, it, vi } from "vitest";
import { screen, render } from '@testing-library/react';

import Error from "./Error";

vi.mock('../hooks', () => {
    return {
        useField: vi.fn((_name, key) => {
            return key;
        })
    }
});

describe('Error', () => {
    it('should render an input', () => {
        render(<Error for="test" />);

        const error = screen.getByRole('alert');

        expect(error).toBeInTheDocument();
        expect(error.getAttribute('aria-errormessage')).toBe('error');
        expect(error.textContent).toBe('error');
    });
});