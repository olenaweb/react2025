import { render, screen } from "@testing-library/react";
import Popup from "../Popup";
import { useAppSelector, useAppDispatch } from "../../store/appHook";
import { removeFavorite } from "../../store/favoriteSlice";
import userEvent from "@testing-library/user-event";

jest.mock("../../store/appHook", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

jest.mock("../ExportButton", () => {
  const ExportButtonMock = () => <div>ExportButtonMock</div>;
  ExportButtonMock.displayName = "ExportButtonMock";
  return ExportButtonMock;
});

jest.mock("../../store/favoriteSlice", () => ({
  removeFavorite: jest.fn((item) => ({ type: "favorites/removeFavorite", payload: item })),
}));

describe("Popup component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should not render if there are no favorites", () => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({ favorites: { favorites: [] } })
    );

    const { container } = render(<Popup />);
    expect(container).toBeEmptyDOMElement();
  });

  test("should render correctly when there are favorites", () => {
    const mockFavorites = [
      { id: 1, name: "Rick" },
      { id: 2, name: "Morty" },
    ];

    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({ favorites: { favorites: mockFavorites } })
    );

    render(<Popup />);

    expect(screen.getByText("Selected 2 items")).toBeInTheDocument();
    expect(screen.getByText("Unselect All")).toBeInTheDocument();
    expect(screen.getByText("ExportButtonMock")).toBeInTheDocument();
  });

  test('should dispatch removeFavorite for each favorite on "Unselect All" click', async () => {
    const mockFavorites = [
      { id: 1, name: "Rick" },
      { id: 2, name: "Morty" },
    ];

    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({ favorites: { favorites: mockFavorites } })
    );

    render(<Popup />);

    const button = screen.getByRole("button", { name: /Unselect All/i });
    await userEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledTimes(mockFavorites.length);
    mockFavorites.forEach((fav) => {
      expect(mockDispatch).toHaveBeenCalledWith(removeFavorite(fav));
    });
  });
});
