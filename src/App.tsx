// import { useState, useEffect } from "react";
// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "./App.css";

const App = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  const controlFormHandle = () => {
    navigate("/control", { replace: true });
  };
  const unControlFormHandle = () => {
    navigate("/uncontrol", { replace: true });
  };

  return (
    <div className="view-app">
      <button onClick={controlFormHandle}>
        Control Form
      </button>

      <button onClick={unControlFormHandle}>
        Uncontrol Form
      </button>
    </div>
  );
};
export default App;
