import "./../App.css";
import rickmorty from "./../assets/Planet.png";

import ExitButton from "../components/ExitButton";
const AboutPage = () => {
  return (
    <>
      <div className="about-page">
        <h2 className="about-title">author: Olena Nevzorova</h2>
        <ExitButton />
        <div className="about-image-host">
          <img className="about-image" src={rickmorty} alt="rickmorty" />
        </div>
      </div>
    </>
  );
};
export default AboutPage;
