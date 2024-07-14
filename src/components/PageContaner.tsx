import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

const PageContainer = () => {
  const navigation = useNavigation();
  return (
    <div className="detail-page">
      {navigation.state === "loading" && <Loader />}
      <Outlet />
    </div>
  );
};

export default PageContainer;
