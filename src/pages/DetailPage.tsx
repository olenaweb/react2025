import { useLoaderData } from "react-router-dom";
import { Character } from "../types/types";

const DetailPage = () => {
  const data = useLoaderData() as Character;

  return (
    <>
      <h2>Detail Page for ID: {data.id}</h2>
      <img src={data.image} alt={data.name} />
      <p><b>Name: {data.name}</b></p>
      <p>Status: {data.status}</p>
      <p>Species: {data.species}</p>
      <p>Type: {data.type}</p>
      <p>Gender: {data.gender}</p>
      <p>Origin: {data.origin.name}</p>
      <p>Location: {data.location.name}</p>
      <p>Created: {data.created}</p>
    </>
  );
};

export default DetailPage;
