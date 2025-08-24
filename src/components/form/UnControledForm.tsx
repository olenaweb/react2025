import React from "react";
import UnControledContent from "./UnControledContent";
import "./forms.css";
type Props = {
  onClose?: () => void;
};
const UnControledForm: React.FC<Props> = ({ onClose }) => {
  return (
    <div className={"wrapper"}>
      <h1>2.Uncontroled Form</h1>
      <UnControledContent onClose={onClose} />
    </div>
  );
};

export default UnControledForm;
