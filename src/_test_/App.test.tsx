import { render } from "../test-render"; // Импортируйте customRender из test-utils
import App from "../App";

describe("App", () => {
  it("renders correctly", () => {
    const { getByText } = render(<App />);

    expect(getByText("Rick and Morty")).toBeInTheDocument();
  });
});
