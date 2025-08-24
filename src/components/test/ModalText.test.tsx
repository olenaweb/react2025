import { render, screen } from "@testing-library/react";
import Modal from "../form/modal";

test("a modal with text is rendered", () => {
  render(
    <Modal isOpen={true} onClose={() => {}}>
      <p>Test contents</p>
    </Modal>
  );
  expect(screen.getByText("Test contents")).toBeInTheDocument();
});

import { fireEvent } from "@testing-library/react";

test("The modal closes the button", () => {
  const onClose = jest.fn();
  render(
    <Modal isOpen={true} onClose={onClose}>
      <button onClick={onClose}>Close</button>
    </Modal>
  );

  fireEvent.click(screen.getByText("Close"));
  expect(onClose).toHaveBeenCalledTimes(1);
});
