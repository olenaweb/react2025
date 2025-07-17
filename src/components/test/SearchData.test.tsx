import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../App";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../request/getData", () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      info: { count: 10, pages: 1, next: null, prev: null },
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          gender: "Male",
          species: "Human",
          status: "Alive",
          image: "url",
        },
      ],
    })
  ),
}));

test("renders cards when data is available", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const cardElements = await screen.findAllByRole("listitem");
  expect(cardElements.length).toBeGreaterThan(0);
});
