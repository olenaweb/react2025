import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import "@testing-library/jest-dom";

jest.mock("../request/getData", () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [],
    })
  ),
}));

test("renders App without crashing", async () => {
  const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  render(
    <MemoryRouter initialEntries={["/react2025/page/1"]}>
      <App />
    </MemoryRouter>
  );

  const heading = await screen.findByText(/Rick and Morty/i);
  expect(heading).toBeInTheDocument();
  consoleError.mockRestore();
});
