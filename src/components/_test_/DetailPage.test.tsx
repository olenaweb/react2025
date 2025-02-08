import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DetailPage from "../../pages/DetailPage";
import { Character } from "../../types/types";

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth (C-137)", url: "" },
  location: { name: "Earth (Replacement Dimension)", url: "" },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [],
  url: "",
  created: "2017-11-04T18:48:46.250Z",
};

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useLoaderData: () => mockCharacter,
    useNavigation: () => ({ state: "idle" }),
  };
});

describe("DetailPage (idle state)", () => {
  it("renders detailed card information correctly", async () => {
    render(
      <MemoryRouter>
        <DetailPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Detail for ID: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Name: Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: Alive/i)).toBeInTheDocument();
    expect(screen.getByText(/Species: Human/i)).toBeInTheDocument();
    expect(screen.getByText("⨉")).toBeInTheDocument();
  });
});

describe("DetailPage (loading state)", () => {
  beforeAll(() => {
    jest.resetModules();
    jest.doMock("react-router-dom", () => {
      const actual = jest.requireActual("react-router-dom");
      return {
        ...actual,
        useLoaderData: () => mockCharacter,
        useNavigation: () => ({ state: "loading" }),
      };
    });
  });

  it("renders Loader component when navigation state is loading", async () => {
    const { default: DetailPageLoading } = await import("../../pages/DetailPage");
    render(
      <MemoryRouter>
        <DetailPageLoading />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
