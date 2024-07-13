import ReloadButton from "./../components/ReloadButton";
import errorImage from "./../assets/error.jpg";
import "./../App.css";

export default function ErrorPage() {
  return (
    <>
      <div className="error-page">
        <h2 className="error-title">There nothing here:-( </h2>
        <ReloadButton />
        <div className="error-image-host">
          <img className="error-image" src={errorImage} alt="error" />
        </div>
      </div>
    </>
  );
}
