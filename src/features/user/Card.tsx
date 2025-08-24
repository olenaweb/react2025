import { FormData } from "@/type/type";
import React, { useEffect, useState } from "react";

type CardProps = FormData & { last?: boolean };

export const Card: React.FC<CardProps> = ({ last, ...data }) => {
  const [highlight, setHighlight] = useState<boolean>(false);

  useEffect(() => {
    if (!last) return;
    setHighlight(true);
    const timer = window.setTimeout(() => setHighlight(false), 10_000);
    return () => clearTimeout(timer);
  }, [last]);

  return (
    <li className={`card ${highlight ? "card--highlight" : ""}`}>
      <p>{data.name}</p>
      <div>{data.image && <img className="card-image" src={data.image} alt="Image" />}</div>
      <div>Name: {data.name}</div>
      <div>Age: {data.age}</div>
      <div>Password: {data.password}</div>
      <div>Email: {data.email}</div>
      <div>Gender: {data.gender}</div>
      <div>Country: {data.country}</div>
    </li>
  );
};

export default Card;
