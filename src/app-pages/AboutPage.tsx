import "./../App.css";
import rickmorty from "./../assets/Planet.png";

import ExitButton from "../components/ExitButton";
const AboutPage = () => {
  return (
    <>
      <div className="error-page">
        <h2 className="error-title">author: Olena Nevzorova</h2>
        <ExitButton />
        <div className="error-image-host">
          <img className="error-image" src={rickmorty} alt="rickmorty" />
        </div>
      </div>
    </>
  );
}
export default AboutPage;
