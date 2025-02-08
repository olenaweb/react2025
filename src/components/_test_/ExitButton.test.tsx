import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ExitButton from "../ExitButton";

describe("ExitButton", () => {
  it("renders button with provided text", () => {
    render(
      <MemoryRouter>
        <ExitButton />
      </MemoryRouter>
    );
    const buttonItem = screen.getByText(/Sorry, try again/i);
    expect(buttonItem).toBeInTheDocument();
  });
});
