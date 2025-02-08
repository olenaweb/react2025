let mockNavigationState = "loading";

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigation: () => ({ state: mockNavigationState }),
    Outlet: () => <div data-testid="fake-outlet">Outlet Content</div>,
  };
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageContainer from "../PageContainer";

describe("PageContainer", () => {
  it('renders Outlet without wrapper when navigation state is "loading"', () => {
    mockNavigationState = "loading";
    const { container } = render(
      <MemoryRouter>
        <PageContainer />
      </MemoryRouter>
    );

    expect(container.querySelector(".detail-page")).toBeNull();
    expect(screen.getByTestId("fake-outlet")).toHaveTextContent("Outlet Content");
  });

  it('renders Outlet with wrapper when navigation state is not "loading"', () => {
    mockNavigationState = "idle";
    const { container } = render(
      <MemoryRouter>
        <PageContainer />
      </MemoryRouter>
    );

    expect(container.querySelector(".detail-page")).toBeInTheDocument();
    expect(screen.getByTestId("fake-outlet")).toHaveTextContent("Outlet Content");
  });
});
