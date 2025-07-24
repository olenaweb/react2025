import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

test("shows error message when network fails", async () => {
  const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network failure"));

  render(<App />);

  const input = screen.getByPlaceholderText("Enter the name");
  await userEvent.type(input, "Rick");
  await userEvent.keyboard("{enter}");
  await waitFor(() => {
    expect(screen.getByText(/Sorry, the name is not found. Try another name/i)).toBeInTheDocument();
  });

  consoleErrorMock.mockRestore();
  (global.fetch as jest.Mock).mockRestore?.();
});
