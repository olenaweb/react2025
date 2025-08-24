import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../form/modal";

describe("Modal component", () => {
  test("renders modal with content", () => {
    render(
      <Modal isOpen onClose={() => { }}>
        <p>Test contents</p>
      </Modal>
    );
    expect(screen.getByText("Test contents")).toBeInTheDocument();
  });

  test("modal closes on button click", () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <button onClick={onClose}>Close</button>
      </Modal>
    );
    fireEvent.click(screen.getByText("Close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });


  test("modal closes on Escape key", () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <button>Test</button>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("modal closes when clicking overlay", () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <button>Test</button>
      </Modal>
    );

    const overlay = screen.getByText("Test").closest(".overlay")!;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
