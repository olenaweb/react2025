import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import App from "../../App";
import { server } from "../../mocks/server"; // путь к твоему msw серверу
import { rest, RestRequest, ResponseComposition, RestContext } from "msw";
import { Response } from "../../types/types";

test("shows error message when network fails", async () => {
  server.use(
    rest.get<undefined, Response>(
      "https://rickandmortyapi.com/api/character",
      (_req: RestRequest, res: ResponseComposition) => {
        return res.networkError("Network failure");
      }
    )
  );

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText("Enter the name");
  await userEvent.type(input, "Rick");
  await userEvent.keyboard("{enter}");
  await waitFor(() => {
    expect(screen.getByText(/Sorry, the name is not found. Try another name/i)).toBeInTheDocument();
  });
});
test("shows error message when server returns 404", async () => {
  server.use(
    rest.get<undefined, Response>(
      "https://rickandmortyapi.com/api/character",
      (_req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
        return res(ctx.status(404), ctx.json({ error: "There is nothing here" }));
      }
    )
  );

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText("Enter the name");
  await userEvent.type(input, "unknown-name");
  await userEvent.keyboard("{enter}");
  await waitFor(() => {
    expect(screen.getByText(/Sorry, the name is not found. Try another name/i)).toBeInTheDocument();
  });
});
test("shows error message when server returns 500", async () => {
  server.use(
    rest.get<undefined, Response>(
      "https://rickandmortyapi.com/api/character",
      (_req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
        return res(ctx.status(500), ctx.json({ error: "Internal Server Error" }));
      }
    )
  );

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText("Enter the name");
  await userEvent.type(input, "error");
  await userEvent.keyboard("{enter}");
  await waitFor(() => {
    expect(screen.getByText(/Sorry, the name is not found. Try another name/i)).toBeInTheDocument();
  });
});
