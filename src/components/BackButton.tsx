import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const exit = () => {
    navigate(-1);
  };

  return (
    <button className="reload-btn btn" onClick={exit}>
      Back to main
    </button>
  );
};

export default BackButton;
