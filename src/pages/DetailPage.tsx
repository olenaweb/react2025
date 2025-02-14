// import { useLoaderData, useNavigation, Link, useLocation } from "react-router-dom";
import { useLoaderData, useNavigation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Character } from "../types/types";
import Loader from "./../components/Loader";
import { LoaderFunctionArgs } from "react-router-dom";

const DetailPage = () => {
  // считывает  loader: detailLoader из routes
  const data = useLoaderData() as Character;
  const navigation = useNavigation();
  // считывает URL
  // const detailLocation = useLocation();
  // const match = detailLocation.pathname.match(/^\/react2025\/page\/\d+\//);
  // const shortLocation = match ? match[0] : '';
  // console.log('"shortLocation="', shortLocation);

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
        {/* <Link className="detail-page-exit" to={`${shortLocation}`}> */}
        <Link className="detail-page-exit" to="..">
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
        <div className="detail-page detail-page-load-host ">
          <Loader />
        </div>
      ) : (
        <ContentDetail />
      )}
    </>
  );
};

export default DetailPage;



export const detailLoader = async ({ params }: LoaderFunctionArgs) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const { id } = params;
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (response.status === 404) {
    throw new Error("Not Found");
  }
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
