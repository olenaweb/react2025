import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Container } from "../../containers/Container";
import { Character } from "../../types/types";

const dummyResults: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth (C-137)", url: "" },
    location: { name: "Earth (Replacement Dimension)", url: "" },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [],
    url: "",
    created: "2017-11-04T18:48:46.250Z",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth (C-137)", url: "" },
    location: { name: "Earth (Replacement Dimension)", url: "" },
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    episode: [],
    url: "",
    created: "2017-11-04T18:48:46.250Z",
  },
];

describe("Container component", () => {
  it("renders the correct number of Card components", () => {
    render(
      <MemoryRouter>
        <Container results={dummyResults} />
      </MemoryRouter>
    );

    const cardItems = screen.getAllByRole("listitem");
    expect(cardItems).toHaveLength(dummyResults.length);
  });
});
