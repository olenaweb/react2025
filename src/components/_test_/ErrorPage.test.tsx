import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ErrorPage from "./../../pages/ErrorPage";

test("Render the ErrorPage page", () => {
  render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>
  );
  expect(true).toBeTruthy();
});
