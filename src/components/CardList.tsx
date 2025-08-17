import { Card } from "../components/Card";
import { AllCharacter } from "../types/types";

import React from "react";

export const CardList: React.FC<AllCharacter> = ({ results }) => {
  return (
    <ul className="cards">
      {results.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </ul>
  );
};
