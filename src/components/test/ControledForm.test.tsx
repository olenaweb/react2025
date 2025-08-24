import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ControledForm from "../form/ControledForm";
import ControledContent from "../form/ControledContent";

jest.mock("../form/ControledContent", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-controled-content" />),
}));

const MockedControledContent = ControledContent as jest.Mock;

describe("ControledForm", () => {
  beforeEach(() => {
    MockedControledContent.mockClear();
  });

  test("must display the title and a subsidiary component", () => {
    render(<ControledForm />);

    const heading = screen.getByRole("heading", { name: /1.Controlled Form/i });
    expect(heading).toBeInTheDocument();

    expect(screen.getByTestId("mock-controled-content")).toBeInTheDocument();
  });
});
