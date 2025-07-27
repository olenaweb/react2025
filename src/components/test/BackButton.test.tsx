import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "../BackButton";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUsedNavigate,
}));

describe("BackButton", () => {
  beforeEach(() => {
    mockedUsedNavigate.mockClear();
  });

  test("calls navigate(-1) if history length > 1", () => {
    Object.defineProperty(window.history, "length", {
      configurable: true,
      value: 2,
    });

    render(<BackButton />);
    const button = screen.getByRole("button", { name: /back/i });
    fireEvent.click(button);

    expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
  });

  test("calls navigate('/') with replace: true if history length <= 1", () => {
    Object.defineProperty(window.history, "length", {
      configurable: true,
      value: 1,
    });

    render(<BackButton />);
    const button = screen.getByRole("button", { name: /back/i });
    fireEvent.click(button);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/react2025", { replace: true });
  });
});
