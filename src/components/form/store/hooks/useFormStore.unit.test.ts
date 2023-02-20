import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import useFormStore from "./useFormStore";

vi.mock("react", async () => {
  const React = await vi.importActual("react");
  return {
    ...(React as any),
    useReducer: vi.fn(() => [{}, vi.fn()]),
  };
});

describe("useFormStore", () => {
  it("should subscriber to the existing array", () => {
    const mockFn = vi.fn();

    const { result, rerender } = renderHook(() => useFormStore());
    result.current.subscribeToChanges(mockFn);

    rerender();

    expect(mockFn).toBeCalled();
  });

  it("should unsubscribe a subscriber", () => {
    const mockFn = vi.fn();

    const { result, rerender } = renderHook(() => useFormStore());
    const handle = result.current.subscribeToChanges(mockFn);
    handle();

    rerender();

    expect(mockFn).not.toBeCalled();
  });

  it("should call the subscriber on each data change", () => {
    const mockFn = vi.fn();

    const { result, rerender } = renderHook(() => useFormStore());
    result.current.subscribeToChanges(mockFn);

    rerender();
    rerender();
    rerender();

    expect(mockFn).toHaveBeenCalledTimes(3);
  });
});
