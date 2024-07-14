import { useLoaderData } from "react-router-dom";
import { Character } from "../types/types";
import { Link, useNavigation } from "react-router-dom";
import Loader from "./../components/Loader";

const DetailPage = () => {
  const data = useLoaderData() as Character;
  const navigation = useNavigation();
  const ContentDetail = () => {
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

  return (
    <>
      {navigation.state === "loading" ? (
        <div className="detail-page">
          <Loader />
        </div>
      ) : (
        <ContentDetail />
      )}
    </>
  );
};

export default DetailPage;
