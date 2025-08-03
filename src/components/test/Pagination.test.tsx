import { fireEvent, screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Pagination from "../Pagination";

test("updates URL query parameter when page changes", () => {
  const mockUpdateCurrentPage = jest.fn();

  render(
    <MemoryRouter initialEntries={["/page/1"]}>
      <Pagination
        currentPage="1"
        updateCurrentPage={mockUpdateCurrentPage}
        nextPage="2"
        lastPage={10}
      />
    </MemoryRouter>
  );

  const nextButton = screen.getByText("Next");
  fireEvent.click(nextButton);

  expect(mockUpdateCurrentPage).toHaveBeenCalledWith("2");
});
