import { fireEvent, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "../SearchInput";
describe('Input and SearchButton', () => {
  test("is there SearchButton", () => {
    render(<SearchInput searchValue="" />);
    const search = screen.getByText("🔍");
    expect(search).toBeInTheDocument();
  });

  test("changed input value", () => {
    render(<SearchInput searchValue="" />);
    const input = screen.getByPlaceholderText("Enter the name");
    fireEvent.change(input, { target: { value: "Rick" } });
    fireEvent.click(screen.getByText("🔍"));
    expect(input).toContainHTML('Rick');
  });
})
