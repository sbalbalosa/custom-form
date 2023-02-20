import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import useFormSelector from "./useFormSelector";

let handleChange: ((nextValue: any) => void) | undefined;
const mockSubscribe = vi.fn((fn) => {
  handleChange = fn;
  return vi.fn();
});

vi.mock("react", async () => {
  const React = await vi.importActual("react");
  return {
    ...(React as any),
    useContext: vi.fn(() => ({ subscribeToChanges: mockSubscribe })),
  };
});

describe("useFormSelector", () => {
  beforeEach(() => {
    handleChange = undefined;
  });

  it("should initially return undefined", () => {
    const { result } = renderHook(() => useFormSelector(vi.fn()));

    expect(result.current).toBeUndefined();
  });

  it("should return the next value", () => {
    const mockSelector = vi.fn(() => "next-value");

    const { result } = renderHook(() => useFormSelector(mockSelector));

    expect(result.current).toBeUndefined();
    expect(handleChange).toBeDefined();

    act(() => {
      handleChange && handleChange("test");
    });

    expect(result.current).toBe("next-value");
  });
});
