import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import ErrorButton from "../../components/ErrorButton";
import { Component, ReactNode } from "react";

class ThrowError extends Component {
  componentDidMount(): void {
    throw new Error('New Error was created by press button "Create Error"');
  }
  render(): ReactNode {
    return null;
  }
}

describe("ErrorBoundary Component", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => { });
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  test("intercepts and processes TypeScript error in subsidiary components", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  test("displays a backup interface with an error", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  test("drops an error when pressing a button", () => {
    const WorkingComponent = () => <p>Rick and Morty</p>;

    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(screen.getByText(/Rick and Morty/i)).toBeInTheDocument();
  });

  test("creates an error when pressing the Errorbutton button", () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole("button", { name: /create error/i }));

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
  test("should reset the error and show children after repeated render", async () => {
    const FailingComponent = () => {
      throw new Error("Test error");
    };

    const WorkingComponent = () => <p>Rick and Morty</p>;

    const { rerender } = render(
      <ErrorBoundary>
        <FailingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );
    await userEvent.click(screen.getByRole("button", { name: /Back to main/i }));
    expect(screen.getByText(/Rick and Morty/i)).toBeInTheDocument();
  });
});
