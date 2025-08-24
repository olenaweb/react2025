import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ControledForm from "../form/UnControledForm";
import ControledContent from "../form/UnControledContent";

jest.mock("../form/UnControledContent", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-controled-content" />),
}));

const MockedControledContent = ControledContent as jest.Mock;

describe("UnControledForm", () => {
  beforeEach(() => {
    MockedControledContent.mockClear();
  });

  test("must display the title and a subsidiary component", () => {
    render(<ControledForm />);

    const heading = screen.getByRole("heading", { name: /2.Uncontroled Form/i });
    expect(heading).toBeInTheDocument();

    expect(screen.getByTestId("mock-controled-content")).toBeInTheDocument();
  });
});
