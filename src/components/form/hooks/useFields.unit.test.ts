import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import useFields from "./useFields";

const testFields = {
  test: {
    value: "test-value",
    error: "test-error",
    touched: true,
  },
  test2: {
    value: "test-value2",
    error: "test-error2",
    touched: false,
  },
  test3: {
    value: "test-value3",
    error: "test-error3",
    touched: false,
  },
};

vi.mock("../store", async () => {
  return {
    useFormSelector: vi.fn((fn) => {
      return fn({
        fields: testFields,
      });
    }),
  };
});

describe("useFields", () => {
  it("should return selected field", () => {
    const copy = structuredClone(testFields);
    const { test: _test, test3: _test3, ...rest } = copy;

    const { result } = renderHook(() => useFields(["test2"]));

    expect(result.current).toEqual(rest);
  });

  it("should return multiple selected field", () => {
    const copy = structuredClone(testFields);
    const { test: _test, ...rest } = copy;

    const { result } = renderHook(() => useFields(["test2", "test3"]));

    expect(result.current).toEqual(rest);
  });

  it("should return empty if no field exist", () => {
    const { result } = renderHook(() => useFields(["newField"]));

    expect(result.current).toEqual({});
  });
});
