import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { ErrorButton } from "../../components/ErrorButton";
import { Component } from "react";
import { ReactNode } from "react";

class ThrowError extends Component {
  componentDidMount(): void {
    throw new Error("New Error was created by press button \"Create Error\"");
  }
  render(): ReactNode {
    return null;
  }
}
describe("ErrorBoundary Component", () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("intercepts and processes TypeScript error in subsidiary components", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("displays a backup interface with an error", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByAltText(/error/i)).toBeInTheDocument();
  });

  it("drops an error when pressing a button", () => {
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

  it("creates an error when pressing the Errorbutton button", () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole("button", { name: /create error/i }));

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
  it("should reset the error and show children after repeated render", async () => {
    const user = userEvent.setup();

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

    await user.click(screen.getByText(/Sorry, try again/i));
    expect(screen.getByText(/Rick and Morty/i)).toBeInTheDocument();
  });


});
