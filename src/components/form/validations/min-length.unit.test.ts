import { describe, expect, it } from "vitest";
import minLength from "./min-length";

const error = "test error";
const validator = minLength(3, error);

describe("min-length", () => {
  it("should return the error if input is less than minimum characters", () => {
    expect(validator("te")).toBe(error);
  });

  it("should return null if input is less than minimum characters", () => {
    expect(validator("tes")).toBeNull();
  });
});
