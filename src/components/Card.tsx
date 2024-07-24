import React from "react";
import { Character } from "../types/types";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "./../store/useTheme";

export const Card: React.FC<Character> = ({ id, name, image, gender, species, status }) => {
  const { pageId } = useParams<{ pageId: string }>();
  const { theme } = useTheme();

  return (
    <li className="card">
      <Link
        className={theme === "light" ? "light-card-link" : "dark-card-link"}
        to={`/react2024/page/${pageId}/detail/${id}`}
      >
        <div className="card-content">
          <input
            name="chosen-item"
            className="chosen-item"
            type="checkbox"
            checked={false}
            onChange={() => {}}
          />
          {" 2222"}
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
      </Link>
    </li>
  );
};
