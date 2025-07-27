import { fireEvent, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import SearchInput from "../SearchInput";
describe("Input and SearchButton", () => {
  test("is there SearchButton", () => {
    render(
      <MemoryRouter>
        <SearchInput searchValue="" />
      </MemoryRouter>
    );
    const search = screen.getByText("🔍");
    expect(search).toBeInTheDocument();
  });

  test("changed input value", () => {
    render(
      <MemoryRouter>
        <SearchInput searchValue="" />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText("Enter the name");
    fireEvent.change(input, { target: { value: "Rick" } });
    fireEvent.click(screen.getByText("🔍"));
    expect((input as HTMLInputElement).value).toBe("Rick");
  });
});
