import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Container } from "../../containers/Container";
import { CharactersOnly } from "../../types/types";

test("renders the number of cards greater than 0", () => {
  const mockResults: CharactersOnly = {
    results: [
      {
        "id": 1,
        "name": "Rick Sanchez",
        "status": "Alive",
        "species": "Human",
        "gender": "Male",
        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
      },
      {
        "id": 2,
        "name": "Morty Smith",
        "status": "Alive",
        "species": "Human",
        "gender": "Male",
        "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
    ]
  }
  render(<Container results={mockResults.results} />);
  const cards = screen.getAllByRole("listitem");
  expect(cards.length).toBeGreaterThan(0);
  const name = screen.getByText(/Morty Smith/i);
  expect(name).toBeInTheDocument();
  const [status] = screen.getAllByText(/Alive/i);
  expect(status).toBeInTheDocument();
});
