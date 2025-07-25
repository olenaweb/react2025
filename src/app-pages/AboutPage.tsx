import "./../App.css";
import rickmorty from "./../assets/Planet.png";

import BackButton from "../components/BackButton";
const AboutPage = () => {
  return (
    <>
      <div className="about-page">
        <h2 className="about-title">author: Olena Nevzorova</h2>
        <BackButton />
        <div className="about-image-host">
          <img className="about-image" src={rickmorty} alt="rickmorty" />
        </div>
      </div>
    </>
  );
};
export default AboutPage;
