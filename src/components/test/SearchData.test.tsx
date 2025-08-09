import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../App";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store/Store.tsx";
import { ThemeProvider } from "../../service/ThemeProvider.tsx";

import * as characterApiModule from "../../request/characterApi";
const mockCharacter = {
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

jest.mock("../Loader", () => {
  const MockLoader = () => <div>Loading...</div>;
  MockLoader.displayName = "Loader";
  return MockLoader;
});
describe("SearchData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("renders App component with first page", async () => {
    const spy = jest.spyOn(characterApiModule, "useGetCharactersQuery");

    spy.mockReturnValueOnce({
      data: undefined,
      error: undefined,
      isLoading: true,
      isFetching: true,
      refetch: jest.fn(),
    });

    const { rerender } = render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/page/1"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    spy.mockReturnValueOnce({
      data: {
        info: { next: null, pages: 1 },
        results: [mockCharacter],
      },
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: jest.fn(),
    });

    rerender(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/page/1"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(await screen.findByText(/Rick and Morty/i)).toBeInTheDocument();
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
  });

  test("renders error message when data fetch fails", async () => {
    const spy = jest.spyOn(characterApiModule, "useGetCharactersQuery");

    spy.mockReturnValueOnce({
      data: undefined,
      error: { status: 404, data: "Not Found" },
      isLoading: false,
      isFetching: false,
      refetch: jest.fn(),
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/page/1"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(
      await screen.findByText(/Sorry, the name is not found. Try another name/i)
    ).toBeInTheDocument();
  });

  test("renders cards when data is available", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/page/1"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    const cardElements = await screen.findAllByRole("listitem");
    expect(cardElements.length).toBeGreaterThan(0);
  });
});
