import errorImage from "./../assets/error.jpg";
import "./../App.css";
import BackButton from "../components/BackButton";

export default function ErrorPage() {
  return (
    <>
      <div className="error-page">
        <h2 className="error-title">404 There nothing here:-( </h2>
        <BackButton />
        <div className="error-image-host">
          <img className="error-image" src={errorImage} alt="error" />
        </div>
      </div>
    </>
  );
}
