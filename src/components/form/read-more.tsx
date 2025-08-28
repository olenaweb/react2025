import React from "react";
import Content from "./content";
type Props = {
  onClose?: () => void;
};
const ReadMore: React.FC<Props> = ({ onClose }) => {
  return (
    <div className={"wrapper"}>
      <h1>Select additional information</h1>
      <Content onClose={onClose} />
    </div>
  );
};

export default ReadMore;
