import "./aboutPage.css";
import Image from "next/image";

import BackButton from "../../components/BackButton";
const AboutPage = () => {
  const yearTemplate = (
    <p className="bold">
      <a href="https://rs.school/courses/reactjs" target="_blank" rel="noreferrer">
        <i className="about-link">RS School 2025</i>
      </a>
    </p>
  );
  const sert = (
    <p className="bold">
      <a href="https://app.rs.school/certificate/6d15cv22" target="_blank" rel="noreferrer">
        <i className="about-link">RS School certificate</i>
      </a>
    </p>
  );
  return (
    <>
      <div className="about-page">
        <h2 className="about-title">author: Olena Nevzorova</h2>
        {sert}
        <BackButton />
        <div className="about-image-host">
          <Image
            className={"about-image"}
            width={500}
            height={500}
            src="/Planet.png"
            alt="Planet"
            priority={true}
          />
        </div>
        {yearTemplate}
      </div>
    </>
  );
};
export default AboutPage;
