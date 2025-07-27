import { LoaderFunctionArgs } from "react-router-dom";

export const getDetailData = async ({ params }: LoaderFunctionArgs) => {
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
