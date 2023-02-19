import { describe, expect, it, vi } from "vitest";
import { renderHook } from '@testing-library/react';

import useField from "./useField";

vi.mock('../store', async () => {
  return {
    useFormSelector: vi.fn((fn) => {
        return fn({
            fields: {
                test: {
                    value: 'test-value',
                    error: 'test-error',
                    touched: true
                }
            }
        })
    })
  }
});

describe('useField', () => {
    it('should return the value of a field', () => {
        const { result } = renderHook(() => useField('test', 'value'));

        expect(result.current).toBe('test-value');
    });

    it('should return the error of a field', () => {
        const { result } = renderHook(() => useField('test', 'error'));

        expect(result.current).toBe('test-error');
    });

    it('should return the touched state of a field', () => {
        const { result } = renderHook(() => useField('test', 'touched'));

        expect(result.current).toBe(true);
    });

    it('should return undefined if field does not exist', () => {
        const { result } = renderHook(() => useField('newField', 'touched'));

        expect(result.current).toBeUndefined();
    });
});