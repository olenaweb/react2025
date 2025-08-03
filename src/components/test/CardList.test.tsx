import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "../../store/Store.tsx";
import { ThemeProvider } from "../../service/ThemeProvider.tsx";

import "@testing-library/jest-dom";
import { CardList } from "../../containers/CardList";
import { CharactersOnly } from "../../types/types";

test("renders the number of cards greater than 0", () => {
  const mockResults: CharactersOnly = {
    results: [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        gender: "Male",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
      {
        id: 2,
        name: "Morty Smith",
        status: "Alive",
        species: "Human",
        gender: "Male",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
    ],
  };

  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={["/page/1"]}>
          <CardList results={mockResults.results} />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  const cards = screen.getAllByRole("listitem");
  expect(cards.length).toBeGreaterThan(0);
  const name = screen.getByText(/Morty Smith/i);
  expect(name).toBeInTheDocument();
  const [status] = screen.getAllByText(/Alive/i);
  expect(status).toBeInTheDocument();
});
