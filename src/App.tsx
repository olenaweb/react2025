import { useNavigate } from "react-router-dom";
import "./index.css";
import "./App.css";

import { useState, useRef } from "react";
import Modal from "@/components/form/modal";
import ControlledForm from "@/components/form/ControledForm";
import UncontrolledForm from "@/components/form/UnControledForm";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<"control" | "uncontrol">("control");

  const lastFocusedButton = useRef<HTMLButtonElement | null>(null);

  const controlFormHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    lastFocusedButton.current = e.currentTarget;
    navigate("/control", { replace: true });
    setFormType("control");
    setIsOpen(true);
  };

  const unControlFormHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    lastFocusedButton.current = e.currentTarget;
    navigate("/uncontrol", { replace: true });
    setFormType("uncontrol");
    setIsOpen(true);
  };

  const doCloseHandle = () => {
    setIsOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="view-app">
        <button onClick={controlFormHandle}>Control Form</button>
        <button onClick={unControlFormHandle}>Uncontrol Form</button>
      </div>
      <div className="view-body">
        <h1>Welcome to React Forms</h1>
        <p>Click the buttons above to open a form in a modal.</p>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={doCloseHandle} returnFocusRef={lastFocusedButton}>
          {formType === "control" ? <ControlledForm /> : <UncontrolledForm />}
        </Modal>
      )}
    </>
  );
};

export default App;
