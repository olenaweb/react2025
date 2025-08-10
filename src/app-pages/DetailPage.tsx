import { Link } from "react-router-dom";
import { useGetCharacterByIdQuery } from "../request/characterApi";

import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Loader from "./../components/Loader";
import background from "../assets/backPicture.jpg";


const DetailPage = () => {
  const { id } = useParams<{ id: string }>() ?? "";
  const { data, error, isLoading, isFetching, refetch } = useGetCharacterByIdQuery(id as string);
  if (error) {
    return <ErrorPage />;
  }
  const location = data?.location?.name ?? "";
  const origin = data?.origin?.name ?? "";
  const handleRefreshClick = () => {
    refetch();
  };
  const ContentDetail = () => {
    return (
      <>
        <Link to=".." className="detail-page-exit">
          <span>⨉</span>
        </Link>
        <h2>Detail for ID: {data?.id}</h2>
        <img src={data?.image} alt={data?.name} />
        <p>
          <b>Name: {data?.name}</b>
        </p>
        <p>Status: {data?.status}</p>
        <p>Species: {data?.species}</p>
        <p>Type: {data?.type}</p>
        <p>Gender: {data?.gender}</p>
        <p>Origin: {origin}</p>
        <p>Location: {location}</p>
        <p>Created: {data?.created}</p>
        <button
          title="Refresh"
          onClick={handleRefreshClick}
          className={`refresh-detail-btn btn ${isFetching ? "loading" : ""}`}
          disabled={isFetching}
        >
          🗘
        </button>
      </>
    );
  };
  const style = {
    div: {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  };

  return (
    <>
      {isLoading || isFetching ? (
        <div className="detail-page" style={style.div}>
          <Loader />
        </div>
      ) : (
        <ContentDetail />
      )}
    </>
  );
};

export default DetailPage;
