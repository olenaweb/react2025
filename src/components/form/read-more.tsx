import React from "react";
import Content from "./content";

const ReadMore: React.FC = () => {
  return (
    <div className={"wrapper"}>
      <h1>Select additional columns for viewing</h1>
      <Content />
    </div>
  );
};

export default ReadMore;
