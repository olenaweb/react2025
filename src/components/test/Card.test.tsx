import { render, screen } from "@testing-library/react";
import Card from "@/features/user/Card";
import { FormData } from "@/type/type";

const mockUser: FormData = {
  name: "Alice",
  age: 30,
  password: "secret123",
  confirmPassword: "secret123",
  email: "alice@example.com",
  gender: "female",
  country: "USA",
  image: "test.jpg",
  agreement: true,
};

describe("Card component", () => {
  test("Renderit all user data", () => {
    render(<Card {...mockUser} />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText(/Name: Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/Age: 30/i)).toBeInTheDocument();
    expect(screen.getByText(/Password: secret123/i)).toBeInTheDocument();
    expect(screen.getByText(/Email: alice@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: female/i)).toBeInTheDocument();
    expect(screen.getByText(/Country: USA/i)).toBeInTheDocument();
    expect(screen.getByAltText("Image")).toBeInTheDocument();
  });

  test("Adds class Highlight if Last = True", () => {
    render(<Card {...mockUser} last />);

    const cardElement = screen.getByRole("listitem");
    expect(cardElement).toHaveClass("card--highlight");
  });
});
