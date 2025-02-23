import React from "react";
import { Card } from "../components/Card";
import { CharacterArr } from "../types/types";

export const Container: React.FC<CharacterArr> = ({ results }) => {
  return (
    <ul className="cards">
      {results.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </ul>
  );
};
