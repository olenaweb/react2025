// import { useState, useEffect } from "react";
// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "./App.css";

import { useState } from "react";
import Modal from "@/components/form/modal";
import ControlledForm from "@/components/form/ControledForm";
import UncontrolledForm from "@/components/form/UnControledForm";

type AppProps = {
  modalRoot: HTMLElement; // сюда передаем div из main.tsx
};

const App: React.FC<AppProps> = ({ modalRoot }: AppProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<"control" | "uncontrol">("control");

  const controlFormHandle = () => {
    navigate("/control", { replace: true });
    setFormType("control");
    setIsOpen(true);
  };
  const unControlFormHandle = () => {
    navigate("/uncontrol", { replace: true });
    setFormType("uncontrol");
    setIsOpen(true);
  };
  const doCloseHandle = () => {
    setIsOpen(false);
    // if (modalRoot) {
    //   modalRoot.style.zIndex = "-1";
    // }
    navigate("/", { replace: true });
  };
  // useEffect(() => {
  //   if (isOpen && modalRoot) {
  //     modalRoot.style.zIndex = "1000";
  //   } else if (modalRoot) {
  //     modalRoot.style.zIndex = "-1";
  //   }
  // }, [isOpen, modalRoot]);
  return (
    <>
      <div className="view-app">
        <button onClick={controlFormHandle}>Control Form</button>
        <button onClick={unControlFormHandle}>Uncontrol Form</button>
      </div>
      <Modal isOpen={isOpen} onClose={doCloseHandle} container={modalRoot}>
        {formType === "control" ? <ControlledForm /> : <UncontrolledForm />}
      </Modal>
    </>
  );
};

export default App;
