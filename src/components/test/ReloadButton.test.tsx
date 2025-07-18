import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ReloadButton } from "../ReloadButton";
import userEvent from '@testing-library/user-event';
import { act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

test("renders reload message", () => {
  render(<ReloadButton />);
  const loadingMessage = screen.getByText(/Sorry, try again/i);
  expect(loadingMessage).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveTextContent("Sorry, try again");
});

test("press reload button", () => {
  render(<ReloadButton />);
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

