import { screen } from "@testing-library/react";
import { render } from "../../test-render";

import DetailPage from "../../pages/DetailPage";

test("displays a loading indicator while fetching data", () => {
  render(<DetailPage />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});
