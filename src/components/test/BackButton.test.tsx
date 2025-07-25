import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BackButton from "../BackButton";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

test("renders reload message", () => {
  render(<BackButton />);
  const loadingMessage = screen.getByText(/Back to main/i);
  expect(loadingMessage).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveTextContent("Back to main");
});

test("press reload button", () => {
  render(<BackButton />);
  const buttonReload = screen.getByRole("button");
  userEvent.type(buttonReload, "");
  act(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
  expect(screen.getByText(/Rick and Morty/i)).toBeInTheDocument();
});
