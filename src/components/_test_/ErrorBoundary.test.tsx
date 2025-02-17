import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ErrorBoundary } from "../ErrorBoundary";

const ProblemChild = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("renders fallback UI when an error is thrown", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText(/Something went wrong:-\(/i)).toBeInTheDocument();
    expect(screen.getByText(/Sorry, try again/i)).toBeInTheDocument();
    expect(screen.getByAltText(/error/i)).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
