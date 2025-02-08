import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

let mockNavigationState = "loading";

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigation: () => ({ state: mockNavigationState }),
    Outlet: () => <div data-testid="fake-outlet">Outlet Content</div>,
  };
});

describe("PageContainer", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('renders Outlet without wrapper when navigation state is "loading"', async () => {
    mockNavigationState = "loading";
    const { default: PageContainer } = await import("../PageContainer");
    const { container } = render(
      <MemoryRouter>
        <PageContainer />
      </MemoryRouter>
    );

    expect(container.querySelector(".detail-page")).toBeNull();
    expect(screen.getByTestId("fake-outlet")).toHaveTextContent("Outlet Content");
  });

  it('renders Outlet with wrapper when navigation state is not "loading"', async () => {
    mockNavigationState = "idle";
    const { default: PageContainer } = await import("../PageContainer");
    const { container } = render(
      <MemoryRouter>
        <PageContainer />
      </MemoryRouter>
    );

    expect(container.querySelector(".detail-page")).toBeInTheDocument();
    expect(screen.getByTestId("fake-outlet")).toHaveTextContent("Outlet Content");
  });
});
