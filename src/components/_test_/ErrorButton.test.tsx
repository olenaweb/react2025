import { render, screen } from "@testing-library/react";
import ErrorButton from "../ErrorButton";

describe(ErrorButton, () => {
  it("test ErrorButton button with provided text", () => {
    render(<button>Create Error</button>);
    const buttonItem = screen.getByText("Create Error");
    expect(buttonItem).toBeInTheDocument();
  });
});
