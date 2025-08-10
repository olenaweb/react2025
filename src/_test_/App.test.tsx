import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../store/Store.tsx";
import { ThemeProvider } from "../service/ThemeProvider.tsx";

test("renders App without crashing", async () => {
  const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={["/page/1"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  const heading = await screen.findByText(/Rick and Morty/i);
  expect(heading).toBeInTheDocument();
  consoleError.mockRestore();
});
