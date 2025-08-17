import Image from "next/image";
import "./ErrorPage.css";
import BackButton from "../../components/BackButton";

export default function ErrorPage() {
  return (
    <>
      <div className="error-page">
        <h2 className="error-title">404 There nothing here:-( </h2>
        <BackButton />
        <div className="error-image-host">
          <Image
            className={"error-image"}
            src="/error.jpg"
            alt="Error"
            width={500}
            height={500}
            priority={true}
          />
        </div>
      </div>
    </>
  );
}
