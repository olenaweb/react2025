import React from "react";
import "./forms.css";
import Content from "./content";
type Props = {
  onClose?: () => void;
};
const AddNewInformation: React.FC<Props> = ({ onClose }) => {
  return (
    <div className={"wrapper"}>
      <h1>Select additional information</h1>
      <Content onClose={onClose} />
    </div>
  );
};

export default AddNewInformation;
