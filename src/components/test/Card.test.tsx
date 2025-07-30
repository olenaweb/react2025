import { render, screen } from "@testing-library/react";
import { Card } from "../Card";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { ComponentProps } from "react";

type CardProps = ComponentProps<typeof Card>;

const mockProps: CardProps = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  gender: "Male",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

test("Card displays character info", () => {
  render(
    <MemoryRouter initialEntries={["/page/1"]}>
      <Routes>
        <Route path="/page/:pageId" element={<Card {...mockProps} />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Rick Sanchez/)).toBeInTheDocument();
  expect(screen.getByText(/Gender: Male/)).toBeInTheDocument();
  expect(screen.getByText(/Species: Human/)).toBeInTheDocument();
  expect(screen.getByText(/Alive/)).toBeInTheDocument();

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "/page/1/detail/1");
});
