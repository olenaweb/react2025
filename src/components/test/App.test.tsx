import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import App from "@/App";

import { useAppSelector } from "@/app/appHook";

jest.mock("@/app/appHook", () => ({
  useAppSelector: jest.fn(),
}));

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("@/components/form/modal", () => ({
  __esModule: true,
  default: ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
    <div data-testid="modal">
      {children}
      <button onClick={onClose}>Close Modal</button>
    </div>
  ),
}));

jest.mock("@/components/form/ControledForm", () => ({
  __esModule: true,
  default: () => <div data-testid="controlled-form">Controlled Form</div>,
}));

jest.mock("@/components/form/UnControledForm", () => ({
  __esModule: true,
  default: () => <div data-testid="uncontrolled-form">Uncontrolled Form</div>,
}));

jest.mock("@/features/user/CardList", () => ({
  __esModule: true,
  CardList: ({ result }: { result: unknown[] }) => (
    <div data-testid="card-list">{result.length} cards</div>
  ),
}));

describe("App Component", () => {
  const mockedUseAppSelector = useAppSelector as jest.Mock;

  beforeEach(() => {
    mockedUseAppSelector.mockClear();
    mockedNavigate.mockClear();
  });

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  };

  it("must display the initial state without user data", () => {
    mockedUseAppSelector.mockReturnValue({ data: [] });
    renderComponent();

    expect(screen.getByText("Welcome to React Forms")).toBeInTheDocument();
    expect(screen.getByText("No user data available. Please submit the form.")).toBeInTheDocument();
  });

  it("must display Cardlist when there is user data", () => {
    const mockUserData = [{ id: 1, name: "Test User" }];
    mockedUseAppSelector.mockReturnValue({ data: mockUserData });
    renderComponent();

    expect(screen.getByTestId("card-list")).toBeInTheDocument();
    expect(
      screen.queryByText("No user data available. Please submit the form.")
    ).not.toBeInTheDocument();
  });

  it("must open a modal window with Controlledform", () => {
    mockedUseAppSelector.mockReturnValue({ data: [] });
    renderComponent();

    fireEvent.click(screen.getByText("Control Form"));

    expect(mockedNavigate).toHaveBeenCalledWith("/control", { replace: true });
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByTestId("controlled-form")).toBeInTheDocument();
  });

  it("must close the modal window", () => {
    mockedUseAppSelector.mockReturnValue({ data: [] });
    renderComponent();

    fireEvent.click(screen.getByText("Control Form"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close Modal"));

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    expect(mockedNavigate).toHaveBeenCalledWith("/", { replace: true });
  });
});
