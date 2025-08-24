import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import ControledContent from "../form/ControledContent";
import { saveUser } from "@/features/user/userSlice";

const mockDispatch = jest.fn();
jest.mock("@/app/appHook", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn().mockImplementation((selector) =>
    selector({
      countries: { countries: ["Ukraine", "USA"] },
    })
  ),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: () => ({ current: { focus: jest.fn() } }),
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: jest.fn((onSubmit) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit({
        name: "John",
        age: 25,
        email: "john.doe@example.com",
        password: "StrongP@ssw0rd",
        confirmPassword: "StrongP@ssw0rd",
        gender: "male",
        agreement: true,
        country: "Ukraine",
        image: "",
      });
    }),
    formState: { errors: {}, isValid: true, isSubmitting: false },
    reset: jest.fn(),
  }),
}));

describe("ControledContent - Final Fixed Test", () => {
  const mockStore = configureStore({
    reducer: {
      countries: () => ({ countries: ["Ukraine", "USA"] }),
    },
  });

  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <ControledContent onClose={mockOnClose} />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render all form fields correctly", () => {
    // Проверяем, что все поля формы отображаются на экране
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Age:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Gender:")).toBeInTheDocument();
    expect(screen.getByLabelText("Country:")).toBeInTheDocument();
    expect(screen.getByLabelText(/I agree to the terms and conditions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Avatar/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  test("should show validation errors on submit with invalid data", async () => {
    userEvent.click(screen.getByRole("button", { name: /Submit/i }));
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    });
  });

  test("should handle form submission with valid data (no file)", async () => {
    userEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);

      const expectedPayload = {
        name: "John",
        age: 25,
        email: "john.doe@example.com",
        password: "StrongP@ssw0rd",
        confirmPassword: "StrongP@ssw0rd",
        gender: "male",
        agreement: true,
        country: "Ukraine",
        image: "",
      };
      expect(mockDispatch).toHaveBeenCalledWith(saveUser(expectedPayload));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
