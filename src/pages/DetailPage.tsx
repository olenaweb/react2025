import { useLoaderData } from "react-router-dom";
import { Character } from "../types/types";
import { Link } from "react-router-dom";

const DetailPage = () => {
  const data = useLoaderData() as Character;

  return (
    <>
      <Link className="detail-page-exit" to={`/react2024`}>
        ⨉
      </Link>
      <h2>Detail for ID: {data.id}</h2>
      <img src={data.image} alt={data.name} />
      <p>
        <b>Name: {data.name}</b>
      </p>
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
