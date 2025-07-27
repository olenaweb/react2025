import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "../Loader";

test("renders loading message", () => {
  render(<Loader />);
  const loadingMessage = screen.getByText(/Loading.../i);
  expect(loadingMessage).toBeInTheDocument();
});
