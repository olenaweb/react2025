import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store/Store.tsx";
import { ThemeProvider } from "../../service/ThemeProvider.tsx";
import BackButton from "../BackButton";

describe("BackButton", () => {
  it("renders button with provided text", () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <BackButton />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const buttonItem = screen.getByText(/Back/i);
    expect(buttonItem).toBeInTheDocument();
  });
});
