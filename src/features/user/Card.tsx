import { FormData } from "@/type/type";

export const Card: React.FC<FormData> = (data) => {
  return (
    <>
      <li className="card">
        <p>{data.name}</p>
        <div>
          {data.image && (<img className="card-image" src={data.image} alt="Image" />)}
        </div>
        <div>Name: {data.name}</div>
        <div>Age: {data.age}</div>
        <div>Password: {data.password}</div>
        <div>Email: {data.email}</div>
        <div>Gender: {data.gender}</div>
        <div>Country: {data.country}</div>
      </li>
    </>
  );
};

export default Card;
