import { render, screen } from "@testing-library/react";
import ExportButton from "../ExportButton";
import { FavoriteItem } from "../../types/types";
import { waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

jest.mock("../assets/load.png", () => "mocked-load.png");

describe("ExportButton", () => {
  const favorites: FavoriteItem[] = [
    {
      id: 1,
      name: "Rick",
      image: "http://example.com/rick.png",
      gender: "Male",
      species: "Human",
      status: "Alive",
    },
    {
      id: 2,
      name: "Morty",
      image: "http://example.com/morty.png",
      gender: "Male",
      species: "Human",
      status: "Alive",
    },
  ];

  test("should generate CSV and trigger download on button click", async () => {
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
    render(<ExportButton favorites={favorites} />);

    const button = screen.getByRole("button", { name: /download/i });
    const link = screen.getByRole("link", { name: "download-link" });

    await userEvent.click(button);
    waitFor(() => {
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", expect.stringContaining("blob:"));
      expect(link).toHaveAttribute("download", "2_items.csv");
    });
    consoleErrorMock.mockRestore();
  });
});
