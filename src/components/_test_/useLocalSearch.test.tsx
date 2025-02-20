import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useLocalSearch from "../../utils/useLocalSearch";

const TestComponent: React.FC<{ keyName: string; initialValue: string }> = ({
  keyName,
  initialValue,
}) => {
  const [value, setValue] = useLocalSearch(keyName, initialValue);
  return (
    <div>
      <span data-testid="value">{value}</span>
      <button onClick={() => setValue("changed")}>Change Value</button>
    </div>
  );
};

describe("useLocalSearch hook (via wrapper component)", () => {
  const key = "test_key";
  const initialValue = "initial";

  beforeEach(() => {
    localStorage.clear();
  });

  it("updates state and localStorage when setValue is called", async () => {
    render(<TestComponent keyName={key} initialValue={initialValue} />);
    const button = screen.getByText("Change Value");
    fireEvent.click(button);
    expect(screen.getByTestId("value")).toHaveTextContent("changed");
    await waitFor(() => {
      expect(localStorage.getItem(key)).toBe("changed");
    });
  });
});
