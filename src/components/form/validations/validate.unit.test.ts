import { describe, expect, it, vi } from "vitest";
import validate from "./validate";

describe("validate", () => {
  it("should validate the input with set of validators", () => {
    const validators = [vi.fn(() => null), vi.fn(() => "error")];

    const result = validate("test", validators);

    expect(validators[0]).toBeCalledWith("test");
    expect(validators[1]).toBeCalledWith("test");
    expect(result).toBe("error");
  });

  it("should exit the validation pipeline upon receiving error", () => {
    const validators = [vi.fn(() => "error"), vi.fn(() => null)];

    const result = validate("test", validators);

    expect(validators[0]).toBeCalledWith("test");
    expect(validators[1]).not.toBeCalledWith("test");
    expect(result).toBe("error");
  });
});
