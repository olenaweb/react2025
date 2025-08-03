import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store/Store.tsx";
import { ThemeProvider } from "../../service/ThemeProvider.tsx";
import App from "../../App";

jest.mock("../../request/getData", () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      error: "There is nothing here",
    })
  ),
}));

test("shows message when no cards are found", async () => {
  const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});

  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={["/react2025/page/1"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
  const errorMessage = await screen.findByText(/Sorry, the name is not found. Try another name/i);
  expect(errorMessage).toBeInTheDocument();
  consoleErrorMock.mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
});
