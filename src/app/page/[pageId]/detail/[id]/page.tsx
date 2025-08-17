"use client";
import Image from "next/image";
import { useGetCharacterByIdQuery } from "@/request/characterApi";
import Loader from "@/components/Loader";
import background from "../../../../../assets/backPicture.jpg";
import { useRouter, useParams } from "next/navigation";

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isFetching, error } = useGetCharacterByIdQuery(id);
  const location = data?.location?.name ?? "";
  const origin = data?.origin?.name ?? "";

  if (error) return <p>Failed to load character</p>;
  if (!data) return <p>Character not found</p>;

  const exit = () => {
    router.back();
  };

  const imageLink = data?.image || "/backPicture.jpg";
  const imageName = data?.name || "Unknown Character";

  const ContentDetail = () => (
    <>
      <div className="detail-page-exit" onClick={exit}>
        <span>⨉</span>
      </div>
      <h2>Detail for ID: {data?.id}</h2>
      <Image
        src={imageLink}
        alt={imageName}
        width={500}
        height={500}
        priority
      />
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

  return (
    <div
      className="detail-page"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isLoading || isFetching ? <Loader /> : <ContentDetail />}
    </div>
  );
}
