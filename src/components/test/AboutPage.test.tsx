import { render, screen } from "@testing-library/react";
import AboutPage from "../../app-pages/AboutPage";
import rickmorty from "./../assets/Planet.png";

jest.mock("../../components/BackButton", () => {
  const MockBackButton = () => <button>Back</button>;
  MockBackButton.displayName = "MockBackButton";
  return MockBackButton;
});

describe("AboutPage", () => {
  test("renders author, links, back button and image", () => {
    render(<AboutPage />);

    expect(screen.getByText(/author: Olena Nevzorova/i)).toBeInTheDocument();

    const rsSchoolLink = screen.getByRole("link", { name: /RS School 2025/i });
    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute("href", "https://rs.school/docs/en");
    expect(rsSchoolLink).toHaveAttribute("target", "_blank");
    expect(rsSchoolLink).toHaveAttribute("rel", "noreferrer");

    const certLink = screen.getByRole("link", { name: /RS School certificate/i });
    expect(certLink).toBeInTheDocument();
    expect(certLink).toHaveAttribute("href", "https://app.rs.school/certificate/6d15cv22");
    expect(certLink).toHaveAttribute("target", "_blank");
    expect(certLink).toHaveAttribute("rel", "noreferrer");

    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();

    const image = screen.getByAltText(/rickmorty/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("about-image");
    expect(image).toHaveAttribute("src");
    expect(image.getAttribute("src")).toMatch(rickmorty);
  });
});
