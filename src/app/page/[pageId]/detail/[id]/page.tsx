'use client';

import { useGetCharacterByIdQuery } from '@/request/characterApi';
import Loader from '@/components/Loader';
import background from "../../../../../assets/backPicture.jpg";
import { useRouter, useParams } from 'next/navigation'


export default function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isFetching, error } = useGetCharacterByIdQuery(id);
  const location = data?.location?.name ?? "";
  const origin = data?.origin?.name ?? "";

  // if (isLoading) return <Loader />;
  if (error) return <p>Failed to load character</p>;
  if (!data) return <p>Character not found</p>;
  const exit = () => {
    router.back();
  };
  const ContentDetail = () => {
    return (
      <>
        <div className="detail-page-exit" onClick={exit}>
          <span>⨉</span>
        </div>
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
}

