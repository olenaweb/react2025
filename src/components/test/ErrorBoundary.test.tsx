import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { Component, ReactNode } from "react";
import ErrorButton from "../ErrorButton";
import { waitFor } from "@testing-library/react";

class ThrowError extends Component {
  componentDidMount(): void {
    throw new Error('New Error was created by press button "Create Error"');
  }
  render(): ReactNode {
    return null;
  }
}
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("ErrorBoundary Component", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => { });
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  test("1 intercepts and processes TypeScript error in subsidiary components", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText(/404 There nothing here/i)).toBeInTheDocument();
  });

  test("2 displays a backup interface with an error", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
    expect(screen.getByText(/404 There nothing here/i)).toBeInTheDocument();
  });

  test("3 drops an error when pressing a button", () => {
    const WorkingComponent = () => <p>Rick and Morty</p>;

    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/404 There nothing here/i)).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole("button", { name: /Back/i }));
    expect(screen.getByText(/Rick and Morty/i)).toBeInTheDocument();
  });

  test("4 creates an error when pressing the ErrorButton button", async () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    await waitFor(() => {
      const button = screen.getByRole("button", { name: /Back/i });
      expect(button).toBeInTheDocument();
      expect(screen.getByText(/404 There nothing here/i)).toBeInTheDocument();
    });
  });

  test("5 should reset the error and show children after repeated render", async () => {
    const FailingComponent = () => {
      throw new Error("Test error");
    };

    const WorkingComponent = () => <p>Rick and Morty</p>;

    const { rerender } = render(
      <ErrorBoundary>
        <FailingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/404 There nothing here/i)).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );
    await userEvent.click(screen.getByRole("button", { name: /Back/i }));
    expect(screen.getByText(/Rick and Morty/i)).toBeInTheDocument();
  });
});
