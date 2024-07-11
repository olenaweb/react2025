import React from "react";
import { Character } from "../types/types";

export const Card: React.FC<Character> = ({ name, image, gender, species, status }) => {
  return (
    <li className="card">
      <div className="card-content">
        <p className="card-name">
          <b>{name}</b>
        </p>
        <div>
          <img className="card-image" src={image} alt={name} />
        </div>
        <p>Gender: {gender}</p>
        <p>Species: {species}</p>
        <p className="card-status"> {status}</p>
      </div>
    </li>
  );
};
