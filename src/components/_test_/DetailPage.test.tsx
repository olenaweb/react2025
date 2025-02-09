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

let navigationState: "idle" | "loading" | "submitting" = "idle";

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useLoaderData: () => mockCharacter,
    useNavigation: () => ({
      state: navigationState,
      location: { pathname: "/", search: "", hash: "", state: null, key: "default" },
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined,
      json: undefined,
      text: undefined,
    }),
  };
});

describe("DetailPage (idle state)", () => {
  beforeEach(() => {
    navigationState = "idle";
  });

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
  beforeEach(() => {
    navigationState = "loading";
  });

  it("renders Loader component when navigation state is loading", () => {
    render(
      <MemoryRouter>
        <DetailPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
