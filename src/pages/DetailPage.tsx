import { useLoaderData, useNavigation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Character } from "../types/types";
import Loader from "./../components/Loader";

const DetailPage = () => {
  const data = useLoaderData() as Character;
  const navigation = useNavigation();

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (navigation.state === "loading") {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [navigation.state]);

  let name = "";
  let location = "";
  if (data.origin) {
    name = data.origin.name ?? "";
  }
  if (data.location) {
    location = data.location.name ?? "";
  }

  const ContentDetail = () => {
    return (
      <>
        <Link className="detail-page-exit" to={`/react2025`}>
          <span>⨉</span>
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
        <p>Origin: {name}</p>
        <p>Location: {location}</p>
        <p>Created: {data.created}</p>
      </>
    );
  };

  return (
    <>
      {showLoader ? (
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
