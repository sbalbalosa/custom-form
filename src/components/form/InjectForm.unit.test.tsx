import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";

import InjectForm from "./InjectForm";

const mockForm = {
  isValid: true,
  isBootstraped: true,
};

vi.mock("./store", () => {
  return {
    useFormSelector: vi.fn(() => mockForm),
  };
});

describe("InjectForm", () => {
  it("should render a function with form properties", () => {
    const mockFn = vi.fn(() => <div data-testid="test">test</div>);

    render(<InjectForm>{mockFn}</InjectForm>);

    expect(mockFn).toBeCalledWith(mockForm);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
