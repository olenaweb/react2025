import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const exit = () => {
    navigate("/", { replace: true });
  };
  return (
    <button className="back-btn reload-btn btn" onClick={exit}>
      Back
    </button>
  );
};

export default BackButton;
