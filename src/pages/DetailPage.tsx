import { useParams } from "react-router-dom";
import { useGetCharacterByIdQuery } from "../store/services/characterApi";
import Loader from "../components/Loader";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetCharacterByIdQuery(id!);
  // console.log('"isLoading="', isLoading);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  let location = "";
  if (data.location) {
    location = data.location.name ?? "";
  }

  return (
    <div>
      <Link className="detail-page-exit" to={`/react2024`}>
        <span>⨉</span>
      </Link>
      <h2>Detail for ID: {data.id}</h2>
      <h2>{data?.name}</h2>
      <img src={data?.image} alt={data?.name} />
      <p>Status: {data?.status}</p>
      <p>Species: {data?.species}</p>
      <p>Gender: {data?.gender}</p>
      <p>Species: {data.species}</p>
      <p>Type: {data.type}</p>
      <p>Location: {location}</p>
      <p>Created: {data.created}</p>
    </div>
  );
};

export default DetailPage;
