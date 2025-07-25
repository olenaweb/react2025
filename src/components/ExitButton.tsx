import { Link, redirect } from "react-router-dom";

const ExitButton = () => {
  const exit = () => {
    redirect(`/react2025/page/1`);
  };
  return (
    <>
      <button className="reload-btn btn" onClick={exit}>
        <Link to={`/react2025/page/1`}>Back to main</Link>
      </button>
    </>
  );
};

export default ExitButton;
