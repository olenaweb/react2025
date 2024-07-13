import { Outlet } from "react-router-dom";

const PageContainer = () => {
  return (
    <div className="detail-page">
      <Outlet />
    </div>
  );
};

export default PageContainer;
