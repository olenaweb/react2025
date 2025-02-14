import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "../SearchInput";
import { getData } from "../../request/getData";
import { SuccessResponse } from "../../types/types";

jest.mock("../../request/getData");

test("retrieves value from local storage on mount", () => {
  localStorage.setItem("olena_01_search", "Rick Sanchez");

  render(<SearchInput searchValue="Rick Sanchez" currentPage="1" />);
  const inputElement = screen.getByDisplayValue(/Rick Sanchez/i);

  expect(inputElement).toBeInTheDocument();
  expect(localStorage.getItem("olena_01_search")).toBe("Rick Sanchez");
});

test("updates input value on change", () => {
  render(<SearchInput searchValue="" currentPage="1" />);

  const inputElement = screen.getByPlaceholderText("Enter the name") as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: "Morty" } });

  expect(inputElement.value).toBe("Morty");
});

test("submits form and calls update functions on success", async () => {
  const mockUpdateRequestData = jest.fn();
  const mockUpdateStoreValue = jest.fn();
  const mockUpdateErrorMessage = jest.fn();
  const mockUpdateCurrentPage = jest.fn();

  const mockResponse: SuccessResponse = {
    results: [{ id: 1, name: "Morty Smith", status: "Alive", species: "Human", gender: "Male" }],
    info: { count: 1, pages: 1, next: null, prev: null },
  };

  (getData as jest.Mock).mockResolvedValue(mockResponse);

  render(
    <SearchInput
      searchValue=""
      currentPage="1"
      updateRequestData={mockUpdateRequestData}
      updateStoreValue={mockUpdateStoreValue}
      updateErrorMessage={mockUpdateErrorMessage}
      updateCurrentPage={mockUpdateCurrentPage}
    />
  );

  const inputElement = screen.getByPlaceholderText("Enter the name");
  const submitButton = screen.getByRole("button", { name: /🔍/i });

  fireEvent.change(inputElement, { target: { value: "Morty" } });
  fireEvent.click(submitButton);

  await waitFor(() => expect(getData).toHaveBeenCalledWith("Morty", "1"));

  expect(mockUpdateRequestData).toHaveBeenCalledWith(mockResponse);
  expect(mockUpdateStoreValue).toHaveBeenCalledWith("Morty");
  expect(mockUpdateErrorMessage).toHaveBeenCalledWith("");
  expect(mockUpdateCurrentPage).toHaveBeenCalledWith("1");

  expect(localStorage.getItem("olena_01_search")).toBe("Morty");
});

test("handles API error and updates error message", async () => {
  const mockUpdateRequestData = jest.fn();
  const mockUpdateStoreValue = jest.fn();
  const mockUpdateErrorMessage = jest.fn();
  const mockUpdateCurrentPage = jest.fn();

  (getData as jest.Mock).mockResolvedValue({ error: "Character not found" });

  render(
    <SearchInput
      searchValue=""
      currentPage="1"
      updateRequestData={mockUpdateRequestData}
      updateStoreValue={mockUpdateStoreValue}
      updateErrorMessage={mockUpdateErrorMessage}
      updateCurrentPage={mockUpdateCurrentPage}
    />
  );

  const inputElement = screen.getByPlaceholderText("Enter the name");
  const submitButton = screen.getByRole("button", { name: /🔍/i });

  fireEvent.change(inputElement, { target: { value: "UnknownName" } });
  fireEvent.click(submitButton);

  await waitFor(() => expect(getData).toHaveBeenCalledWith("UnknownName", "1"));

  expect(mockUpdateErrorMessage).toHaveBeenCalledWith(
    "Character not found. Sorry , nothing to find, try again"
  );
  expect(mockUpdateStoreValue).toHaveBeenCalledWith("");
});
