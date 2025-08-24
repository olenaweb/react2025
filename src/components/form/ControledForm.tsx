import React from "react";
import "./forms.css";
import ControledContent from "./ControledContent";
type Props = {
  onClose?: () => void;
};
const ControledForm: React.FC<Props> = ({ onClose }) => {
  return (
    <div className={"wrapper"}>
      <h1>1.Controlled Form</h1>
      <ControledContent onClose={onClose} />
    </div>
  );
};

export default ControledForm;
