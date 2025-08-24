import { render, screen } from "@testing-library/react";
import { CardList } from "@/features/user/CardList";
import { FormData } from "@/type/type";

const mockUsers: FormData[] = [
  {
    name: "Alice",
    age: 30,
    password: "secret123",
    confirmPassword: "secret123",
    email: "alice@example.com",
    gender: "female",
    country: "USA",
    image: "alice.jpg",
    agreement: true,
  },
  {
    name: "Bob",
    age: 40,
    password: "password456",
    confirmPassword: "secret123",
    email: "bob@example.com",
    gender: "male",
    country: "Canada",
    image: "bob.jpg",
    agreement: true,
  },
];

describe("CardList component", () => {
  test("Renderitis of the list of cards", () => {
    render(<CardList result={mockUsers} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(mockUsers.length);
  });

  test("The last card has a class highlight", () => {
    render(<CardList result={mockUsers} />);
    const cards = screen.getAllByRole("listitem");

    expect(cards[0]).not.toHaveClass("card--highlight");
    expect(cards[1]).toHaveClass("card--highlight");
  });
});
