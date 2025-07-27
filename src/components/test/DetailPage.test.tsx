import { render, screen } from "@testing-library/react";
import DetailPage from "../../app-pages/DetailPage";
import { Character } from "../../types/types";
import { act } from "react";
import { ReactNode } from "react";

jest.useFakeTimers();
jest.mock("../Loader", () => {
  const MockLoader = () => <div>Loading...</div>;
  MockLoader.displayName = "MockLoader";
  return {
    __esModule: true,
    default: MockLoader,
  };
});

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth (C-137)" },
  location: { name: "Citadel of Ricks" },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  created: "2017-11-04T18:48:46.250Z",
};

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");

  const MockLink = ({ children }: { children: ReactNode }) => <a>{children}</a>;
  MockLink.displayName = "MockLink";

  return {
    ...actual,
    useLoaderData: () => mockCharacter,
    useNavigation: () => ({ state: "idle" }),
    Link: MockLink,
  };
});

describe("DetailPage", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test("renders Loader initially and then shows character details", async () => {
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
    act(() => {
      render(<DetailPage />);
    });

    jest.advanceTimersByTime(600);

    expect(await screen.findByText(/Detail for ID: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Earth \(C-137\)/i)).toBeInTheDocument();
    expect(screen.getByText(/⨉/i)).toBeInTheDocument();
    consoleErrorMock.mockRestore();
  });
});
