import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ReloadButton from "../ReloadButton";

describe("ReloadButton", () => {
  it("renders button with provided text", () => {
    render(
      <MemoryRouter>
        <ReloadButton />
      </MemoryRouter>
    );
    const buttonItem = screen.getByText(/Sorry, try again/i);
    expect(buttonItem).toBeInTheDocument();
  });
});
