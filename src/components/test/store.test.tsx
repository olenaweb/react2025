import { store } from "@/app/store";
import { saveUser } from "@/features/user/userSlice";
import { addCountry } from "@/features/countries/countriesSlice";

describe("store integration", () => {
  test("must save the user through Dispatch", () => {
    store.dispatch(
      saveUser({
        name: "Bob",
        age: 40,
        password: "pass123",
        confirmPassword: "secret123",
        email: "bob@example.com",
        gender: "male",
        country: "Canada",
        image: "",
        agreement: true,
      })
    );

    const state = store.getState().user;
    expect(state.data).toHaveLength(1);
    expect(state.data[0].name).toBe("Bob");
  });

  test("should add the country through Dispatch", () => {
    store.dispatch(addCountry("Spain"));
    const state = store.getState().countries;
    expect(state.countries).toContain("Spain");
  });
});
