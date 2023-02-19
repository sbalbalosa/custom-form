
import { describe, expect, it } from "vitest";
import isEmail from "./is-email";

const error = 'test error';
const validator = isEmail(error);

describe('is-email', () => {
    it('should return the error if input is not email', () => {
        expect(validator('te')).toBe(error);
    });

    it('should return null if input is email', () => {
        expect(validator('test@test.com')).toBeNull();
    });
});