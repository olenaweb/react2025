import { getData } from "./../../request/getData";

describe("getData API integration tests", () => {
  test("calls API with correct parameters", async () => {
    const searchTerm = "rick";
    const choosenPage = "1";

    const fetchSpy = jest.spyOn(global, "fetch");
    await getData(searchTerm, choosenPage);
    expect(fetchSpy).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character/?page=${choosenPage}&name=${searchTerm}`
    );

    fetchSpy.mockRestore();
  });

  test("handles successful API response", async () => {
    const response = await getData("rick", "1");
    if ("results" in response) {
      expect("results" in response).toBe(true);
      expect(response.results.length).toBeGreaterThan(0);
      expect(response.results[0].name).toBe("Rick Sanchez");
    }
  });

  test("handles API error response: 404 unknown-name", async () => {
    const response = await getData("unknown-name", "1");
    expect("error" in response).toBe(true);
    if ("error" in response) {
      expect(response.error).toBe("There is nothing here");
    }
  });
  test("handles API error response: 500 Internal Server Error ", async () => {
    const response = await getData("error", "1");
    expect("error" in response).toBe(true);
    if ("error" in response) {
      expect(response.error).toBe("Internal Server Error");
    }
  });
});
