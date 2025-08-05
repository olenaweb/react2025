import { useState, useEffect } from "react";
import "./../App.css";
import { Link } from "react-router-dom";

const ErrorButton = () => {
  const [errorState, setErrorState] = useState(false);

  const createError = () => {
    setErrorState(true);
  };

  useEffect(() => {
    if (errorState) {
      throw new Error('New Error was created by press button "Create Error"');
    }
  }, [errorState]);
  const style = {
    color: "black",
    textDecoration: "none",
    padding: "10px",
  };
  return (
    <button className="search-error-button btn" onClick={createError}>
      <Link to={`/error`} style={style}>
        Create Error
      </Link>
    </button>
  );
};

export default ErrorButton;
