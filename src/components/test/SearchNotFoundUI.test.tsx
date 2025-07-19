import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../request/getData", () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      error: "There is nothing here",
    })
  ),
}));

import App from "../../App";
test("shows message when no cards are found", async () => {
  const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => { }); // подавление

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const errorMessage = await screen.findByText(/Sorry, the name is not found. Try another name/i);
  expect(errorMessage).toBeInTheDocument();
  consoleErrorMock.mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
});
