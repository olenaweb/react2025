import { getData } from "../../request/getData";
import { SuccessResponse, ErrorResponse } from "../../types/types";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("getData function", () => {
  it("should return data on successful fetch", async () => {
    const mockResponse: SuccessResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: { name: "Earth (C-137)", url: "" },
          location: { name: "Earth (Replacement Dimension)", url: "" },
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          episode: [],
          url: "",
          created: "2017-11-04T18:48:46.250Z",
        },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await getData("Rick", "1");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character/?page=1&name=Rick"
    );
    expect(result).toEqual(mockResponse);
  });

  it("should return an error response when the API returns an error", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ error: "Character not found" }), { status: 404 });

    const result = await getData("Unknown", "1");

    expect(result).toEqual({ error: "Character not found" } as ErrorResponse);
  });

  it("should return a default error message when an unknown error occurs", async () => {
    fetchMock.mockRejectOnce(new Error("Network Error"));

    const result = await getData("Rick", "1");

    expect(result).toEqual({ error: "Network Error" } as ErrorResponse);
  });
});
