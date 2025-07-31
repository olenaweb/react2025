import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./../store/appHook";
import { addFavorite, removeFavorite } from "./../store/favoriteSlice";
import React, { useState, useEffect } from "react";
import { Character, FavoriteItem } from "../types/types";

export const Card = ({ id, name, image, gender, species, status }: Character) => {
  const { pageId = 1 } = useParams<{ pageId: string }>();

  const dispatch = useAppDispatch();
  const favoriteItem: FavoriteItem = { id, name, image, gender, species, status };

  const { favorites } = useAppSelector((state) => state.favorites);
  const [isFavorite, setIsFavorite] = useState(favorites.includes(favoriteItem));

  useEffect(() => {
    const isThere = favorites.some((item) => item.id === favoriteItem.id);
    setIsFavorite(isThere);
  }, [favorites, favoriteItem.id]);

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(addFavorite(favoriteItem));
    setIsFavorite(true);
  };

  const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(removeFavorite(favoriteItem));
    setIsFavorite(false);
  };

  return (
    <li className="card">
      <div className="manager-panel">
        {!isFavorite && (
          <button className="light-to-favorite btn" onClick={addToFavorite}>
            Add
          </button>
        )}
        {isFavorite && (
          <button className="light-from-favorite btn" onClick={removeFromFavorite}>
            Remove
          </button>
        )}
      </div>
      <Link to={`/page/${pageId}/detail/${id}`}>
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
      </Link>
    </li>
  );
};
