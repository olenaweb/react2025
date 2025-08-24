import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UnControledContent from "../form/UnControledContent";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.mock("@/features/user/userSlice", () => ({
  saveUser: jest.fn((payload) => ({ type: "user/saveUser", payload })),
}));

const mockStore = configureStore([]);

const renderWithStore = (ui: React.ReactNode, { initialState = {} } = {}) => {
  const store = mockStore({
    countries: { countries: ["USA", "Canada"] },
    ...initialState,
  });
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

describe("UnControledContent", () => {
  test("Shows an error when downloading a wrong file", async () => {
    renderWithStore(<UnControledContent />);

    const badFile = new File(["dummy"], "file.txt", { type: "text/plain" });
    const fileInput = screen.getByLabelText(/avatar/i) as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [badFile] } });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/Only PNG or JPEG/i)).toBeInTheDocument();
  });
});
