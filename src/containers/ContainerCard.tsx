import React from "react";
import { Link } from "react-router-dom";
import { Result } from "../types/types";

interface ContainerProps {
  results: Result[];
}

export const Container: React.FC<ContainerProps> = ({ results }) => {
  return (
    <div className="cards-container">
      {results.map((result) => (
        <Link to={`/react2024/detail/${result.id}`} key={result.id}>
          <div className="card">
            {/* Render card content here */}
            <p>{result.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
