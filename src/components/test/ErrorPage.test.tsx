import { render, screen } from "@testing-library/react";
import ErrorPage from "../../app-pages/ErrorPage";
import errorImage from "../../assets/error.jpg";

jest.mock("../../components/BackButton", () => {
  const MockBackButton = () => <button>Back</button>;
  MockBackButton.displayName = "MockBackButton";
  return MockBackButton;
});

describe("ErrorPage", () => {
  test("renders error message, back button and error image", () => {
    render(<ErrorPage />);

    expect(screen.getByText(/404 There nothing here:-\(/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();

    const image = screen.getByAltText(/error/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("error-image");
    expect(image).toHaveAttribute("src", errorImage);
  });
});
