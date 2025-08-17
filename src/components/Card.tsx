import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { useAppSelector, useAppDispatch } from "./../store/appHook";
import { addFavorite, removeFavorite } from "@/store/slices/favoriteSlice";
import React, { useState, useEffect } from "react";
import { Character, FavoriteItem } from "../types/types";

export const Card: React.FC<Character> = (propsCharacter) => {
  const { id, name, image, gender, species, status } = propsCharacter;
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
          <button className="to-favorite btn" onClick={addToFavorite}>
            +
          </button>
        )}
        {isFavorite && (
          <button className="from-favorite btn" onClick={removeFromFavorite}>
            ✔
          </button>
        )}
      </div>
      <Link href={`/page/${pageId}/detail/${id}`}>
        <div className="card-content">
          <p className="card-name">
            <b>{name}</b>
          </p>
          <div>
            {/* <img className="card-image" src={image} alt={name} /> */}
            <Image
              className={"card-image"}
              width={500}
              height={500}
              src={image}
              alt={name}
              priority={true}
            />
          </div>
          <p>Gender: {gender}</p>
          <p>Species: {species}</p>
          <p className="card-status"> {status}</p>
        </div>
      </Link>
    </li>
  );
};
