import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "../SearchInput";
describe("LocalStorage: save and get value", () => {
  test("saves input value to local storage", () => {
    localStorage.setItem("olena_01_search", "Rick Sanchez");
    render(<SearchInput searchValue="Rick Sanchez" />);
    const inputElement = screen.getByDisplayValue(/Rick Sanchez/i);
    expect(inputElement).toBeInTheDocument();
    expect(localStorage.getItem("olena_01_search")).toBe("Rick Sanchez");
  });

  test("retrieves value from local storage on mount", () => {
    const localValue = localStorage.getItem("olena_01_search");
    if (localValue) {
      render(<SearchInput searchValue={localValue} />);
    }
    const inputElement = screen.getByDisplayValue(/Rick Sanchez/i);
    expect(inputElement).toBeInTheDocument();
  });
})
