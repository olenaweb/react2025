import { useState, useEffect } from "react";
import "./../App.css";
import { useNavigate } from "react-router-dom";

const ErrorButton = () => {
  const [errorState, setErrorState] = useState(false);
  const navigate = useNavigate();

  const createError = () => {
    setErrorState(true);
    navigate("/error", { replace: true });
  };

  useEffect(() => {
    if (errorState) {
      throw new Error('New Error was created by press button "Create Error"');
    }
  }, [errorState]);

  return (
    <button className="search-error-button btn" onClick={createError}>
      Create Error
    </button>
  );
};

export default ErrorButton;
