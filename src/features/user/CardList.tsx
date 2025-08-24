import Card from "./Card";
import { FormData as UserData } from "@/type/type";
import React from "react";
type CardListProps = {
  result: UserData[];
};
import "./user.css";

export const CardList: React.FC<CardListProps> = ({ result }) => {
  const lastElementIndex = result.length - 1;
  return (
    <ul className="cards">
      {result.map((item, i) => (
        <Card key={i} {...item} last={i === lastElementIndex} />
      ))}
    </ul>
  );
};
