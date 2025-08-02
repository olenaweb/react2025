import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "../BackButton";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUsedNavigate,
}));

test("BackButton calls navigate(-1) on click", () => {
  render(<BackButton />);

  const button = screen.getByRole("button", { name: /back/i });
  fireEvent.click(button);

  expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
});
