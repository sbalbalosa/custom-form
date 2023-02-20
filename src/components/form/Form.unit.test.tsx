import { describe, expect, it, vi, beforeEach } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";

import Form from "./Form";
import { setFormIsBootstraped, setFormIsValid } from "./store";

const dispatch = vi.fn();
const isFormValid = vi.fn();
const handleSubmit = vi.fn();

vi.mock("./hooks", async () => {
  return {
    useForm: vi.fn(() => {
      return {
        dispatch,
        isFormValid,
        handleSubmit,
      };
    }),
  };
});

describe("Form", () => {
  beforeEach(() => {
    dispatch.mockReset();
    isFormValid.mockReset();
    handleSubmit.mockReset();
  });
  it("should render a form", () => {
    render(<Form onSubmit={vi.fn() as any} />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("should initialize the form", () => {
    isFormValid.mockReturnValue(true);

    render(<Form onSubmit={vi.fn() as any} />);

    expect(dispatch.mock.calls[0][0]).toEqual(setFormIsValid(true));
    expect(dispatch.mock.calls[1][0]).toEqual(setFormIsBootstraped(true));
  });

  it("should render children", () => {
    render(
      <Form onSubmit={vi.fn() as any}>
        <div>test</div>
      </Form>
    );

    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("should validate the form on input change", () => {
    isFormValid.mockReturnValue(false);

    render(
      <Form onSubmit={vi.fn() as any}>
        <input name="test" data-testid="input" />
      </Form>
    );

    dispatch.mockClear();

    const input = screen.getByTestId("input");

    fireEvent.change(input, {
      target: {
        value: "t",
      },
    });

    expect(dispatch).toBeCalledWith(setFormIsValid(false));
  });

  it("should handle form submit", () => {
    render(
      <Form onSubmit={vi.fn() as any}>
        <input name="test" data-testid="input" />
      </Form>
    );

    const form = screen.getByRole("form");

    fireEvent.submit(form, {
      preventDefault: vi.fn(),
    });

    expect(handleSubmit).toBeCalled();
  });
});
