import { getDetailData } from "../../request/getDetailData";

describe("getDetailData", () => {
  const mockRequest = new Request("https://rickandmortyapi.com/api/character");
  const context = {};

  test("fetches character details successfully", async () => {
    const data = await getDetailData({
      request: mockRequest,
      params: { id: "1" },
      context,
    });

    expect(data).toHaveProperty("name", "Rick Sanchez");
    expect(data).toHaveProperty("status", "Alive");
    expect(data).toHaveProperty("species", "Human");
  });

  test("throws 404 error when character not found", async () => {
    await expect(
      getDetailData({
        request: mockRequest,
        params: { id: "404" },
        context,
      })
    ).rejects.toThrow("Not Found");
  });

  test("throws network error on server issue", async () => {
    await expect(
      getDetailData({
        request: mockRequest,
        params: { id: "error" },
        context,
      })
    ).rejects.toThrow("Network response was not ok");
  });
});
