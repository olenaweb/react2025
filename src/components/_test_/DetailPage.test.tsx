import { screen } from "@testing-library/react";
// import { fireEvent } from "@testing-library/react";
// import { rest } from "msw";
import { render } from "../../test-render";

// import { server } from "../../mocks/server";
import DetailPage from "../../pages/DetailPage";

test("displays a loading indicator while fetching data", () => {
  render(<DetailPage />);

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

// test('displays the detailed card data correctly', async () => {
//   server.use(
//     rest.get('/characters/:id', (_req, res, ctx) => {
//       return res(ctx.json({ id: 1, name: 'Rick', image: 'rick.png', gender: 'Male', status: 'Alive', species: 'Human' }));
//     })
//   );

//   render(<DetailPage />);

//   expect(await screen.findByText(/Detail for ID:/i)).toBeInTheDocument();
//   expect(screen.getByText(/Rick/i)).toBeInTheDocument();
//   expect(screen.getByText(/Gender: Male/i)).toBeInTheDocument();
//   expect(screen.getByText(/Alive/i)).toBeInTheDocument();
// });

// test('hides the component when close button is clicked', async () => {
//   render(<DetailPage />);

//   const closeButton = await screen.findByText('⨉');
//   fireEvent.click(closeButton);

// expect(screen.queryByText(/Detail for ID/i)).not.toBeInTheDocument();
// });
