// Card.test.tsx
import { render, screen } from "@testing-library/react";
import { Card } from "../Card";
import type { ComponentProps } from "react";

type CardProps = ComponentProps<typeof Card>;
const mockProps: CardProps = {
  id: 1,
  name: "Rick Sanchez",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  gender: "Male",
  species: "Human",
  status: "Alive",
};

test("Card displays character info", () => {
  render(<Card {...mockProps} />);

  expect(screen.getByText(/Rick Sanchez/)).toBeInTheDocument();
  expect(screen.getByText(/Gender: Male/)).toBeInTheDocument();
  expect(screen.getByText(/Species: Human/)).toBeInTheDocument();
  expect(screen.getByText(/Alive/)).toBeInTheDocument();
});
