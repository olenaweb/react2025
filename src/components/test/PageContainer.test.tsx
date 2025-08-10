import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PageContainer from "../../components/PageContainer";
import { MemoryRouter, useNavigation } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigation: jest.fn(),
  Outlet: () => <div>Mocked Outlet</div>,
}));

describe("PageContainer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Outlet without wrapper when navigation.state is 'loading'", () => {
    (useNavigation as jest.Mock).mockReturnValue({ state: "loading" });

    render(
      <MemoryRouter>
        <PageContainer />
      </MemoryRouter>
    );

    expect(screen.getByText(/Mocked Outlet/i)).toBeInTheDocument();
    const wrapper = screen.getByText(/Mocked Outlet/i).parentElement;
    expect(wrapper).not.toHaveClass("detail-page");
  });

  test("renders Outlet inside wrapper when navigation.state is not 'loading'", () => {
    (useNavigation as jest.Mock).mockReturnValue({ state: "idle" });

    render(
      <MemoryRouter>
        <PageContainer />
      </MemoryRouter>
    );

    const wrapper = screen.getByText(/Mocked Outlet/i).parentElement;
    expect(wrapper).toHaveClass("detail-page");
  });
});
