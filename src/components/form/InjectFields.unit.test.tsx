import { describe, expect, it, vi } from "vitest";
import { screen, render } from '@testing-library/react';

import InjectFields from "./InjectFields";

const mockFields = {
    key1: {
        value: 'test',
        error: 'error',
        touched: false
    },
    key2: {
        value: 'test2',
        error: 'error2',
        touched: true
    }
};

vi.mock('./hooks', () => {
    return {
        useFields: vi.fn(() => mockFields)
    }
});

describe('InjectFields', () => {
    it('should render a function with fields', () => {
        const mockFn = vi.fn(() => (<div data-testid='test'>test</div>));

        render(
            <InjectFields names={[]} >
                {mockFn}
            </InjectFields>
        );

        expect(mockFn).toBeCalledWith(mockFields);
        expect(screen.getByTestId('test')).toBeInTheDocument();
    });
});