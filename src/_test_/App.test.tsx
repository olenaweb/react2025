// import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
// import { waitFor } from "@testing-library/react";
// import { routes } from "../main";
// import { ErrorBoundary } from "../components/ErrorBoundary";
import App from "../App";
import "@testing-library/jest-dom";

jest.mock("../request/getData", () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [],
    })
  ),
}));

test("renders App without crashing", async () => {
  const consoleError = jest.spyOn(console, "error").mockImplementation(() => { });
  render(
    <MemoryRouter initialEntries={["/react2025/page/1"]}>
      <App />
    </MemoryRouter>
  );

  const heading = await screen.findByText(/Rick and Morty/i);
  expect(heading).toBeInTheDocument();
  consoleError.mockRestore();

});



// test("shows error when route param is not a number", async () => {
//   const consoleError = jest.spyOn(console, "error").mockImplementation(() => { });

//   const router = createMemoryRouter(routes, {
//     initialEntries: ["/react2025/page/abc/detail/123"],
//   });

//   render(
//     <ErrorBoundary>
//       <RouterProvider router={router} />
//     </ErrorBoundary>
//   );

//   await waitFor(() => {
//     expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
//   });

//   consoleError.mockRestore();
// });


