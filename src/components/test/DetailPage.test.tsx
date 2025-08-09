import { render, screen } from "@testing-library/react";
import DetailPage from "../../app-pages/DetailPage";
import { Provider } from "react-redux";
import { store } from "../../store/Store";
import { ThemeProvider } from "../../service/ThemeProvider";
import { MemoryRouter } from "react-router-dom";
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
describe("DetailPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Loader initially and then shows character details", async () => {
    const spy = jest.spyOn(characterApiModule, "useGetCharacterByIdQuery");

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
          <MemoryRouter initialEntries={["/detail/1"]}>
            <DetailPage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    spy.mockReturnValueOnce({
      data: mockCharacter,
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: jest.fn(),
    });

    rerender(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/detail/1"]}>
            <DetailPage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(await screen.findByText(/Detail for ID: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Earth \(C-137\)/i)).toBeInTheDocument();
    expect(screen.getByText(/⨉/i)).toBeInTheDocument();
  });
});
