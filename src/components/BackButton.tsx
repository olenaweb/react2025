import { useNavigate } from "react-router-dom";
import "../App.css";

const BackButton = () => {
  const navigate = useNavigate();

  const exit = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <button className="back-btn reload-btn btn" onClick={exit}>
      Back
    </button>
  );
};

export default BackButton;
