import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../App";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store/Store.tsx";
import { ThemeProvider } from "../../service/ThemeProvider.tsx";

jest.mock("../../request/getData", () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      info: { count: 10, pages: 1, next: null, prev: null },
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          gender: "Male",
          species: "Human",
          status: "Alive",
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        },
      ],
    })
  ),
}));

test("renders cards when data is available", async () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={["/page/1"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
  const cardElements = await screen.findAllByRole("listitem");
  expect(cardElements.length).toBeGreaterThan(0);
});
