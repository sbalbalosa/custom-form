import { describe, expect, it, vi, beforeEach } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";

import Input from "./Input";
import { setFieldError, setFieldTouch } from "../../store";

const dispatch = vi.fn();
const setFieldValidations = vi.fn();

vi.mock("../../validations", () => ({
  validate: vi.fn(() => "validate-error"),
}));

vi.mock("react", async () => {
  const React = await vi.importActual("react");
  return {
    ...(React as any),
    useContext: vi.fn(() => ({
      dispatch,
      setFieldValidations,
    })),
  };
});

vi.mock("../../hooks", () => {
  return {
    useField: vi.fn((_name, key) => {
      if (key === "touched") return true;
      return key;
    }),
  };
});

describe("Input", () => {
  beforeEach(() => {
    dispatch.mockReset();
    setFieldValidations.mockReset();
  });

  it("should render an input", () => {
    render(<Input name="test" />);

    expect(screen.getByTestId("uncontrolled-input")).toBeInTheDocument();
  });

  it("should register validations", () => {
    const validations = [vi.fn(), vi.fn()];

    render(<Input name="test" validations={validations} />);

    expect(setFieldValidations).toHaveBeenCalledWith("test", validations);
  });

  it("should handle input blur", () => {
    render(<Input name="test" />);

    const input = screen.getByTestId("uncontrolled-input");

    fireEvent.blur(input, {
      target: {
        name: "test",
        value: "value-test",
      },
    });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0]).toEqual(
      setFieldError("test", "validate-error")
    );
    expect(dispatch.mock.calls[1][0]).toEqual(setFieldTouch("test", true));
  });

  it("should set error state", () => {
    render(<Input name="test" />);

    const input = screen.getByTestId("uncontrolled-input");

    expect(input.getAttribute("aria-invalid")).toBe("true");
  });
});
