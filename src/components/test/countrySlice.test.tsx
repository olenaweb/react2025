import { countriesSlice, addCountry, removeCountry } from "@/features/countries/countriesSlice";

describe("countriesSlice", () => {
  const initial = { countries: ["USA", "Canada"] };

  test("Returns Initialstate by default", () => {
    const state = countriesSlice.reducer(undefined, { type: "unknown" });
    expect(state.countries.length).toBeGreaterThan(0);
  });

  test("Addcountry adds the country", () => {
    const state = countriesSlice.reducer(initial, addCountry("Ukraine"));
    expect(state.countries).toContain("Ukraine");
  });

  test("Removecountry deleys the country", () => {
    const state = countriesSlice.reducer(initial, removeCountry("USA"));
    expect(state.countries).not.toContain("USA");
    expect(state.countries).toContain("Canada");
  });
});
