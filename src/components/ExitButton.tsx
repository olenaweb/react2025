import { Link, redirect } from "react-router-dom";

const ExitButton = () => {
  const exit = () => {
    redirect(`/react2025/`);
  };
  return (
    <>
      <p>Sorry, try back</p>
      <button className="reload-btn btn" onClick={exit}>
        <Link to={`/react2025/page/1`}>Sorry, try again</Link>
      </button>
    </>
  );
};

export default ExitButton;
