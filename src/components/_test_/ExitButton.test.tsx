import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ExitButton from "../ExitButton";

test("renders create Error component", () => {
  render(
    <MemoryRouter>
      <ExitButton />
    </MemoryRouter>
  );
  const errorHead = screen.getByText(/Sorry, try again/i);
  expect(errorHead).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveTextContent("Sorry, try again");
});
