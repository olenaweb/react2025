import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../App";
import { MemoryRouter } from "react-router-dom";

test('shows message when no cards are found', async () => {
  jest.mock('../../request/getData', () => ({
    getData: jest.fn(() => Promise.resolve({
      error: 'Error fetching data'
    }))
  }));

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const errorMessage = await screen.findByText(/Sorry, the name is not found. Try another name/i);
  expect(errorMessage).toBeInTheDocument();
});
