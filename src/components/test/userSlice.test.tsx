import userReducer, { saveUser } from "@/features/user/userSlice";
import { FormData } from "@/type/type";

const mockUser: FormData = {
  name: "Alice",
  age: 30,
  password: "secret123",
  confirmPassword: "secret123",
  email: "alice@example.com",
  gender: "female",
  country: "USA",
  image: "test.jpg",
  agreement: true,
};

describe("userSlice", () => {
  test("must return Initialstate by default", () => {
    const state = userReducer(undefined, { type: "unknown" });
    expect(state).toEqual({ data: [] });
  });

  test("Saveuser adds a new user to stat", () => {
    const state = userReducer({ data: [] }, saveUser(mockUser));
    expect(state.data).toHaveLength(1);
    expect(state.data[0]).toEqual(mockUser);
  });
});
